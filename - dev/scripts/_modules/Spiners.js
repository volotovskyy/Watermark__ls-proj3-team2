var Spiners = (function () {
    var
        $xu = globalParameters.controlPanel.spiners.$xu,
        $xd = globalParameters.controlPanel.spiners.$xd,
        $yu = globalParameters.controlPanel.spiners.$yu,
        $yd = globalParameters.controlPanel.spiners.$yd
        ;

    var _eventListener = function () {

        $xu.on('click', function(){
            Position.add([1, 0]);

        });

        $xd.on('click', function(){
                Position.add([-1, 0]);

        });

        $yu.on('click', function(){
                Position.add([0, 1]);

        });

        $yd.on('click', function(){
                Position.add([0, -1]);

        });
    };

    return {
        init: function () {
            _eventListener();
        }
    }
}());