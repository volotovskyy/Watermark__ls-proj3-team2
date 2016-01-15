var Images = (function () {
    var
        $imageName = globalParameters.mainImageInputWrapper,
        $watermarkName = globalParameters.watermarkImageInputWrapper,

        $inputImage1 = globalParameters.mainImageInput,
        $inputImage2 = globalParameters.watermarkImageInput,

        $submit = globalParameters.buttonSubmit;

    function _eventListener() {
        $inputImage1.on('change', _loadMainImage);
        $inputImage2.on('change', _loadWatermark);

        $submit.on('click', _save);
    };

    function _changeFileUploadImage() {
        var filepath = $inputImage1.val();

        filepath = filepath.replace(/c:\\fakepath\\/gmi, "");
        $imageName.val(filepath);
    };

    function _changeFileUploadWatermark() {
        var filepath = $inputImage2.val();

        filepath = filepath.replace(/c:\\fakepath\\/gmi, "");
        $watermarkName.val(filepath)
    };

    var _loadImg = function (e, callback) {
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            var file = e.target.files[0];

            if (!file.type.match('image.*')) {
                alert('Ошибка. Только изображения!');
                //TODO type error message
                return;
            }

            var reader = new FileReader();

            reader.onload = (function (f) {
                return callback;
            })(file);

            reader.readAsDataURL(file);
        } else {
            alert('The File APIs are not fully supported in this browser.');
            //TODO  exit message
        }
    };


    var _setBackGround = function (image, $contaitener, class_) {
        var
            url = 'url(' + image + ')';

        Scale.mainImage(image, function () {
            $contaitener.css('background-image', url);
            Scale.scaleWatermark();
        });


    };

    function _setImageWatermark(image, $contaitener, class_) {
        var $img = $('<img class="' + class_ + '">');

        $contaitener
            .find('.' + class_)
            .remove();

        $contaitener.append($img);

        Scale.watermark(image, function () {
            $img.attr('src', image);
        });

        _setWatermarkSettings($img);
    };

    function _setWatermarkSettings($img){
        Transparency.init($img);
        _addDragAndDrop($img);
        _inputWatermarkEnable();
    }

    function _addDragAndDrop($img) {
        $img.draggable({
            stop: function () {
                var pos = Position.get();

                Base.trigger('position:set', pos);
            }
        });
    };

    function _inputWatermarkEnable () {
        var
            input = globalParameters.watermarkImageInput,
            wrapper = globalParameters.watermarkImageInputWrapper;

        input.prop('disabled', false);
        wrapper.prop('disabled', false);
    };

    function _loadMainImage(e) {
        _loadImg(e, function (e) {
            var $container = globalParameters.mainContainer,
                class_ = globalParameters.classMainImage,
                image = e.target.result;
            _setBackGround(image, $container, class_);
        });
        _changeFileUploadImage();
    };

    function _loadWatermark(e) {
        _loadImg(e, function (e) {
            var $container = globalParameters.watermarkContainer,
                class_ = globalParameters.classWatermarkImage,
                image = e.target.result;

            _setImageWatermark(image, $container, class_);
        });
        _changeFileUploadWatermark();
    };

    var _save = function (e) {
        e.preventDefault();
        var fd = new FormData,
            url = globalParameters.url,
            opacity = Slider.get(),
            position = Position.get();

        if ($inputImage1.prop('files').length === 0 || $inputImage2.prop('files').length === 0) {
            alert('Сначала выберите изображение');
            //TODO print message
            return;
        }

        fd.append('img1', $inputImage1.prop('files')[0]);
        fd.append('img2', $inputImage2.prop('files')[0]);
        fd.append('opacity', opacity);
        fd.append('positionX', position[0]);
        fd.append('positionY', position[1]);

        $.ajax({
            url: url,
            data: fd,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function (data) {
                console.log('success');
                console.log(data);
            },
            error: function (e) {
                console.log('error');
                console.log(e);
            }
        })
    };

    return {

        init: function () {
            _eventListener();

        }

    }
}());