; (function (window, app, undefined) {
    define('dashboard/task', ['jquery', 'knockout', 'common/grid'], function ($, ko, grid) {
        var dashboardModel = function (params) {
            var self = this;

            params = params || {};
        };

        dashboardModel.prototype.dispose = function () {
        };

        return {
            viewModel: dashboardModel,
            template: { element: 'dashboard-task' }
        };
    });
})(window, window.app);