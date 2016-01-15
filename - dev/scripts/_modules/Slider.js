var Slider = (function () {
    var $slider;

    var _initPlugin = function () {
        $slider = $(".opacity__slider");

        $slider.slider({
            range: "min",
            value: globalParameters.defaults.transparency,
            min: 1,
            max: 100,
            slide: function (event, ui) {
                Transparency.set(ui.value);
            }
        });
    };

    return {
        init: function () {
            _initPlugin();
        },

        set: function (val) {
            $slider.slider('value', val);
        },

        get: function(){
            return $slider.slider('value');
        }
    }
}());