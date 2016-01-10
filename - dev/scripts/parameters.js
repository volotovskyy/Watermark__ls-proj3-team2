var globalParameters = {
    mainContainer:              $('.work__workplace'),
    watermarkContainer:         $('.work__img'),

    mainImageInput:             $('#main_img'),
    mainImageInputWrapper:      $('#main_img_name'),

    watermarkImageInput:        $('#watermark'),
    watermarkImageInputWrapper: $('#watermark-name'),

    classMainImage:             'main-image',
    classWatermarkImage:        'watermark-image',


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
        position:     [100,10]
    }
};