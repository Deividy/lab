(function() {
    // Common functions
    var inherit = function (target, superclass) {
        _.extend(target.prototype, superclass.prototype);
        target.prototype.constructor = target;
    };
    var abstractMethod = function () { throw new Error("Abstract method"); };

    // Elements
    var Element = (function() {
        function Element(id) {
            if (!id) throw new Error("argument cannot be null id");

            this.id = id;
        }
        Element.prototype.compile = abstractMethod;

        Element.prototype.renderTo = function (el, method) {
            var $el = $(el);
            $el[method || 'html'](this.compile());

            return this.afterRender($el);
        };

        Element.prototype.appendTo = function (el) {
            return this.renderTo(el, 'append');
        };

        Element.prototype.afterRender = function (container) {
            this.setContainer(container);
            this.setElement($("#" + this.id));
            return this;
        };

        Element.prototype.setContainer = function (container) {
            this.container = container;
            return this;
        };

        Element.prototype.setElement = function (el) {
            this.el = el;

            if (this.handler) {
                this.el.click(this.handler);
            }

            return this;
        };

        Element.prototype.disable = function () {
            if (!this.el) throw new Error("Element is undefined");

            this.el.hide();
            return this;
        };

        Element.prototype.enable = function () {
            if (!this.el) throw new Error("Element is undefined");

            this.el.show();
            return this;
        };

        Element.prototype.onClick = function(onClick, scope) {
            scope = scope || this;

            this.handler = function () {
                onClick.apply(scope, arguments);
            };
        };

        return Element;
    }());

    var Button = (function() {
        function Button(id, label) {
            Element.call(this, id);

            if (!label) throw new Error("argument cannot be null label");

            this.label = label;
            this.id = id;

            this.icon = { position: null, className: null };
            this.tpl = _.template($("#tpl-button").html());
            this.className = "btn-default";
        }

        inherit(Button, Element);

        Button.prototype.setClass = function (className) {
            this.className = className;
            return this;
        };
    
        Button.prototype.setIcon = function(position, className) {
            this.icon = { position: position, className: className };
            return this;
        };

        Button.prototype.compile = function () {
            return this.tpl({
                id: this.id,
                label: this.label,
                className: this.className,
                icon: this.icon
            });
        };

        return Button;
    }());

    var Html = (function() {
        function Html(id, html) {
            Element.call(this, id);
            if (!html) throw new Error("argument cannot be null html");

            this.id = id;
            this.html = "<div id='" + id + "'>" + html + "</div>";
        }

        inherit(Html, Element);

        Html.prototype.compile = function () {
            return this.html;
        };

        return Html;
    }());

    var Toolbar = (function() {
        function Toolbar (id) {
            Element.call(this, id);

            this.id = id;
            this.elements = { left: [ ], right: [ ] };

            this.tpl = _.template($("#tpl-toolbar").html());

            this.classLeft = "left-position";
            this.classRight = "right-position";
        };
        
        inherit(Toolbar, Element);

        Toolbar.prototype.addElement = function (position, element) {
            this.elements[position].push(element);
        }

        Toolbar.prototype.compile = function (el, method) {
            return this.tpl({ id: this.id, classLeft: this.classLeft, classRight: this.classRight });
        };

        Toolbar.prototype.afterRender = function() {
            Element.prototype.afterRender.apply(this, arguments);

            // MAY: rename, dont sounds like a clear name
            this.renderElements('left', $(this.el).find("." + this.classLeft));
            this.renderElements('right', $(this.el).find("." + this.classRight));
        };

        Toolbar.prototype.renderElements = function (position, el) {
            var elements = this.elements[position];

            for (var i = 0; i < elements.length; i++) {
                elements[i].appendTo(el);
            }
            return true;
        };

        Toolbar.prototype.getButtonById = function (id) {
            var btn;
            for (var position in this.elements) {
                btn = this.getButtonByPositionAndId(position, id);
                
                if (btn) return btn;
            }
            return false;
        };

        Toolbar.prototype.getButtonByPositionAndId = function(position, id) {
            for (var i = 0; i < this.elements[position].length; i++) {
                if (this.elements[position][i].id === id) {
                    return this.elements[position][i];
                }
            }
            return false;
        };

        return Toolbar;
    }());

    window.E = {
        Button: Button,
        Html: Html,
        Toolbar: Toolbar
    };

}());
