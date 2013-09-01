window.ButtonAdapterHtml = ButtonAdapterHtml;
window.Toolbar = Toolbar;

var Button = (function() {
    function Button(label, id) {
        if (!label || !id) throw new Error("argument cannot be null label || id");

        this.label = label;
        this.id = id;

        this.icon = { position: null, className: null };
        this.tpl = _.template($("#tpl-button").html());
        this.className = "btn-default";
    }

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

    Button.prototype.disable = function () {
        this.el.hide();
        return this;
    };
    Button.prototype.enable = function () {
        this.el.show();
        return this;
    };

    return Button;
}());

var ButtonAdapterHtml = (function() {
    function ButtonAdapterHtml(id, html) {
        this.id = id;
        this.html = "<div id='" + id + "'>" + html + "</div>";
    }
    _.extend(ButtonAdapterHtml.prototype, Button.prototype);
    ButtonAdapterHtml.prototype.constructor = ButtonAdapterHtml;

    ButtonAdapterHtml.prototype.render = function (el, method) {
        var $el = $(el);
        
        $el[method || 'html'](this.html);

        this.container = $el;
        this.el = $("#" + this.id);
    };

    return ButtonAdapterHtml;
}());

var Toolbar = (function() {
    function Toolbar (id) {
        if (!id) throw new Error("id cannot be null");

        this.id = id;
        this.buttons = { left: [ ], right: [ ] };

        this.tpl = _.template($("#tpl-toolbar").html());

        this.classLeft = "left-position";
        this.classRight = "right-position";
    };
    
    Toolbar.prototype.addButton = function (position, button) {
        this.buttons[position].push(button);
    }

    Toolbar.prototype.render = function (el, method) {
        var html = this.tpl({ id: this.id, classLeft: this.classLeft, classRight: this.classRight });

        $(el)[method || 'html'](html);

        this.renderIn('left', $(el).find("." + this.classLeft));
        this.renderIn('right', $(el).find("." + this.classRight));
    };

    Toolbar.prototype.renderIn = function (position, el) {
        var buttons = this.buttons[position];

        for (var i = 0; i < buttons.length; i++) {
            buttons[i].render(el, 'append');
        }
        return true;
    };

    Toolbar.prototype.getButtonById = function (id) {
        var btn;
        for (var position in this.buttons) {
            btn = this.getButtonByIdIn(position, id);
            
            if (btn) return btn;
        }
        return false;
    };

    Toolbar.prototype.getButtonByIdIn = function(position, id) {
        for (var i = 0; i < this.buttons[position].length; i++) {
            if (this.buttons[position][i].id === id) {
                return this.buttons[position][i];
            }
        }
        return false;
    };

    return Toolbar;
}());
