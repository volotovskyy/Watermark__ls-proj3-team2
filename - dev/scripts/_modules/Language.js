language = {
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

var changeLanguage = function(lang){
    $.each(language[lang], function(key, val){
        $(key).text(this);
        console.log(this, val, key);
    });
};

//https://vk.com/loftschoolweb112015

//<a onclick="Share.vkontakte('https://vk.com/loftschoolweb112015','TITLE','IMG_PATH','DESC')"> {шарь меня полностью}</a>

Share = {
    vkontakte: function(purl, ptitle, pimg, text) {
        url  = 'http://vkontakte.ru/share.php?';
        url += 'url='          + encodeURIComponent(purl);
        //url += '&title='       + encodeURIComponent(ptitle);
        //url += '&description=' + encodeURIComponent(text);
        //url += '&image='       + encodeURIComponent(pimg);
        //url += '&noparse=true';
        Share.popup(url);
    },
    facebook: function(purl, ptitle, pimg, text) {
        url  = 'http://www.facebook.com/sharer.php?s=100';
        url += '&p[title]='     + encodeURIComponent(ptitle);
        url += '&p[summary]='   + encodeURIComponent(text);
        url += '&p[url]='       + encodeURIComponent(purl);
        url += '&p[images][0]=' + encodeURIComponent(pimg);
        Share.popup(url);
    },
    twitter: function(purl, ptitle) {
        url  = 'http://twitter.com/share?';
        url += 'text='      + encodeURIComponent(ptitle);
        url += '&url='      + encodeURIComponent(purl);
        url += '&counturl=' + encodeURIComponent(purl);
        Share.popup(url);
    },


    popup: function(url) {
        window.open(url,'','toolbar=0,status=0,width=626,height=436');
    }
};