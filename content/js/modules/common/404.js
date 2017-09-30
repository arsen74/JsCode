; (function (window, app, undefined) {
    define('common/404', ['knockout'], function (ko) {
        var notFoundModel = function (params) {
            var self = this;
        };

        return {
            viewModel: notFoundModel,
            template: { element: 'common-404' }
        };
    });
})(window, window.app);