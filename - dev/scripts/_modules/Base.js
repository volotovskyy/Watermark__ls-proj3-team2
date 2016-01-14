var Base = (function () {
    var watermakImage;

    var _initModules = function () {
        Images.init();
        ControlPanel.init();
    };

    var _setDefault = function () {
        //TODO set default
    };

    var _loadMainImage = function (image) {
        _inputWatermarkEnable();
        Scale.mainImage(image, function(){
            //_positionAdd([0,0]); // обновляем позицию watermark
        });
        if(watermakImage){
            var pos = Position.get();
            Scale.watermark(watermakImage,function(){
                _position(pos)
            });
        }
    };

    var _loadWaterMark = function (image) {
        Scale.watermark(image);
        watermakImage = image;
        _transparency();
        _addDragAndDrop();
    };

    var _addDragAndDrop = function(){
        $('.watermark-image').draggable({
            stop: function(){
                var pos = Position.get();

                Base.trigger('position:set',pos);
            }
        });
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
                    _loadMainImage(params);
                    break;
                case 'loadWatermark':
                    _loadWaterMark(params);
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