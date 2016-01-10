var Base = (function () {

    var _initModules = function () {
        LoadImages.init();
        ControlPanel.init();
        Spiners.init();
        Inputs.init();
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