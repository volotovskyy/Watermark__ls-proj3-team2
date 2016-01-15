var Base = (function () {
    var settings = {
            window: {
                size: null
            },

            image: {
                originalSize: {
                    width: 0,
                    height: 0
                },
                scaleSize: {
                    width: 0,
                    height: 0
                },
            },
            scale: 1,

            watermark: {
                originalSize: {
                    width: 0,
                    height: 0
                },
                scaleSize: {
                    width: 0,
                    height: 0
                },
                position: {
                    left: 0,
                    top: 0
                }
            },
            wrapper: {
                size: {
                    width: 0,
                    height: 0
                },
                position: {
                    left: 0,
                    top: 0
                }
            }
        },
        $reset = globalParameters.buttonResetId,
        $mainContainer = globalParameters.mainContainer;

    function _initModules () {
        Images.init();
        Slider.init();
        Spiners.init();
        Inputs.init();
        Grid.init();
    }

    function _eventListener() {
        $reset.on('click', _setDefault);
    }

    function _setDefault (e) {
        e.preventDefault();

        var
            pos = globalParameters.defaults.position,
            transparency = globalParameters.defaults.transparency;
        _position(pos);
        Slider.set(transparency);
    }

    function _setSettings () {
        settings.window.size = {
            width: $mainContainer.width(),
            height: $mainContainer.height()
        };
    }

    function _position(pos) {
        Position.set(pos);
    }


    return {
        init: function () {
            _initModules();
            _eventListener();
            _setSettings();
        },

        event: event,
        settings: settings
    }
}());