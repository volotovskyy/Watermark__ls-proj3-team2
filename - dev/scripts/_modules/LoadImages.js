var LoadImages = (function () {
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

    var _loadMainImg = function (e) {
        _loadImg(e, function (e) {
            var $container = globalParameters.mainContainer,
                class_ = globalParameters.classMainImage,
                image = e.target.result;

            _setBackGround(image, $container, class_);
        });

    };

    var _loadWaterImg = function (e) {
        _loadImg(e, function (e) {
            var $container = globalParameters.watermarkContainer,
                class_ = globalParameters.classWatermarkImage,
                image = e.target.result;

            _setImage(image, $container, class_);
        });
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

    return {
        loadMainImage: _loadMainImg,
        loadWatermark: _loadWaterImg
    }
}());