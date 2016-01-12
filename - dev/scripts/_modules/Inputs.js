var Inputs = (function () {
    var
        $x = globalParameters.controlPanel.inputs.$x,
        $y = globalParameters.controlPanel.inputs.$y;

    var _eventListener = function () {

        $x.on('keyup',function(){
            var position = [$x.val()];
            Base.trigger('position:set',position);
        });

        $y.on('keyup',function(){
            var position = [undefined, $y.val()];
            Base.trigger('position:set',position);
        });

    };

    return {

        init: function () {
            this.set([0, 0]);
            _eventListener();
        },

        set: function (position) {
            if(position[0] !== undefined)$x.val(position[0]);
            if(position[1] !== undefined)$y.val(position[1]);
        }

    }
}());