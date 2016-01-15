var Grid = (function () {
    var class_ = globalParameters.gridClass,
        sizeGrid = {
            col:    3,
            row:    3
        };

    var _setSizeGrid = function(size){
        if(size != undefined && size[0] !== undefined)sizeGrid.col = size[0];
        if(size != undefined && size[1] !== undefined)sizeGrid.row = size[1];
    };

    var _eventListener = function () {
        $(class_).on('click', _click);
    };

    var _click = function (e) {
        var index = $(this).index(),
            centerBlockPosition = _getCenterPositionBlockByIndex(index),
            pos = _watermarkCenterByPosition(centerBlockPosition);

        Position.set(pos);
    };

    var _getCenterPositionBlockByIndex = function (index) {
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
    };

    var _watermarkCenterByPosition = function(pos){
        var size = Images.getSizeWatermark();

        return [
            pos[0] - parseInt(size.width)/2,
            pos[1] - parseInt(size.height)/2
        ]
    };


    return {
        init: function (sizeGrid) {
            _eventListener();
            _setSizeGrid(sizeGrid);
        }
    }
}());
