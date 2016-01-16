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
                }
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
            },

            grid: {
                size: {
                    width: 0,
                    height: 0
                },

                position: {
                    left: 0,
                    top: 0
                },

                padding: {
                    left: globalParameters.defaults.gridPadding[0],
                    top: globalParameters.defaults.gridPadding[1]
                }
            },

            single:{
                position: {
                    left: 0,
                    top: 0
                }
            },

            mode: globalParameters.singleMode
        },

        $reset = globalParameters.buttonResetId,
        $buttonGrid = globalParameters.buttonGridMode,
        $buttonSingle = globalParameters.buttonSingleMode,
        $mainContainer = globalParameters.mainContainer;

    function _initModules() {
        Images.init();
        Position.init();
        Slider.init();
        Spiners.init();
        Inputs.init();
        Grid.init();
    }

    function _eventListener() {
        $reset.on('click', _setDefault);
        $buttonGrid.on('click', _clickMode);
        $buttonSingle.on('click', _clickMode);
    }

    function _clickMode(e) {
        var $this = $(this);
        e.preventDefault();

        settings.mode = $this.attr('data-view');
        $('.position__btns').removeClass('active');
        $this.addClass('active');

        Images.refresh(settings.mode);
    }

    function _setDefault(e) {
        e.preventDefault();

        var
            pos = globalParameters.defaults.position,
            transparency = globalParameters.defaults.transparency;
        _position(pos);
        Slider.set(transparency);
    }

    function _setSettings() {
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