var Images = (function () {
    var
        $imageName = globalParameters.mainImageInputWrapper,
        $watermarkName = globalParameters.watermarkImageInputWrapper,

        $inputImage1 = globalParameters.mainImageInput,
        $inputImage2 = globalParameters.watermarkImageInput,

        $reset = globalParameters.buttonResetId,
        $submit = globalParameters.buttonSubmit,

        class_ = globalParameters.classWatermarkImage,

        img1,
        img2,
        SINGLE_MODE = globalParameters.singleMode,

        watermarkImage,
        $wrapper;


    // -------- performed once
    var _firstSelection = function () {
        $submit.prop('disabled', false);
        $reset.prop('disabled', false);
        $('.panel').hide();

        Position.set([0,0]);
        _firstSelection = function () {
        };
    };
    var _inputWatermarkEnable = function () {
        var
            input = globalParameters.watermarkImageInput,
            wrapper = globalParameters.watermarkImageInputWrapper;

        input.prop('disabled', false);
        wrapper.prop('disabled', false);
        $('.form__watermark-input-disabled').hide();

        _inputWatermarkEnable = function () {
        };
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

    function _loadImg(e, callback) {
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

            if (watermarkImage)_setImageWatermark();

            Position.refresh();
            _inputWatermarkEnable();

        });
    }

    function _insertWatermark() {
        var $img;

        $wrapper
            .find('.' + class_)
            .remove();

        if (Base.settings.mode == SINGLE_MODE) {
            $img = $('<img class="' + class_ + '">');
            $wrapper.append($img)
                .width('auto')
                .height('auto');
            $wrapper.draggable('option', 'containment', 'parent');
        } else {
            $wrapper.draggable('option', 'containment', '');
            $img = _setGridMode();
        }

        $img.attr('src', watermarkImage);

        _setWatermarkSettings($img);

        return $img;
    }

    function _setImageWatermark() {
        Scale.watermark(watermarkImage, function () {
            _insertWatermark();
            _firstSelection();
        });
    }

    function _setGridMode() {
        var img = '<img class="' + class_ + '">',
            widthW = Base.settings.wrapper.size.width,
            heightW = Base.settings.wrapper.size.height,

            widthI = Base.settings.watermark.scaleSize.width,
            heightI = Base.settings.watermark.scaleSize.height,

            countW = Math.ceil(widthW / widthI) + 2,
            countH = Math.ceil(heightW / heightI) + 2,

            paddingTop = Base.settings.grid.padding.top,
            paddingLeft = Base.settings.grid.padding.left,

            width = Base.settings.grid.size.width = (widthI + paddingLeft) * countW,
            height = Base.settings.grid.size.height = (heightI + paddingTop) * countH
            ;

        $wrapper.width(width);
        $wrapper.height(height);

        for (i = 0, end = countH * countW; i < end; i++) {
            $img = $(img);

            $img.css({
                'margin-right': paddingLeft,
                'margin-bottom': paddingTop
            });

            $wrapper.append($img);
        }
        Inputs.paddingSet([paddingLeft,paddingTop]);
        return $('.' + class_);
    }

    function _setWatermarkSettings($img) {
        Transparency.init($img);
        Scale.refresh($img);
    }

    function _addDragAndDrop($block) {
        $block.draggable({
            drag: function (e, drag) {
                Position.set([drag.position.left, drag.position.top]);
            },
            cursor: 'move',
            containment: 'parent'
        });
    }


    function _loadMainImage(e) {
        _loadImg(e, _ajaxMainImage);
        _changeFileUploadImage();
    }

    function _loadWatermark(e) {
        _loadImg(e, _ajaxWatermark);
        _changeFileUploadWatermark();
    }

    function _ajaxMainImage(){
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
                } else {
                    alert(data.message);
                }
            },
            error: function (e) {
                console.log('error');
                console.log(e);
            }
        })
    }

    //Подгрузка главного изображения
    function _ajaxWatermark(){
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
                    watermarkImage = data.result;
                    _setImageWatermark();
                    img2 = data.result;
                } else {
                    alert(data.message);
                }
            },
            error: function (e) {
                console.log('error');
                console.log(e);
            }
        })
    }

    //Подгрузка знака
    function _upload(e) {
        e.preventDefault();
        var fd = new FormData,
            url = globalParameters.url,
            opacity = Slider.get(),
            position = Position.get(),
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
        fd.append('mode', Base.settings.mode);
        fd.append('paddingLeft', Base.settings.grid.padding.left);
        fd.append('paddingTop', Base.settings.grid.padding.top);

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

    function _save(data) {
        var link = document.createElement('a');
        link.target = "_blank";
        link.download = data.filename;
        link.href = data.result;
        link.click();
    }

    return {

        init: function () {
            _eventListener();
            //$wrapper = $('.' + globalParameters.watermarkWrapperClass);
            $wrapper = $('.' + globalParameters.watermarkWrapperClass);
            _addDragAndDrop($wrapper);
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
        },

        refresh: function (mode) {
            var pos = Position.get();

            if (mode == SINGLE_MODE) {
                Base.settings.grid.position = {
                    left: pos[0],
                    top: pos[1]
                };
                Base.settings.wrapper.position = Base.settings.single.position;
                $('.switch').removeClass('switch-tessel');

            } else {
                Base.settings.single.position = {
                    left: pos[0],
                    top: pos[1]
                };
                Base.settings.wrapper.position = Base.settings.grid.position;

                $('.switch').addClass('switch-tessel');
            }

            _insertWatermark();
            Position.set([
                Base.settings.wrapper.position.left,
                Base.settings.wrapper.position.top
            ]);

        }
    }
}());