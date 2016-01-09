var Scale = (function () {
    var mainImage = {
        width: 0,
        height: 0,
        left: 0,
        top: 0
    };

    var _setScaleWaterMark = function () {
        var $container = globalParameters.watermarkContainer,
            $image = $('.' + globalParameters.classWatermarkImage);

        //$image
        //    .css('top', paddingTop)
        //    .css('left', paddingLeft);
    };

    var _setScaleMainImage = function () {

        var $container = globalParameters.mainContainer,
            $watermarkContainer = globalParameters.watermarkContainer,
            $image = $('.' + globalParameters.classMainImage);


        if($image.width() > $image.height()){
            $image.width($container.width());
        }else{
            $image.height($container.height());
        }


        $watermarkContainer
            .css('top', ($container.height() - $image.height()) / 2)
            .css('left',  ($container.width() - $image.width()) / 2)
            .width($image.width())
            .height($image.height());
    };

    return {
        mainImage: _setScaleMainImage,
        watermark: _setScaleWaterMark
    }
}());