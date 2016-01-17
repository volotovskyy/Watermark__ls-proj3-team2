var Language = (function () {
    var language = {
        eng : {
            '.work__header' : 'Watermarks Generator',
            '.control__header': 'Settings',
            '#original-image' : 'Original image',
            '#watermark-image' : 'Watermark',
            '#position' : 'Place',
            '#transparency' : 'Transparency',
            '.form__btn-reset' : 'Reset',
            '.form__btn-download' : 'Download'
        },

        ru : {
            '.work__header' : 'Генератор водяных знаков',
            '.control__header': 'Настройки',
            '#original-image' : 'Генератор водяных знаков',
            '#watermark-image' : 'Водяной знак',
            '#position' : 'Положение',
            '#transparency' : 'Прозрачность',
            '.form__btn-reset' : 'Сброс',
            '.form__btn-download' : 'Скачать'
        }
    };

    function _eventListener (){
        $('.language').on('click', function() {
            var lang = $(this).attr('language');
            changeLanguage(lang);
        })
    }

    function changeLanguage(lang){
        $.each(language[lang], function(key, val){
            $(key).text(this);
        });
    }

    return {
        init: function () {
            _eventListener();
        }
    }
}());