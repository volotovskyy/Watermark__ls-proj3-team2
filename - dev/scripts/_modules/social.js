var Social = (function () {
    var share = {
            vk: function (purl, ptitle, pimg, text) {
                url = 'http://vkontakte.ru/share.php?';
                url += 'url=' + encodeURIComponent(purl);
                url += '&title='       + encodeURIComponent(ptitle);
                url += '&description=' + encodeURIComponent(text);
                url += '&image='       + encodeURIComponent(pimg);
                url += '&noparse=true';
                popup(url);
            },
            fb: function (purl, ptitle, pimg, text) {
                url = 'http://www.facebook.com/sharer.php?s=100';
                url += '&p[title]=' + encodeURIComponent(ptitle);
                url += '&p[summary]=' + encodeURIComponent(text);
                url += '&p[url]=' + encodeURIComponent(purl);
                url += '&p[images][0]=' + encodeURIComponent(pimg);
                popup(url);
            },
            tw: function (purl, ptitle) {
                url = 'http://twitter.com/share?';
                url += 'text=' + encodeURIComponent(ptitle);
                url += '&url=' + encodeURIComponent(purl);
                url += '&counturl=' + encodeURIComponent(purl);
                popup(url);
            }
        },
        url = 'http://bogdanbk.bget.ru/',
        title = 'Watermarks Generator',
        text = title,
        img  = 'http://bogdanbk.bget.ru/img/proj.jpg';

//onclick="Share.vkontakte('https://vk.com/loftschoolweb112015','TITLE','IMG_PATH','DESC')"
    function popup(url) {
        window.open(url, '', 'toolbar=0,status=0,width=626,height=436');
    }

    function _eventListener() {
        $('.share-btn').on('click', function () {
            var social = $(this).attr('social');
            if(social)share[social](url,title,img,text)
        });
    }

    return {
        init: function () {
            _eventListener();
        }
    }
}());