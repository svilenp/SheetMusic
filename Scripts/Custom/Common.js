(function (musicassistant, $) {
    "use strict"

    musicassistant.common = (function () {

        var init = function () {
            $(function () { 
                $('a[href="' + location.pathname + '"]').parent().addClass('active');
            });
        }

        return {
            init: init
        }
    })();

    musicassistant.common.init();

})(window.musicassistant = window.musicassistant || {}, window.jQuery);
