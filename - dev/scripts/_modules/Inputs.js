var Inputs = (function () {
    var
        $x = globalParameters.controlPanel.inputs.$x,
        $y = globalParameters.controlPanel.inputs.$y;
        $px = globalParameters.controlPanel.inputs.$px;
        $py = globalParameters.controlPanel.inputs.$py;

    var _eventListener = function () {

        $x.on('keyup',function(){
            var vals = [$x.val()];
            Position.set(vals);
        });

        $y.on('keyup',function(){
            var vals = [undefined, $y.val()];
            Position.set(vals);

        });
        $px.on('keyup',function(){
            _paddingSet();

        });

        $py.on('keyup',function(){
            _paddingSet();
        });

    };

    function _paddingSet(){

        var vals = [$px.val(), $py.val()];
        Position.paddingSet(vals);
    }

    return {

        init: function () {
            this.set([0, 0]);
            _eventListener();
        },

        set: function (position) {
            if(position[0] !== undefined)$x.val(position[0]);
            if(position[1] !== undefined)$y.val(position[1]);
        },

        paddingSet: function(padding){
            if(padding[0] !== undefined)$px.val(padding[0]);
            if(padding[1] !== undefined)$py.val(padding[1]);
        }
    }
}());