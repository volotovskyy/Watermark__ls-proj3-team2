var Transparency = (function () {
    var lastPercent = globalParameters.defaults.transparency;

    var setTransparency = function (percent) {
        if (percent === undefined)percent = lastPercent;

        var $image = $('.' + globalParameters.classWatermarkImage),
            opacity = percent / 100;

        $image.css('opacity',opacity);

        lastPercent = percent;
    };

    return {
        set: setTransparency,

        hide: function(){
            var opacity = lastPercent;
            setTransparency(0);
            lastPercent = opacity;
        }
    }
}());