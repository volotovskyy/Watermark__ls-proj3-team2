var Images = (function () {
    var
        $image = globalParameters.mainImageInput,
        $imageName = globalParameters.mainImageInputWrapper,

        $watermark = globalParameters.watermarkImageInput,
        $watermarkName = globalParameters.watermarkImageInputWrapper,

        $inputImage1 = globalParameters.mainImageInput,
        $inputImage2 = globalParameters.watermarkImageInput,

        $submit = globalParameters.buttonSubmit;

    var _eventListener = function () {
        $image.on('change', _changeFileUploadImage);
        $watermark.on('change', _changeFileUploadWatermark);

        $inputImage1.on('change', _loadMainImage);
        $inputImage2.on('change', _loadWatermark);

        $submit.on('click', _save);
    };

    var _changeFileUploadImage = function () {
        var filepath = $image.val();

        filepath = filepath.replace(/c:\\fakepath\\/gmi, "");
        $imageName.val(filepath);
    };

    var _changeFileUploadWatermark = function () {
        var filepath = $watermark.val();

        filepath = filepath.replace(/c:\\fakepath\\/gmi, "");
        $watermarkName.val(filepath)
    };

    var _loadImg = function (e, func) {
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            var file = e.target.files[0];

            if (!file.type.match('image.*')) {
                alert('Ошибка. Только изображения!');
                //TODO type error message
                return;
            }

            var reader = new FileReader();

            reader.onload = (function (f) {
                return func;
            })(file);

            reader.readAsDataURL(file);
        } else {
            alert('The File APIs are not fully supported in this browser.');
            //TODO  exit message
        }
    };


    var _setBackGround = function (image, $contaitener, class_) {
        var img = document.createElement('img'),
            url = 'url(' + image + ')';

        $contaitener
            .css('background-image', url)
            .append(img)
            .find('.' + class_)
            .remove();

        $(img)
            .one('load', function () {
                Base.trigger('loadMainImage');
            })
            .attr('src', image)
            .addClass(class_);

    };

    var _setImage = function (image, $contaitener, class_) {
        var img = document.createElement('img');

        $contaitener
            .append(img)
            .find('.' + class_)
            .remove();

        $(img)
            .one('load', function () {
                Base.trigger('loadWatermark');
            })
            .attr('src', image)
            .addClass(class_);

    };

    var _loadMainImage = function (e) {
        _loadImg(e, function (e) {
            var $container = globalParameters.mainContainer,
                class_ = globalParameters.classMainImage,
                image = e.target.result;

            _setBackGround(image, $container, class_);
        });

    };

    var
        _loadWatermark = function (e) {
            _loadImg(e, function (e) {
                var $container = globalParameters.watermarkContainer,
                    class_ = globalParameters.classWatermarkImage,
                    image = e.target.result;

                _setImage(image, $container, class_);
            });
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