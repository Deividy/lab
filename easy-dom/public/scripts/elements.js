// TODO:
// think more about the 'global' kind of decorator that we're using here
// Elements is taking care of a lot of things that not all elements share
// Toolbar needs refactor
// factories needs some love

// TODO: MAY:
// A nice thing would be if the NavBar, Dropdown (maybe an ClassElement/ClickableElement)
// be a decorator and we just decorate the element, think more about this, it can be awesome.
(function () {
    // decorators and factories
    var decorators = [];
    var decorate = function (obj) {
        _.each(decorators, function (decorator) {
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
        buttonDropdown: function (id, label) {
            return decorate(new ButtonDropdown(id, label));
        },
        buttonOption: function (id, label) {
            return decorate(new ButtonOption(id, label));
        },
        toolbar: function (id) {
            return decorate(new Toolbar(id));
        },
        decorators: decorators
    };

    window.E = E;

    // Common functions
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

    var abstractFn = function () { throw new Error("Abstract"); };

    // Decorators
    var D = {
        click: function (Obj) {
            Obj.prototype.afterRender = function () {
                Element.prototype.afterRender.apply(this, arguments);

                var el = this.el;

                _.each(this.clickHandlers || [ ], function (click) {
                    el.click(click);
                });

                return this;
            };

            Obj.prototype.onClick = function (click, scope) {
                var me = this;
                scope = scope || this;

                if (!this.clickHandlers) {
                    this.clickHandlers = [ ];
                }

                this.clickHandlers.push(function (ev) {
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
            Obj.prototype.isDisabled = false;

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
            Obj.prototype.className = '';

            Obj.prototype.setClass = function (className) {
                if (this.el) {
                    this.el.removeClass(this.className);
                    this.el.addClass(className);
                }
                this.className = className;
                return this;
            };
        },

        icon: function (Obj) {
            Obj.prototype.icon = { position: null, className: null };

            Obj.prototype.setIcon = function (position, className) {
                this.icon = { position: position, className: className };
                return this;
            };
        },

        options: function (Obj) {
            if (!Obj.prototype.getOptionsEl) {
                Obj.prototype.getOptionsEl = abstractFn;
            }

            Obj.prototype.add = function (id, label, icon, handler, scope) {
                var dropOpt = decorate(new ButtonOption(id, label));

                if (!this.options) {
                    this.options = [ ];
                }
                if (!this.optionsById) {
                    this.optionsById = { };
                }

                if (icon) {
                    dropOpt.setIcon('left', icon);
                }
                if (handler) {
                    dropOpt.onClick(handler, scope);
                }

                this.options.push(dropOpt);
                return dropOpt;
            };

            Obj.prototype.afterRender = function () {
                Element.prototype.afterRender.apply(this, arguments);
                this.renderOptions();
                return this;
            };

            Obj.prototype.renderOptions = function () {
                var me = this,
                    el = this.getOptionsEl(); 

                el.html('');

                _.each(this.options, function (opt) {
                    me.optionsById[opt.id] = opt;
                    opt.appendTo(el);
                });
            };
        }
    };
    
    // Elements
    var Element = (function () {
        function Element(id) {
            if (!id) throw new Error("argument cannot be null id");
            this.id = id;
        }

        Element.prototype.compile = abstractFn;

        Element.prototype.demandEl = function () {
            if (!this.el) throw new Error("el is undefined");
            return true;
        };

        Element.prototype.renderTo = function (container, method) {
            if (!container && !this.container) throw new Error("container is undefined");
            if (!container) container = this.container;

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
            if (!html) throw new Error("argument cannot be null html");

            this.html = html;

            if (canWrap) {
                this.html = "<div id='" + id + "'>" + html + "</div>";
            }
        }

        inherit(Html, Element);

        D.enable(Html);

        Html.prototype.compile = function () {
            return this.html;
        };

        return Html;
    } ());

    var Button = (function () {
        function Button(id, label) {
            Element.call(this, id);

            if (!label) throw new Error("argument cannot be null label");

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
                className: this.className, icon: this.icon
            });
        };

        return Button;
    } ());

    var ButtonOption = (function () {
        function ButtonOption() {
            Button.apply(this, arguments);
            this.tpl = _.template($('#tpl-dropOption').html());
        }

        inherit(ButtonOption, Button);

        return ButtonOption;
    } ());

    var ButtonDropdown = (function () {
        function ButtonDropdown() {
            Button.apply(this, arguments);

            this.tpl = _.template($("#tpl-dropdown").html());
            this.type = 'dropdown';
            this.split = false;
        }

        inherit(ButtonDropdown, Button);

        D.options(ButtonDropdown);

        ButtonDropdown.prototype.getOptionsEl = function() {
            return this.el.parent('div.btn-group').children('ul.dropdown-menu'); 
        };

        ButtonDropdown.prototype.setType = function (type) {
            this.type = type;
            return this;
        };

        ButtonDropdown.prototype.compile = function () {
            return this.tpl({
                id: this.id, label: this.label, className: this.className,
                type: this.type, icon: this.icon, split: this.split
            });
        };

        return ButtonDropdown;
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
                classRight: this.classRight, className: this.className
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
