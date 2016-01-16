var globalParameters = {
    //mainContainer: $('.work__workplace'),
    //watermarkContainer: $('.work__img'),

    mainContainer: $('.work__img-block'),
    watermarkContainer: $('.work__watermark-block'),
    watermarkWrapperClass: 'work__watermark-wrapper',

    mainImageInput: $('#main_img'),
    mainImageInputWrapper: $('#main_img_name'),

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

            $wu: $('#UpVertical'),
            $wd: $('#DownVertical'),
            $hu: $('#upHorizontal'),
            $hd: $('#downHorizontal')
        },

        inputs: {
            $x: $('#moveX'),
            $y: $('#moveY'),
            $px: $('#vertical'),
            $py: $('#horizontal'),
        }
    },

    defaults: {
        transparency: 50,        // persents
        position: [10, 10],
        gridPadding:[18,19]
    },

    url: 'php/watermark.php'
};