var Position = (function () {
    var
        $imageWrapper = $('.' + globalParameters.watermarkWrapperClass),
        class_= globalParameters.classWatermarkImage,
        defPosition = globalParameters.defaults.position,

        SINGLE_MODE = globalParameters.singleMode,
        $container;

    var _getBorderPosition = function () {
        var $image = $imageWrapper,
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

        if (Base.settings.mode == SINGLE_MODE) {
            if (x !== undefined) {
                x = parseInt(x);
                x = x > borders[0] ? borders[0] : x;
                x = x > 0 ? x : 0;
            }

            if (y !== undefined) {
                y = parseInt(y);
                y = y > borders[1] ? borders[1] : y;
                y = y > 0 ? y : 0;
            }
        }

        return [x, y];
    };

    return {
        init: function () {
            $container = globalParameters.watermarkContainer;
        },

        setDefault: function () {
            this.set(defPosition[0], defPosition[1]);
        },

        set: function (pos) {

            var
                $image = $imageWrapper,
                position = $image.position();

            if (position === undefined) return;

            pos = _validPosition(pos);

            var x = pos[0],
                y = pos[1];

            if (x !== undefined) {
                $image.css('left', x);
            }
            if (y !== undefined) {
                $image.css('top', y);
            }

            if (Base.settings.mode == SINGLE_MODE) {
                Inputs.set(this.get());
            }

            Grid.setNoActivePoints();

        },

        add: function (pos) {
            var
                $image = $imageWrapper,
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

        refresh: function () {
            this.add([0, 0]);
        },

        get: function () {
            var
                $image = $imageWrapper,
                position = $image.position();

            return [position.left, position.top];
        },

        paddingSet: function (pos) {
            var
                l = Base.settings.grid.padding.left = parseInt(pos[0]),
                t = Base.settings.grid.padding.top = parseInt(pos[1]);


            $('.' + class_).css({
                'margin-left': l,
                'margin-top': t
            });

            $('.position__tessel-vertical').width(l);
            $('.position__tessel-horizontal').height(t);

            Inputs.paddingSet(pos);
        },

        paddingAdd: function (pos) {
            var
                l = Base.settings.grid.padding.left + parseInt(pos[0]),
                t = Base.settings.grid.padding.top + parseInt(pos[1]);

            this.paddingSet([l, t]);
        }
    }
}());