var Images = (function () {
    var
        $imageName = globalParameters.mainImageInputWrapper,
        $watermarkName = globalParameters.watermarkImageInputWrapper,

        $inputImage1 = globalParameters.mainImageInput,
        $inputImage2 = globalParameters.watermarkImageInput,

        $reset = globalParameters.buttonResetId,
        $submit = globalParameters.buttonSubmit,

        first = true,

        img1,
        img2;


    // -------- performed once
    var  _firstSelection = function(){
        $submit.prop('disabled', false);
        $reset.prop('disabled', false);
        $('.panel').hide();

        _firstSelection = function(){};
    };
    var  _inputWatermarkEnable = function () {
        var
            input = globalParameters.watermarkImageInput,
            wrapper = globalParameters.watermarkImageInputWrapper;

        input.prop('disabled', false);
        wrapper.prop('disabled', false);
        $('.form__watermark-input-disabled').hide();

        _inputWatermarkEnable = function(){};
    };

    // --------


    function _eventListener() {
        $inputImage1.on('change', _loadMainImage);
        $inputImage2.on('change', _loadWatermark);

        $submit.on('click', _upload);
    }

    function _changeFileUploadImage() {
        var filepath = $inputImage1.val();

        filepath = filepath.replace(/c:\\fakepath\\/gmi, "");
        $imageName.val(filepath);
    }

    function _changeFileUploadWatermark() {
        var filepath = $inputImage2.val();

        filepath = filepath.replace(/c:\\fakepath\\/gmi, "");
        $watermarkName.val(filepath)
    }

    function _loadImg (e, callback) {
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
    }


    function _setBackGround(image, $contaitener, class_) {
        var
            url = 'url(' + image + ')';

        Scale.mainImage(image, function () {
            $contaitener.css('background-image', url);
            Scale.scaleWatermark();
            Position.refresh();
            _inputWatermarkEnable();
        });

    }

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
        _firstSelection();
    }



    function _setWatermarkSettings($img) {
        Transparency.init($img);
        _addDragAndDrop($img);
    }

    function _addDragAndDrop($img) {
        $img.draggable({
            drag: function (e, drag) {
                Position.set([drag.position.left, drag.position.top]);
            },
            containment: "parent"
        });
    }



    function _loadMainImage(e) {
        _loadImg(e, ajaxMainImage);
        _changeFileUploadImage();
    }

    function _loadWatermark(e) {
        _loadImg(e, ajaxWatermark);
        _changeFileUploadWatermark();
    }

    function ajaxMainImage(){
        var fd = new FormData;

        fd.append('img', $inputImage1.prop('files')[0]);

        $.ajax({
            url: 'php/image_load.php',
            data: fd,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function (data) {
                if(data.status === 'ok'){
                    _setBackGround(data.result, globalParameters.mainContainer, globalParameters.classMainImage);
                    img1 = data.result;
                }
            },
            error: function (e) {
                console.log('error');
                console.log(e);
            }
        })
    }

    function ajaxWatermark(){
        var fd = new FormData;

        fd.append('img', $inputImage2.prop('files')[0]);

        $.ajax({
            url: 'php/image_load.php',
            data: fd,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function (data) {
                if(data.status === 'ok'){
                    _setImageWatermark(data.result, globalParameters.watermarkContainer, globalParameters.classWatermarkImage);
                    img2 = data.result;
                }
            },
            error: function (e) {
                console.log('error');
                console.log(e);
            }
        })
    }

    function _upload(e) {
        e.preventDefault();
        var fd = new FormData,
            url = globalParameters.url,
            opacity = Slider.get(),
            position = Position.get()
        x = Math.floor(position[0] * Base.settings.scale),
            y = Math.floor(position[1] * Base.settings.scale);

        if ($inputImage1.prop('files').length === 0 || $inputImage2.prop('files').length === 0) {
            alert('Сначала выберите изображение');
            //TODO print message
            return;
        }
        fd.append('img1', img1);
        fd.append('img2', img2);
        fd.append('opacity', opacity);
        fd.append('positionX', x);
        fd.append('positionY', y);

        $.ajax({
            url: url,
            data: fd,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function (data) {
                _save(data);
            },
            error: function (e) {
                console.log('error');
                console.log(e);
            }
        })
    }

    function _save(data){
        //var url = 'http://dz3/' + url;
        var link = document.createElement('a');
        link.target = "_blank";
        link.download = "img.jpg";
        link.href = data.result;
        link.click();
    }

    return {

        init: function () {
            _eventListener();
        },

        getSizeMainImage: function () {
            return {
                width: Base.settings.wrapper.size.width,
                height: Base.settings.wrapper.size.height
            }
        },

        getSizeWatermark: function () {
            return {
                width: Base.settings.watermark.scaleSize.width,
                height: Base.settings.watermark.scaleSize.height
            }
        }

    }
}());