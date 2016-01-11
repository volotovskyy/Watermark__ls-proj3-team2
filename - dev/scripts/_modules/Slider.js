var Slider = (function () {
    var $slider;

    var _initPlugin = function () {
        $slider = $(".opacity__slider");

        $slider.slider({
            range: "min",
            value: globalParameters.defaults.transparency,
            min: 1,
            change: _change,
            max: 100,
            slide: function (event, ui) {
                $("#amount").val("$" + ui.value);
            }
        });
    };

    var _change = function (e, slider) {
        Base.trigger('transparency', slider.value)
    };

    return {
        init: function () {
            _initPlugin();
        },

        set: function (val) {
            $slider.slider('value', val);
        }
    }
}());