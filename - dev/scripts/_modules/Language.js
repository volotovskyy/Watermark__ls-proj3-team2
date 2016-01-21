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
            '.form__btn-download' : 'Download',
            '.footer__text': '© 2015. It is the site of our team , please do not steal and do not copy it'
        },

        ru : {
            '.work__header' : 'Генератор водяных знаков',
            '.control__header': 'Настройки',
            '#original-image' : 'Генератор водяных знаков',
            '#watermark-image' : 'Водяной знак',
            '#position' : 'Положение',
            '#transparency' : 'Прозрачность',
            '.form__btn-reset' : 'Сброс',
            '.form__btn-download' : 'Скачать',
            '.footer__text': '© 2015 год. Это сайт нашей команды, пожалуйста, не воруйте и не копируйте его'
        }
    },
        lang = 'ru';

    function _eventListener (){
        $('.language').on('click', function(e) {
            e.preventDefault();

            var $this = $(this);
            lang = $this.attr('language');

            if($this.hasClass('lang__ru_btn')){
                $this.addClass('lang__ru_btn-active');
                $('.lang__en_btn').removeClass('lang__en_btn-active');
            }else if('lang__en_btn'){
                $this.addClass('lang__en_btn-active');
                $('.lang__ru_btn').removeClass('lang__ru_btn-active');
            }

            $('html').attr('lang', lang);

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
        },

        getLanguage: function(){
            return lang;
        }
    }
}());