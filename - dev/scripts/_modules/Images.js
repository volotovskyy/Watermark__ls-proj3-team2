var Images = (function () {
    var
        $imageName = globalParameters.mainImageInputWrapper,
        $watermarkName = globalParameters.watermarkImageInputWrapper,

        $inputImage1 = globalParameters.mainImageInput,
        $inputImage2 = globalParameters.watermarkImageInput,

        $reset = globalParameters.buttonResetId,
        $submit = globalParameters.buttonSubmit,

        class_ = globalParameters.classWatermarkImage,

        SINGLE_MODE = globalParameters.singleMode,

        backgroundImage,
        watermarkImage,
        $wrapper;


    // -------- performed once
    var _firstSelection = function () {
        $submit.prop('disabled', false);
        $reset.prop('disabled', false);
        $('.panel').hide();

        Position.set([0, 0]);
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

        backgroundImage = image;

        Scale.mainImage(image, function () {
            $contaitener.css('background-image', url);

            if (watermarkImage)_setImageWatermark(watermarkImage);

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

    function _setImageWatermark(watermarkImage_) {
        watermarkImage = watermarkImage_;
        Scale.watermark(watermarkImage, function () {
            _insertWatermark();
            _firstSelection();
        });
    }

    function _setGridMode() {
        var img = '<img class="' + class_ + '">',
            widthW = Base.settings.wrapper.scaleSize.width,
            heightW = Base.settings.wrapper.scaleSize.height,

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
        Inputs.paddingSet([paddingLeft, paddingTop]);
        return $('.' + class_);
    }

    function _setWatermarkSettings($img) {
        Transparency.set();
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
        var file = $inputImage1.prop('files')[0];
        _uploadImage(file, function (data) {
            if (data.status === 'ok') {
                _setBackGround(data.result, globalParameters.mainContainer, globalParameters.classMainImage);
            } else {
                mscAlert(data.message);
            }
        });
        _changeFileUploadImage();
    }

    function _loadWatermark(e) {
        var file = $inputImage2.prop('files')[0];
        _uploadImage(file, function (data) {
            if (data.status === 'ok') {
                _setImageWatermark(data.result);
            } else {
                mscAlert(data.message);
            }
        });
        _changeFileUploadWatermark();
    }

    function _uploadImage(file, callback) {
        var fd = new FormData,
            language = Language.getLanguage();

        fd.append('img', file);
        fd.append('Language', language);


        $.ajax({
            url: 'php/image_load.php',
            data: fd,
            processData: false,
            contentType: false,
            type: 'POST',
            success: callback,
            error: function (e) {
                console.log('error');
                console.log(e);
                mscAlert(e.responseText);
            }
        })
    }


    //Подгрузка знака
    function _upload(e) {
        e.preventDefault();
        var
            url = globalParameters.url,
            opacity = Slider.get(),
            position = Position.get(),
            x = Math.floor(position[0] * Base.settings.scale),
            y = Math.floor(position[1] * Base.settings.scale),
            scaleWaterMark = Base.settings.scaleWatermark / Base.settings.scale,
            language = Language.getLanguage();


        var data = {
            img1: backgroundImage,
            img2: watermarkImage,
            opacity: opacity,
            positionX: x,
            positionY: y,
            mode: Base.settings.mode,
            paddingLeft: Base.settings.grid.padding.left,
            paddingTop: Base.settings.grid.padding.top,
            scaleWatermark: scaleWaterMark,
            Language: language
        };

        $.post(url,data)
            .done(function(data) {
                _save(data);
            })
            .fail(function(e) {
                console.log('error', e);
                mscAlert(e.responseText);
            });
    }

    function _save(data) {
        $('#download-link').attr('href', data.result)
            .attr('download', data.filename)[0]
            .click();
    }

    return {

        init: function () {
            _eventListener();
            //$wrapper = $('.' + globalParameters.watermarkWrapperClass);
            $wrapper = $('.' + globalParameters.watermarkWrapperClass);
            _addDragAndDrop($wrapper);
        },

        getWrapper: function () {
            return $wrapper;
        },

        getSizeMainImage: function () {
            return {
                width: Base.settings.wrapper.scaleSize.width,
                height: Base.settings.wrapper.scaleSize.height
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
                $('class_').css({
                    'margin-right': 0,
                    'margin-bottom': 0
                });
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