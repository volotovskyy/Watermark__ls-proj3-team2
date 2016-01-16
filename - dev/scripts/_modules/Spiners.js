var Spiners = (function () {
    var
        $xu = globalParameters.controlPanel.spiners.$xu,
        $xd = globalParameters.controlPanel.spiners.$xd,
        $yu = globalParameters.controlPanel.spiners.$yu,
        $yd = globalParameters.controlPanel.spiners.$yd,

        $wu = globalParameters.controlPanel.spiners.$wu,
        $wd = globalParameters.controlPanel.spiners.$wd,
        $hd = globalParameters.controlPanel.spiners.$hd,
        $hu = globalParameters.controlPanel.spiners.$hu
        ;

    var _set = {};

    _set[globalParameters.singleMode] = function(vals){
        Position.add(vals);
    };

    _set[globalParameters.gridMode] = function(vals){
        Position.paddingAdd(vals);
    };

    var _eventListener = function () {

        $xu.on('click', function () {
            _set[Base.settings.mode]([1, 0]);
        });

        $xd.on('click', function () {
            _set[Base.settings.mode]([-1, 0]);
        });

        $yu.on('click', function () {
            _set[Base.settings.mode]([0, 1]);
        });

        $yd.on('click', function () {
            _set[Base.settings.mode]([0, -1]);
        });

        $wu.on('click', function () {
            _set[Base.settings.mode]([1, 0]);
        });

        $wd.on('click', function () {
            _set[Base.settings.mode]([-1, 0]);
        });

        $hu.on('click', function () {
            _set[Base.settings.mode]([0, 1]);
        });

        $hd.on('click', function () {
            _set[Base.settings.mode]([0, -1]);
        });
    };

    return {
        init: function () {
            _eventListener();
        }
    }
}());