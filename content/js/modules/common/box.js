; (function (window, app, undefined) {
    define('common/box', ['knockout'], function (ko) {
        var viewModel = function (params) {
            var self = this;

            params = params || {};
            params.title = params.title || '';
            params.data = params.data || {};

            self.title = ko.observable(params.title);
            self.controlData = ko.observable(params.data);
        }

        return {
            viewModel: viewModel,
            template: { element: 'common-box' }
        };
    });
})(window, window.app);