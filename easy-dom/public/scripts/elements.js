(function() {
    var inherit = function (target, superclass) {
        _.extend(target.prototype, superclass.prototype);
        target.prototype.constructor = target;
    };

    var abstractMethod = function () { throw new Error("Abstract method"); };

    var Element = (function() {
        function Element(id) {
            this.id;
        }
        Element.prototype.render = abstractMethod;

        Element.prototype.disable = function () {
            if (!this.el) {
                throw new Error("Element is undefined");
            }

            this.el.hide();
            return this;
        };
        Element.prototype.enable = function () {
            if (!this.el) {
                throw new Error("Element is undefined");
            }

            this.el.show();
            return this;
        };

        return Element;
    }());

    var Button = (function() {
        function Button(label, id) {
            if (!label || !id) throw new Error("argument cannot be null label || id");

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

        Button.prototype.onClick = function(onClick, scope) {
            scope = scope || this;

            this.handler = function () {
                onClick.apply(scope, arguments);
            };
        };

        Button.prototype.render = function (el, method) {
            var $el = $(el);

            $el[method || 'html'](this.tpl({
                id: this.id,
                label: this.label,
                className: this.className,
                icon: this.icon
            }));
            
            this.container = $el;
            this.el = $el.find("#" + this.id);

            if (this.handler) {
                this.el.click(this.handler);
            }
            return this;
        };



        return Button;
    }());

    var Html = (function() {
        function Html(id, html) {
            this.id = id;
            this.html = "<div id='" + id + "'>" + html + "</div>";
        }

        inherit(Html, Element);

        Html.prototype.render = function (el, method) {
            var $el = $(el);
            
            $el[method || 'html'](this.html);

            this.container = $el;
            this.el = $("#" + this.id);
        };

        return Html;
    }());

    var Toolbar = (function() {
        function Toolbar (id) {
            if (!id) throw new Error("id cannot be null");

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

        Toolbar.prototype.render = function (el, method) {
            var html = this.tpl({ id: this.id, classLeft: this.classLeft, classRight: this.classRight });

            $(el)[method || 'html'](html);

            this.renderIn('left', $(el).find("." + this.classLeft));
            this.renderIn('right', $(el).find("." + this.classRight));
        };

        Toolbar.prototype.renderIn = function (position, el) {
            var elements = this.elements[position];

            for (var i = 0; i < elements.length; i++) {
                elements[i].render(el, 'append');
            }
            return true;
        };

        Toolbar.prototype.getButtonById = function (id) {
            var btn;
            for (var position in this.elements) {
                btn = this.getButtonByIdIn(position, id);
                
                if (btn) return btn;
            }
            return false;
        };

        Toolbar.prototype.getButtonByIdIn = function(position, id) {
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
