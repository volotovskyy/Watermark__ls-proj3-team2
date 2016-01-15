var width = Base = (function () {
    var event = $('<div></div>'),
        settings = {
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
        mainContainer = globalParameters.mainContainer;

    var _initModules = function () {
        Images.init();
        ControlPanel.init();
    };

    var _setDefault = function () {
        //TODO set default
    };

    var _setSettings = function () {
        settings.window.size = {
            width: mainContainer.width(),
            height: mainContainer.height()
        };
    };

    var _position = function (pos) {
        Position.set(pos);
    };

    var _positionAdd = function (pos) {
        Position.add(pos);
    };

    var _positionChange = function (pos) {
        var position = pos || Position.get();
        Inputs.set(position);
    };

    return {
        init: function () {
            _initModules();
            _setDefault();
            _setSettings();
        },

        event: event,
        settings: settings,

        trigger: function (event, params) {
            switch (event) {
                //case 'loadMainImage':
                //    _loadMainImage();
                //    break;
                //case 'loadWatermark':
                //    _loadWaterMark();
                //    break;
                case 'transparency':
                    _transparency(params);
                    break;
                case 'position:set':
                    _position(params);
                    break;
                case 'position:add':
                    _positionAdd(params);
                    break;
                case 'position:change':
                    _positionChange(params);
                    //TODO inputs change
                    break;
            }
        }
    }
}());