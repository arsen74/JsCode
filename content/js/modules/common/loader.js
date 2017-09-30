; (function (window, app, undefined) {
    define('common/loader', ['jquery', 'underscore'], function ($, _) {        
        var loader = function () {
            var self = this;

            self.action = function (func, callback) {
                var isTimer = false,
                    isLoaded = false,
                    result;

                var _check = function () {
                    if (isTimer && isLoaded) {
                        callback();
                    }
                };

                _.delay(function () {
                    isTimer = true;
                    _check();
                }, 500); //0.5 сек

                try {
                    result = func();
                }
                finally {
                    isLoaded = true;
                    _check();
                }

                return result;
            };
        };

        return new loader();
    });
})(window, window.app);