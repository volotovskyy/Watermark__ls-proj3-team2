var Transparency = (function () {
    var lastPercent = globalParameters.defaults.transparency,
        $wrapper;

    return {
        set: function (percent) {
            if (percent === undefined)percent = lastPercent;

            var
                opacity = percent / 100;

            $wrapper.css('opacity',opacity);

            lastPercent = percent;
        },
        init: function($wrap){
            $wrapper = $wrap;
            this.set();
        }
    }
}());