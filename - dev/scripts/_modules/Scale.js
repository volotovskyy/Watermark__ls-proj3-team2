var Scale = (function () {
    var class_ = globalParameters.classWatermarkImage;
    function setScaleWaterMark(image, callback) {
        var img = new Image();

        img.onload = function () {
            Base.settings.watermark.originalSize.width = this.width;
            Base.settings.watermark.originalSize.height = this.height;

            scaleWatermark(callback);
        };

        img.src = image;
    }

    function refreshWatermark($img){
        var
            width = Base.settings.watermark.scaleSize.width,
            height = Base.settings.watermark.scaleSize.height;

        $img = $img || $('.' + class_);

        $img.width(width);
        $img.height(height);
    }

    function scaleWatermark(callback){
        var
            scale = Base.settings.scale,
            wOrigin = Base.settings.watermark.originalSize.width,
            hOrigin = Base.settings.watermark.originalSize.height,
            wBack = Base.settings.wrapper.scaleSize.width,
            hBack = Base.settings.wrapper.scaleSize.height,
            w,
            h;

        w = Math.floor(wOrigin/scale);
        h = Math.floor(hOrigin/scale);

        if(w > wBack || h > hBack){
            var
                scaleW = w / wBack,
                scaleH = h / hBack;

            scale *= scaleW > scaleH ? scaleW : scaleH;

            w = Math.floor(wOrigin/scale);
            h = Math.floor(hOrigin/scale);
        }

            Base.settings.watermark.scaleSize.width = w;
            Base.settings.watermark.scaleSize.height = h;
            Base.settings.scaleWatermark = scale;

        if(callback)callback();

        return this;
    }

    function _Scale(image, name, containerSize, callback) {
        var img = new Image();

        img.onload = function () {
            var width = this.width,
                height = this.height,
                scale = 1;
            Base.settings[name].originalSize.width = width;
            Base.settings[name].originalSize.height = height;

            if (containerSize.width < width || containerSize.height < height) {
                var scaleW = width / containerSize.width,
                    scaleH = height / containerSize.height;

                scale = scaleW > scaleH ? scaleW : scaleH;
            }

            Base.settings.scale = scale;
            var
                widthS = Math.floor(width / scale),
                heightS = Math.floor(height / scale);

            Base.settings[name].scaleSize.width = widthS;
            Base.settings[name].scaleSize.height = heightS;
            Base.settings[name].position.left = center(containerSize.width, widthS);
            Base.settings[name].position.top = center(containerSize.height, heightS);

            callback(Base.settings[name]);
        };

        img.src = image;
    }


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
                size = image.scaleSize,
                bs = size.width + 'px ' + size.height + 'px';

            $mainContainer.css('background-size', bs);

            $watermarkContainer.width(size.width);
            $watermarkContainer.height(size.height);
            $watermarkContainer.css('left', image.position.left);
            $watermarkContainer.css('top', image.position.top);

            scaleWatermark(callback);
            //callback();
        });

    }


    return {
        mainImage: setScaleMainImage,
        watermark: setScaleWaterMark,
        scaleWatermark: scaleWatermark,
        refresh:refreshWatermark
    }
}());