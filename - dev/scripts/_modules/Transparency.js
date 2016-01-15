var Transparency = (function () {
    var lastPercent = globalParameters.defaults.transparency,
        $img;

    var _setTransparency = function (percent) {
        if (percent === undefined)percent = lastPercent;

        var $image = $('.' + globalParameters.classWatermarkImage),
            opacity = percent / 100;

        $image.css('opacity',opacity);

        lastPercent = percent;
    };

    return {
        set: _setTransparency,
        init: function($image){
            $img = $image;
            _setTransparency();
        }
    }
}());