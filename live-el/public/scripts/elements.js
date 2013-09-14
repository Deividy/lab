// TODO:
// think more about the 'global' kind of decorator that we're using here
// Elements is taking care of a lot of things that not all elements share
// Toolbar needs refactor
// factories needs some love

(function () {
    // global decorators, factories and exports
    var decorate = function (obj) {
        _.each(E.decorators, function (decorator) {
            decorator(obj);
        });

        return obj;
    };
    var E = {
        html: function (id, html, wrap) {
            return decorate(new Html(id, html, wrap));
        },
        button: function (id, label) {
            return decorate(new Button(id, label));
        },
        btnDropdown: function (id, label) {
            return decorate(new BtnDropdown(id, label));
        },
        btnOption: function (id, label) {
            return decorate(new BtnOption(id, label));
        },
        toolbar: function (id) {
            return decorate(new Toolbar(id));
        },
        decorators: []
    };

    window.E = E;

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
    var demandNotNil = function (a, argName) {
        if (a) {
            return true;
        }
        throw new Error("Argument cannot be null " + argName);
    };

    // Class Decorators
    var D = {
        click: function (Obj) {
            var afterRender = Obj.prototype.afterRender;

            Obj.prototype.clickHandlers = function () {
                return this._clickHandlers ? this._clickHandlers : this._clickHandlers = [ ];
            };

            Obj.prototype.afterRender = function () {
                afterRender.apply(this, arguments);

                var el = this.el;

                _.each(this.clickHandlers(), function (click) {
                    el.click(click);
                });

                return this;
            };

            Obj.prototype.onClick = function (click, scope) {
                var me = this;
                scope = scope || this;

                this.clickHandlers().push(function (ev) {
                    ev.preventDefault();
                    if (me.isDisabled) {
                        return;
                    }
                    click.apply(scope, arguments);
                });

                return this;
            };

        },

        enable: function (Obj) {
            Obj.prototype.disable = function () {
                this.demandEl();
                this.el.addClass("disabled");
                this.isDisabled = true;
                return this;
            };

            Obj.prototype.enable = function () {
                this.demandEl();
                this.el.removeClass("disabled");
                this.isDisabled = false;
                return this;
            };
        },

        cls: function (Obj) {
            Obj.prototype.elClass = function (elCls) {
                if (!elCls) {
                    return this._elClass ? this._elClass : this._elClass = '';
                }
                
                if (this.el) {
                    this.el.removeClass(this.elClass());
                    this.el.addClass(elCls);
                }

                this._elClass = elCls;
                return this;
            };
        },

        icon: function (Obj) {
            Obj.prototype.icon = function (position, elClass) {
                if (!position && !elClass) {
                    return this._icon ? this._icon : this._icon = { position: null, elClass: null };
                }
                this._icon = { position: position, elClass: elClass };
                return this;
            };
        },

        options: function (Obj) {
            Obj.prototype.optionsEl = abstractFn;

            Obj.prototype.options = function () {
                return this._options ? this._options : this._options = [];
            };
            
            Obj.prototype.optionsById = function() {
                return this._optionsById ? this._optionsById : this._optionsById = { };
            };

            Obj.prototype.add = function (id, label, icon, handler, scope) {
                var dropOpt = decorate(new BtnOption(id, label));

                if (icon) {
                    dropOpt.icon('left', icon);
                }
                if (handler) {
                    dropOpt.onClick(handler, scope);
                }

                this.options().push(dropOpt);
                this.optionsById()[id] = dropOpt;

                return dropOpt;
            };

            Obj.prototype.afterRender = function () {
                Element.prototype.afterRender.apply(this, arguments);
                this.renderOptions();
                return this;
            };

            Obj.prototype.renderOptions = function () {
                var me = this,
                    el = this.optionsEl();

                el.html('');

                _.each(this.options(), function (opt) {
                    me.optionsById[opt.id] = opt;
                    opt.appendTo(el);
                });
            };
        }
    };

    // Elements
    var Element = (function () {
        function Element(id) {
            demandNotNil(id, 'id');
            this.id = id;
        }

        Element.prototype.compile = abstractFn;

        Element.prototype.demandEl = function () {
            demandNotNil(this.el, 'el');
            return true;
        };

        Element.prototype.renderTo = function (container, method) {
            demandNotNil(container || this.container, 'container');

            if (!container) {
                container = this.container;
            }

            var $container = $(container);
            $container[method || 'html'](this.compile());

            return this.afterRender($container);
        };

        Element.prototype.appendTo = function (container) {
            return this.renderTo(container, 'append');
        };

        Element.prototype.afterRender = function (container) {
            this.container = container;
            this.el = $("#" + this.id);
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

        D.enable(Html);
        D.click(Html);
        
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

        D.enable(Button);
        D.click(Button);
        D.cls(Button);
        D.icon(Button);

        Button.prototype.compile = function () {
            return this.tpl({
                id: this.id, label: this.label,
                elClass: this.elClass(), icon: this.icon()
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
        }

        inherit(BtnDropdown, Button);

        D.options(BtnDropdown);

        BtnDropdown.prototype.optionsEl = function () {
            return this.el.parent('div.btn-group').children('ul.dropdown-menu');
        };

        BtnDropdown.prototype.compile = function () {
            return this.tpl({
                id: this.id, label: this.label, elClass: this.elClass(),
                type: this.type, icon: this.icon(), split: this.split
            });
        };

        return BtnDropdown;
    } ());

    var Toolbar = (function () {
        function Toolbar(id) {
            Element.call(this, id);

            this.elements = { left: [], right: [] };

            this.tpl = _.template($("#tpl-toolbar").html());

            this.classLeft = "left-position";
            this.classRight = "right-position";
        };

        inherit(Toolbar, Element);

        D.cls(Toolbar);

        Toolbar.prototype.addElement = function (position, element) {
            this.elements[position].push(element);
        };

        Toolbar.prototype.compile = function (el, method) {
            return this.tpl({
                id: this.id, classLeft: this.classLeft,
                classRight: this.classRight, elClass: this.elClass()
            });
        };

        Toolbar.prototype.afterRender = function () {
            Element.prototype.afterRender.apply(this, arguments);

            // MAY: rename, dont sounds like a clear name
            this.renderElements('left', $(this.el).find("." + this.classLeft));
            this.renderElements('right', $(this.el).find("." + this.classRight));
        };

        Toolbar.prototype.renderElements = function (position, container) {
            _.each(this.elements[position], function (el) {
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
