var ControlPanel = (function(){
    var _initModules = function(){
        Slider.init();
    };

    return {
        init: function(){
            _initModules();
        }
    }
}());