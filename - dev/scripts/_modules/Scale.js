var Scale = (function () {
    var
        images = {
            size: {
                original: {
                    width: 0,
                    height: 0
                },

                scale: {
                    width: 0,
                    height: 0
                }
            }
        };

    var setScaleWaterMark = function (image,callback) {
        var $container = globalParameters.watermarkContainer,
            $image = $('.' + globalParameters.classWatermarkImage),
            img = document.createElement('img');

        $container.append(img);

        $(img)
            .one('load', function () {
                var $this = $(this),
                    size = {
                        width: $this.width(),
                        height: $this.height()
                    };

                $this.remove();

                _getSizeWaterMark(image, function (size) {
                    var rate = _getRate();

                    var pos = [
                        $image.css('left'),
                        $image.css('top')
                    ];

                    $image.width(size.width * rate.width);
                    $image.height(size.height * rate.height);

                    if(callback)callback();
                });
            })
            .attr('src', image);
    };

    var _getRate = function () {
        return {
            height: images.size.scale.height / images.size.original.height,
            width: images.size.scale.width / images.size.original.width
        }
    };

    var _getSizeWaterMark = function (image, callback) {
        var img = document.createElement('img'),
            $container = globalParameters.watermarkContainer;

        $container
            .append(img);

        $(img)
            .one('load', function () {
                var $this = $(this),
                    size = {
                        width: $this.width(),
                        height: $this.height()
                    };

                $this.remove();

                callback(size);
            })
            .attr('src', image);
    };

    var setScaleMainImage = function (image, callback) {

        var $container = globalParameters.mainContainer,
            class_ = globalParameters.classMainImage,

            img = document.createElement('img'), // для определения размеров
            img1 = document.createElement('img'); // для определения размеров;

        $(img)
            .one('load', function () {
                var $this = $(this);

                images.size.scale.width = $this.width();
                images.size.scale.height = $this.height();

                $this.remove();

                $(img1)
                    .one('load', function () {

                        var $this = $(this);

                        images.size.original.width = $this.width();
                        images.size.original.height = $this.height();

                        $this.remove();
                        _setScalewatermarkContainer(callback);
                    })
                    .attr('src', image);
            })
            .attr('src', image)
            .addClass(class_);


        $container
            .append(img)
            .append(img1);

    };

    var _setScalewatermarkContainer = function (callback) {
        var $watermarkContainer = globalParameters.watermarkContainer,
            $container = globalParameters.mainContainer,
            width = images.size.scale.width,
            height = images.size.scale.height;

        $watermarkContainer
            .css('top', ($container.height() - height) / 2)
            .css('left', ($container.width() - width) / 2)
            .width(width)
            .height(height);

        callback();
    };

    return {
        mainImage: setScaleMainImage,
        watermark: setScaleWaterMark,

        getSizeMainImage: function(){
            return images.size.scale;
        }
    }
}());