var Slider = (function () {
    var $slider;

    function _initPlugin() {
        $slider = $(".opacity__slider");
        $slider.slider({
            range: "min",
            value: globalParameters.defaults.transparency,
            min: 1,
            max: 100,
            change: change,
            slide: change
        });
    };

    function change(event, ui) {
        Transparency.set(ui.value);
    }

    return {
        init: function () {
            _initPlugin();
        },

        set: function (val) {
            $slider.slider('value', val);
        },

        get: function () {
            return $slider.slider('value');
        }
    }
}());