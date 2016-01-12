var globalParameters = {
    mainContainer:              $('.work__workplace'),
    watermarkContainer:         $('.work__watermark-block'),


    mainImageInput:             $('#main_img'),
    mainImageInputWrapper:      $('#main_img_name'),

    watermarkImageInput:        $('#watermark'),
    watermarkImageInputWrapper: $('#watermark-name'),

    classMainImage:             'main-image',
    classWatermarkImage:        'watermark-image',

    buttonReset:                $('#reset'),
    buttonSubmit:                $('#submit'),

    controlPanel:{

        spiners:{
            $xu:                $('#upX'),
            $xd:                $('#downX'),
            $yu:                $('#upY'),
            $yd:                $('#downY')
        },

        inputs:{
            $x:                 $('#moveX'),
            $y:                 $('#moveY')
        }
    },

    defaults:   {
        transparency: 50,        // persents
        position:     [10,10]
    },

    url : 'php/test.php'
};