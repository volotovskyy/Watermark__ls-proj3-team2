var globalParameters;
globalParameters = {
    //mainContainer: $('.work__workplace'),
    //watermarkContainer: $('.work__img'),

    mainContainer: $('.work__img-block'),
    watermarkContainer: $('.work__watermark-block'),


    mainImageInput: $('#main_img'),
    mainImageInputWrapper: $('#main_img_name'),

    watermarkImageInput: $('#watermark'),
    watermarkImageInputWrapper: $('#watermark-name'),

    classMainImage: 'main-image',
    classWatermarkImage: 'watermark-image',

    buttonResetId: '#reset',
    buttonSubmit: $('#submit'),

    gridClass: '.position__point',

    controlPanel: {

        spiners: {
            $xu: $('#upX'),
            $xd: $('#downX'),
            $yu: $('#upY'),
            $yd: $('#downY')
        },

        inputs: {
            $x: $('#moveX'),
            $y: $('#moveY')
        }
    },

    defaults: {
        transparency: 50,        // persents
        position: [10, 10]
    },

    url: 'php/watermark.php'
};