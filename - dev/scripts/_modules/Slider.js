var Slider = (function () {
    var _initPlugin = function () {
        $(".opacity__slider").slider({
            range: "min",
            value: globalParameters.defaults.transparency,
            min: 1,
            change:_change,
            max: 100,
            slide: function (event, ui) {
                $("#amount").val("$" + ui.value);
            }
        });
    };

    var _change = function(e,slider){
        Base.trigger('transparency',slider.value)
    };

    var _eventListener = function () {
    };

    return {
        init: function () {
            _initPlugin();
            //_eventListener();
        }
    }
}());