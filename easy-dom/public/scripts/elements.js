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

        Element.prototype.render = function (el, method) {
            if (!el && !this.el) throw new Error("el is undefined");
            if (!el) el = this.el;

            var $el = $(el);
            $el[method || 'html'](this.compile());

            return this.afterRender($el);
        };

        Element.prototype.append = function (el) {
            return this.render(el, 'append');
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

            if (this.onClickHandler) {
                this.el.click(this.onClickHandler);
            }

            return this;
        };

        Element.prototype.disable = function () {
            if (!this.el) throw new Error("el is undefined");

            this.el.hide();
            return this;
        };

        Element.prototype.enable = function () {
            if (!this.el) throw new Error("el is undefined");

            this.el.show();
            return this;
        };

        Element.prototype.onClick = function(onClick, scope) {
            scope = scope || this;

            this.onClickHandler = function () {
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
        // wrap is a flag to wrap the html content into a div with the id
        // default to false
        function Html(id, html, wrap) {
            Element.call(this, id);
            if (!html) throw new Error("argument cannot be null html");

            this.html = html;

            if (wrap) {
                this.html = "<div id='" + id + "'>" + html + "</div>";
            }
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
                elements[i].append(el);
            }
            return true;
        };

        Toolbar.prototype.find = function (id) {
            var elements, position;
            // loop in all positions
            for (position in this.elements) {
                elements = this.elements[position];
                
                // loop in each element of each position
                for (var i = 0; i < elements.length; i++) {
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
    }());

    window.E = {
        Button: Button,
        Html: Html,
        Toolbar: Toolbar
    };

}());
