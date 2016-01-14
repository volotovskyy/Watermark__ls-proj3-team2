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


    var _setBackGround = function (image, $container) {
        var url = 'url(' + image + ')';

        $container.css('background-image', url);

        Base.trigger('loadMainImage',image);
    };

    var _setImage = function (image, $container, class_) {
        var img = document.createElement('img'),
            noDisplay = globalParameters.classNoDisplay;

        $(img)
            .addClass(class_)
            .css('opacity',0)
            .one('load', function () {
                Base.trigger('loadWatermark',image);
            })
            .attr('src', image)
        ;

        $container
            .find('.' + class_)
            .remove(); // удаляем предыдущие watermark

        $container.append(img);

    };

    var _loadMainImage = function (e) {
        _loadImg(e, function (e) {
            var $container = globalParameters.mainContainer,
                image = e.target.result;

            _setBackGround(image, $container);
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

                if(data.status === 'error'){
                    alert(data.message);
                }
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
        },

        getSizeMainImage: function () {
            return Scale.getSizeMainImage();
        },

        getSizeWatermark: function(){
            var $image = $('.' + globalParameters.classWatermarkImage);
            return {
                width: $image.width(),
                height: $image.height()
            }
        }

    }
}());