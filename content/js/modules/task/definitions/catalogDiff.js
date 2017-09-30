; (function (window, app, undefined) {
    define('task/definitions/catalogDiff', ['knockout'], function (ko) {
        var viewModel = function (params) {
            var self = this;

            self.id = app.sys.generateUniqueId();
            self.sendEmail = ko.observable(true);
            self.taskParams = ko.observableArray([
                { 'keyTitle': 'Отсылать отчет', 'key': 'SendEmail', 'valueTitle': self.sendEmail() ? 'Да' : 'Нет', 'value': self.sendEmail() }
            ]);
        }
        viewModel.prototype.dispose = function () {
        };

        return {
            viewModel: viewModel,
            template: { element: 'task-definitions-catalog-diff' }
        };
    });
})(window, window.app);