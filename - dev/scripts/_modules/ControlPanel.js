var ControlPanel = (function () {
    var $reset = globalParameters.buttonReset;

    var _initModules = function () {
        Slider.init();
        Spiners.init();
        Inputs.init();
    };

    var _eventListener = function () {
        $reset.on('click', _setDefault);
    };

    var _setDefault = function (e) {
        e.preventDefault();

        var
            pos = globalParameters.defaults.position,
            transparency = globalParameters.defaults.transparency;

        Base.trigger('position:set', pos);
        Slider.set(transparency);
    };

    return {
        init: function () {
            _initModules();
            _eventListener();
        }
    }
}());