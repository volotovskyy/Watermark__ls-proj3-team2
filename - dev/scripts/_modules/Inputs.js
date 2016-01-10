var Inputs = (function () {
    var
        $x = globalParameters.controlPanel.inputs.$x,
        $y = globalParameters.controlPanel.inputs.$y;

    return {

        init: function () {
            this.set([0, 0]);
        },

        set: function (position) {
            $x.val(position[0]);
            $y.val(position[1]);
        }

    }
}());