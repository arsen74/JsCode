; (function (window, app, undefined) {
    define('dashboard/home', ['knockout'], function (ko) {
        var homeModel = function (params) {
            var self = this;
        };

        homeModel.prototype.dispose = function () {
        };

        return {
            viewModel: homeModel,
            template: { element: 'dashboard-home' }
        };
    });
})(window, window.app);