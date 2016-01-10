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

        x = x > borders[0] ? borders[0] : x;
        y = y > borders[1] ? borders[1] : y;
        x = x > 0 ? x : 0;
        y = y > 0 ? y : 0;

        return [x, y];
    };

    return {
        setDefault: function () {
            this.set(defPosition[0], defPosition[1]);
        },

        set: function (pos) {
            var
                $image = $(imageClass),
                x = pos[0],
                y = pos[1],
                position = $image.position();

            if (position === undefined) return;

            var
                y = parseInt(y),
                x = parseInt(x),
                pos = _validPosition([x, y]);

            $image.css('left', pos[0]);
            $image.css('top', pos[1]);

            Base.trigger('position:change',pos);
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

        get: function(){
            var
                $image = $(imageClass);

            return $image.position();
        }
    }
}());