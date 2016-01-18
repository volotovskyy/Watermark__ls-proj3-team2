var globalParameters = {
    //mainContainer: $('.work__workplace'),
    //watermarkContainer: $('.work__img'),

    mainContainer: $('.work__img-block'),
    watermarkContainer: $('.work__watermark-block'),
    watermarkWrapperClass: 'work__watermark-wrapper',

    mainImageInput: $('#main_img'),
    mainImageInputWrapper: $('#main_img_name'),
    imgInputs: $('.form__input-img'),

    watermarkImageInput: $('#watermark'),
    watermarkImageInputWrapper: $('#watermark-name'),

    classMainImage: 'main-image',
    classWatermarkImage: 'watermark-image',

    buttonResetId: $('#reset'),
    buttonSubmit: $('#submit'),
    buttonGridMode: $('#tessel'),
    buttonSingleMode: $('#location'),

    gridClass: '.position__point',

    singleMode: 'single-mode',
    gridMode: 'grid-mode',

    controlPanel: {

        spiners: {
            $xu: $('#upX'),
            $xd: $('#downX'),
            $yu: $('#upY'),
            $yd: $('#downY'),

            $wu: $('#upHorizontal'),
            $wd: $('#downHorizontal'),
            $hu: $('#UpVertical'),
            $hd: $('#DownVertical')
        },

        inputs: {
            $x: $('#moveX'),
            $y: $('#moveY'),
            $px: $('#horizontal'),
            $py: $('#vertical')
        }
    },

    defaults: {
        transparency: 50,        // persents
        position: [0, 0],
        gridPadding:[0,0]
    },

    url: 'php/watermark.php'
};