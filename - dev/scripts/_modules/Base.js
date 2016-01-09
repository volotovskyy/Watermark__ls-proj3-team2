var Base = (function () {
    var _data = {
        mainImage:{
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
        //LoadImages.init();
    };

    var _trigger = function (event, params) {
        switch (event) {
            case 'loadMainImage':
                _loadMainImage();
                break;
            case 'loadWatermark':
                _loadWaterMark();
                break;
            case 'scale':
                _scale();
                break;
            case 'transparency':
                _transparency(params);
                break;
            case 'position':
                _position(params);
                break;
        }
    };

    var _loadMainImage = function () {
        _inputWatermarkEnable();
        Scale.mainImage();
    };

    var _loadWaterMark = function () {
        Scale.watermark();
    };

    var _inputWatermarkEnable = function(){
        var
            input = globalParameters.watermarkImageInput,
            wrapper = globalParameters.watermarkImageInputWrapper;

        input.prop('disabled',false);
        wrapper.prop('disabled',false);
    };

    var _scale = function () {
        Scale.go();
    };

    var _transparency = function (params) {

    };

    var _position = function (params) {

    };

    return {
        init: function () {
            _eventListener();
            _initModules();
        },
        trigger: _trigger
    }
}());