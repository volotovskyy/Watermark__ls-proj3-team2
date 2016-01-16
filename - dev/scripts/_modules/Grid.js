var Grid = (function () {
    var class_ = globalParameters.gridClass,
        sizeGrid = {
            col:    3,
            row:    3
        },
        $activePoint = null;

    function _setSizeGrid (size){
        if(size != undefined && size[0] !== undefined)sizeGrid.col = size[0];
        if(size != undefined && size[1] !== undefined)sizeGrid.row = size[1];
    };

    function _eventListener () {
        $(class_).on('click', _click);
    };

    function _click (e) {
        var $this = $(this),
            index = $this.index(),
            centerBlockPosition = _getCenterPositionBlockByIndex(index),
            pos = _watermarkCenterByPosition(centerBlockPosition);

        Position.set(pos);
        setNoActivePoints();
        $this.addClass('active');
        $activePoint = $this;
    };

    function _getCenterPositionBlockByIndex (index) {
        var size = Images.getSizeMainImage(),
            block = {
                width: parseInt(size.width) / sizeGrid.col,
                height: parseInt(size.height) / sizeGrid.row,
            },
            hCountBlock = index / sizeGrid.col >> 0, // номер блока в столбце
            wCountBlock = index % sizeGrid.col;      // номер блока в строке

        return [
            block.width / 2 + block.width * wCountBlock,
            block.height / 2 + block.height * hCountBlock
        ];
    }

    function _watermarkCenterByPosition (pos){
        var size = Images.getSizeWatermark();

        return [
            pos[0] - parseInt(size.width)/2,
            pos[1] - parseInt(size.height)/2
        ]
    }

    function setNoActivePoints(){
        if($activePoint){
            $activePoint.removeClass('active');
            $activePoint = null;
        }
    }
    return {
        init: function (sizeGrid) {
            _eventListener();
            _setSizeGrid(sizeGrid);
        },

        setNoActivePoints: setNoActivePoints
    }
}());
