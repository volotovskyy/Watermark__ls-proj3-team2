var Position = (function () {
    var
        imageClass = '.' + globalParameters.classWatermarkImage,
        defPosition = globalParameters.defaults.position,
        $container = globalParameters.watermarkContainer;

    var _getBorderPosition = function () {
        var $image = $(imageClass),
            width = $image.width(),
            heigth = $image.height(),
            widthContainer = $container.width(),
            heightContainer = $container.height();

        return [
            widthContainer - width,
            heightContainer - heigth
        ]
    };

    var _validPosition = function (pos) {
        var borders = _getBorderPosition(),
            x = pos[0],
            y = pos[1];

        if (x !== undefined){
            x = parseInt(x);
            x = x > borders[0] ? borders[0] : x;
            x = x > 0 ? x : 0;
        }

        if (y !== undefined){
            y = parseInt(y);
            y = y > borders[1] ? borders[1] : y;
            y = y > 0 ? y : 0;
        }

        return [x, y];
    };

    return {
        setDefault: function () {
            this.set(defPosition[0], defPosition[1]);
        },

        set: function (pos) {
            var
                $image = $(imageClass),
                position = $image.position();
            if (position === undefined) return;

            pos = _validPosition(pos);
            var x = pos[0],
                y = pos[1];

            if (x !== undefined){
                $image.css('left', x);
            }
            if (y !== undefined){
                $image.css('top', y);
            }
            Base.trigger('position:change', pos);
        },

        add: function (pos) {
            var
                $image = $(imageClass),
                addX = pos[0],
                addY = pos[1],
                position = $image.position();

            if (position === undefined) return;

            var
                x = parseInt(position.left),
                y = parseInt(position.top);

            if (addX)x += addX;
            if (addY)y += addY;

            this.set([x, y]);
        },

        get: function () {
            var
                $image = $(imageClass),
                position = $image.position();

            return [position.left,position.top];
        }
    }
}());