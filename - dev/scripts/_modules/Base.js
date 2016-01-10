var Base = (function () {
    var _data = {
            mainImage: {
                width: 0,
                height: 0
            }
        },
        $inputImage1 = globalParameters.mainImageInput,
        $inputImage2 = globalParameters.watermarkImageInput
        ;

    var _eventListener = function () {
        $inputImage1.on('change', LoadImages.loadMainImage);
        $inputImage2.on('change', LoadImages.loadWatermark);
    };

    var _initModules = function () {
        LoadImages.init();
        ControlPanel.init();
    };

    var _setDefault = function () {
        //TODO set default
    };


    var _loadMainImage = function () {
        _inputWatermarkEnable();
        Scale.mainImage();
    };

    var _loadWaterMark = function () {
        Scale.watermark();
        _transparency();
    };

    var _inputWatermarkEnable = function () {
        var
            input = globalParameters.watermarkImageInput,
            wrapper = globalParameters.watermarkImageInputWrapper;

        input.prop('disabled', false);
        wrapper.prop('disabled', false);
    };

    var _transparency = function (percent) {
        Transparency.set(percent);
    };

    var _position = function (pos) {
        Position.set(pos[0], pos[1]);
    };

    return {
        init: function () {
            _eventListener();
            _initModules();
            _setDefault();
        },

        trigger: function (event, params) {
            switch (event) {
                case 'loadMainImage':
                    _loadMainImage();
                    break;
                case 'loadWatermark':
                    _loadWaterMark();
                    break;
                case 'transparency':
                    _transparency(params);
                    break;
                case 'position:set':
                    _position(params);
                    break;
                case 'position:change':
                    //_position(params);
                    //TODO inputs change
                    break;
            }
        }
    }
}());