(function ($) {
    $(function () {
        $('#header').addClass('loaded');
        setTimeout(
            function () {
                $('#layout').addClass('loaded');
            }, 300);
        setTimeout(
            function () {
                $('#footer').addClass('loaded');
            }, 600);
    });

})(jQuery);