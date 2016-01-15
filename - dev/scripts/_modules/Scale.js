var Scale = (function () {
    var setScaleWaterMark = function (image, callback) {
        var img = new Image();

        img.onload = function () {
            Base.settings.watermark.originalSize.width = this.width;
            Base.settings.watermark.originalSize.height = this.height;

            scaleWatermark(callback);
        };

        img.src = image;

    };

    function scaleWatermark(callback){
        var
            $image = $('.' + globalParameters.classWatermarkImage),
            scale = Base.settings.scale,
            width = Base.settings.watermark.originalSize.width,
            height = Base.settings.watermark.originalSize.height;

        if(width > 0 && height > 0){
            width = Base.settings.watermark.scaleSize.width = Math.floor(width/scale);
            height = Base.settings.watermark.scaleSize.height = Math.floor(height/scale);

            $image.width(width);
            $image.height(height);
        }
        if(callback)callback();
    }

    function _Scale(image, name, containerSize, callback) {
        var img = new Image();

        img.onload = function () {
            var width = this.width,
                height = this.height,
                scale = 1;


            if (containerSize.width < width || containerSize.height < height) {
                var scaleW = width / containerSize.width,
                    scaleH = height / containerSize.height;

                scale = scaleW > scaleH ? scaleW : scaleH;
            }

            Base.settings.scale = scale;
            var
                widthS = Math.floor(width / scale),
                heightS = Math.floor(height / scale);
            Base.settings[name].size.width = widthS;
            Base.settings[name].size.height = heightS;
            Base.settings[name].position.left = center(containerSize.width, widthS);
            Base.settings[name].position.top = center(containerSize.height, heightS);

            callback(Base.settings[name]);
        };

        img.src = image;

    };

    function center(wrapp, inner) {
        return Math.floor((wrapp - inner) / 2);
    }

    function setScaleMainImage(image, callback) {

        var
            $watermarkContainer = globalParameters.watermarkContainer,
            $mainContainer = globalParameters.mainContainer,
            name = 'wrapper';

        _Scale(image, name, Base.settings.window.size, function (image) {
            var
                size = image.size,
                bs = size.width + 'px ' + size.height + 'px';

            $mainContainer.css('background-size', bs);

            $watermarkContainer.width(size.width);
            $watermarkContainer.height(size.height);
            $watermarkContainer.css('left', image.position.left);
            $watermarkContainer.css('top', image.position.top);

            callback();
        });

    };


    return {
        mainImage: setScaleMainImage,
        watermark: setScaleWaterMark,
        scaleWatermark: scaleWatermark
    }
}());