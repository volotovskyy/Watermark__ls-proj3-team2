var ControlPanel = (function () {
    var _initModules = function () {
        Slider.init();
        Spiners.init();
        Inputs.init();
    };

    return {
        init: function () {
            _initModules();
        }
    }
}());