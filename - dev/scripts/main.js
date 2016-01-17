$(function () {
    Base.init();

    $('.language').on('click', function() {
        var lang = $(this).attr('language');

        changeLanguage(lang);
    })

});

