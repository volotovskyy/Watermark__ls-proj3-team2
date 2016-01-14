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

    var setScaleWaterMark = function (image, callback) {
        var $container = globalParameters.watermarkContainer,
            $image = $('.' + globalParameters.classWatermarkImage),
            img = document.createElement('img'),
            noDisplay = globalParameters.classNoDisplay;

        $container.append(img);

        $(img)
            .addClass(noDisplay)
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

                    $image
                        .width(size.width * rate.width)
                        .height(size.height * rate.height);

                    if (callback)callback();
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
            class_1 = globalParameters.classNoDisplay,
            sizeContainer = {
                width: $container.width(),
                height: $container.height()
            };

        img = document.createElement('img'), // для определения размеров
            img1 = document.createElement('img'); // для определения размеров;

        $container
            .append(img)
            .append(img1);

        $(img1)
            .one('load', function () {

                var $this = $(this);

                images.size.original.width = $this.width();
                images.size.original.height = $this.height();

                $this.remove();

                $(img)
                    .one('load', function () {
                        var $this = $(this),
                            width = $this.width(),
                            height = $this.height();

                        //if(width < sizeContainer.width) width = sizeContainer.width;
                        //else if(height < sizeContainer.height) width = sizeContainer.height;

                        images.size.scale.width = width;
                        images.size.scale.height = height;

                        console.log(sizeContainer);
                        console.log(images);
                        $this.remove();
                        _setScalewatermarkContainer(callback);

                    })
                    .attr('src', image)
                    .addClass(class_);
            })
            .attr('src', image)
            .addClass(class_1);

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

        getSizeMainImage: function () {
            return images.size.scale;
        }
    }
}());