var Inputs = (function () {
    var
        $x = globalParameters.controlPanel.inputs.$x,
        $y = globalParameters.controlPanel.inputs.$y;

    var _eventListener = function () {

        $x.on('keyup',function(){
            var position = [$x.val()];
            Position.set(position);

        });

        $y.on('keyup',function(){
            var position = [undefined, $y.val()];
            Position.set(position);
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