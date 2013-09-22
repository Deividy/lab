(function () {
    // Exports;
    var E = window.E = {
        html: function (id, html, wrap) {
            return new Html(id, html, wrap);
        },
        button: function (id, label) {
            return new Button(id, label);
        },
        btnDropdown: function (id, label) {
            return new BtnDropdown(id, label);
        },
        btnOption: function (id, label) {
            return new BtnOption(id, label);
        },
        toolbar: function (id) {
            return new Toolbar(id);
        },

        decorate: function(decorate) {
            var DecoratedE = { };

            for (var key in E) {
                (function (key) {
                    if (key == 'decorate') {
                        return;
                    }

                    DecoratedE[key] = function() {
                        var instance = decorate(E[key].apply(null, arguments)),
                            instanceDecorate = instance.decorate;

                        instance.decorate = function() {
                            instanceDecorate.apply(this, arguments);
                            return decorate.apply(this, arguments);
                        };

                        return instance;
                    };
                }(key));
            }

            return DecoratedE;
        }
    };

    // Common functions
    var abstractFn = function () { throw new Error("Abstract"); };
    var inherit = function (child, superclass) {
        function c() {
            this.constructor = child.constructor;
        }
        c.prototype = superclass.prototype;

        for (var prop in superclass) {
            if (Object.hasOwnProperty.call(superclass, prop)) {
                child[prop] = superclass[prop];
            }
        }

        child.prototype = new c();

        return child;
    };
    var demandNotNil = function (arg, argName) {
        if (arg) {
            return true;
        }
        throw new Error("Argument cannot be null " + argName);
    };

    // Elements
    var Element = (function () {
        function Element(id) {
            demandNotNil(id, 'id');
            this.id = id;

            this.clickHandlers = [ ];
            this.isDisabled = false;

            this._elClass = '';
            this._icon = { position: null, elClass: null };

            this.decorate = function (Obj) {
                return Obj;
            };
        }

        Element.prototype.demandEl = function () {
            demandNotNil(this.el, 'el');
            return true;
        };

        Element.prototype.compile = abstractFn;

        Element.prototype.renderTo = function (container) {
            $(container).html(this.compile());
            return this.afterRender();
        };

        Element.prototype.appendTo = function (container) {
            $(container).append(this.compile());
            return this.afterRender();
        };

        Element.prototype.afterRender = function () {
            var el = this.el = $("#" + this.id);

            _.each(this.clickHandlers, function (click) {
                el.click(click);
            });       

            return this;
        };

        Element.prototype.onClick = function (click, scope) {
            var me = this, handler;

            scope = scope || this;

            handler = function(ev) {
                ev.preventDefault();
                if (me.isDisabled) {
                    return;
                }
                click.apply(scope, arguments);
            };

            this.clickHandlers.push(handler);

            if (this.el) {
                this.el.click(handler);
            }

            return this;
        };

        Element.prototype.disable = function () {
            this.demandEl();

            this.el.addClass("disabled");
            this.isDisabled = true;
            return this;
        };

        Element.prototype.enable = function () {
            this.demandEl();
            
            this.el.removeClass("disabled");
            this.isDisabled = false;
            return this;
        };

        Element.prototype.hide = function () {
            this.demandEl();
            
            this.el.hide();
            return this;
        };

        Element.prototype.show = function () {
            this.demandEl();
            
            this.el.show();
            return this;
        };

        Element.prototype.setVisible = function (visible) {
            return visible ? this.show() : this.hide();
        };

        Element.prototype.elClass = function (elCls) {
            if (!elCls) {
                return this._elClass;
            }

            if (this.el) {
                this.el.removeClass(this.elClass());
                this.el.addClass(elCls);
            }
            this._elClass = elCls;
            return this;
        };

        // SHOULD: 
        // knows about the el and update DOM, like .elClass()
        Element.prototype.icon = function (position, elClass) {
            if (!position && !elClass) {
                return this._icon;
            }

            this._icon = { position: position, elClass: elClass };
            return this;
        };
        
        return Element;
    } ());

    var Html = (function () {
        // canWrap is a flag to wrap the html content into a div with the id
        // default to false
        function Html(id, html, canWrap) {
            Element.call(this, id);
            demandNotNil(html, 'html');

            this.html = html;

            if (canWrap) {
                this.html = "<div id='" + id + "'>" + html + "</div>";
            }
        }

        inherit(Html, Element);

        Html.prototype.compile = function () {
            return this.html;
        };

        return Html;
    } ());

    var Button = (function () {
        function Button(id, label) {
            Element.call(this, id);
            demandNotNil(label, 'label');

            this.label = label;
            this.tpl = _.template($("#tpl-button").html());
        }

        inherit(Button, Element);

        Button.prototype.compile = function () {
            return this.tpl({
                id: this.id, 
                label: this.label,
                elClass: this.elClass(), 
                icon: this.icon()
            });
        };

        return Button;
    } ());

    var BtnOption = (function () {
        function BtnOption() {
            Button.apply(this, arguments);
            this.tpl = _.template($('#tpl-btnOption').html());
        }

        inherit(BtnOption, Button);

        return BtnOption;
    } ());

    var BtnDropdown = (function () {
        function BtnDropdown() {
            Button.apply(this, arguments);

            this.tpl = _.template($("#tpl-btnDropdown").html());

            this.type = 'dropdown';
            this.split = false;

            this.options = [ ];
            this.optionsById = { };
        }

        inherit(BtnDropdown, Button);

        BtnDropdown.prototype.add = function (id, label, icon, handler, scope) {
            var dropOpt = this.decorate(new BtnOption(id, label));

            if (icon) {
                dropOpt.icon('left', icon);
            }
            if (handler) {
                dropOpt.onClick(handler, scope);
            }

            this.options.push(dropOpt);
            this.optionsById[id] = dropOpt;

            return dropOpt;
        };

        BtnDropdown.prototype.afterRender = function () {
            Element.prototype.afterRender.apply(this, arguments);
            this.renderOptions();
            return this;
        };

        BtnDropdown.prototype.renderOptions = function () {
            var me = this,
                el = this.el.parent('div.btn-group').children('ul.dropdown-menu');


            el.html('');

            _.each(this.options, function (opt) {
                me.optionsById[opt.id] = opt;
                opt.appendTo(el);
            });
        };

        BtnDropdown.prototype.compile = function () {
            return this.tpl({
                id: this.id, 
                label: this.label, 
                split: this.split,
                type: this.type, 
                elClass: this.elClass(),
                icon: this.icon()
            });
        };

        return BtnDropdown;
    } ());

    var Combobox = (function() {
        function Combobox(options) {
            Element.apply(this, arguments);

            this.options = options;
            this.tpl = _.template($("#tpl-combobox").html());
        }

        Combobox.prototype.compile = function () {
            return this.tpl({
                id: this.id,
                options: this.options 
            });
        };

        return Combobox;
    }());

    var Toolbar = (function () {
        function Toolbar(id) {
            Element.call(this, id);

            this.elements = { left: [], right: [] };

            this.tpl = _.template($("#tpl-toolbar").html());

            this.classLeft = "left-position";
            this.classRight = "right-position";
        };

        inherit(Toolbar, Element);

        Toolbar.prototype.addElement = function (position, element) {
            this.elements[position].push(element);
        };

        Toolbar.prototype.compile = function (el, method) {
            return this.tpl({
                id: this.id, 
                classLeft: this.classLeft,
                classRight: this.classRight, 
                elClass: this.elClass()
            });
        };

        Toolbar.prototype.afterRender = function () {
            Element.prototype.afterRender.apply(this, arguments);

            var elLeft = $(this.el).find("." + this.classLeft),
                elRight = $(this.el).find("." + this.classRight);

            this.renderElements(this.elements.left, elLeft);
            this.renderElements(this.elements.right, elRight);
        };

        Toolbar.prototype.renderElements = function (elements, container) {
            _.each(elements, function (el) {
                el.appendTo(container);
            });
            return true;
        };

        Toolbar.prototype.find = function (id) {
            var elements, position, i;
            // loop in all positions
            for (position in this.elements) {
                elements = this.elements[position];

                // loop in each element of each position
                for (i = 0; i < elements.length; i++) {
                    // if id match, return it
                    if (elements[i].id === id) {
                        return elements[i];
                    }
                }
            }
            // dont found any element that match id in all elements of this.elements
            return false;
        };
        
        return Toolbar;
    } ());
} ());
