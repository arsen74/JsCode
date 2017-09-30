; (function (window, app, undefined) {
    define('dashboard/report', ['jquery', 'knockout'], function ($, ko) {
        ko.bindingHandlers.date = {
            init: function (element, valueAccessor) {
                var val = new Date(parseInt(ko.unwrap(valueAccessor()).substr(6))),
                    result = val.getDate() + '.' + (val.getMonth() + 1) + '.' + val.getFullYear();

                $(element).html(result);
            }
        };

        var dashboardModel = function (params) {
            var self = this;

            params = params || {};

            self.id = app.sys.generateUniqueId();
            self.name = ko.observable('');
            self.date = ko.observable('' + 123456789);
            self.owner = ko.observable('');
            self.sectionContainer = ko.observable({
                containerClass: 'wizard-vertical',
                title: '',
                sections: [
                {
                    id: app.sys.generateUniqueId(),
                    title: 'Сравнение каталогов',
                    isCompleted: false,
                    sectionItem: 'report/catalogDiff',
                    sectionParams: { id: 1 }
                }]
            });

            self.sections = ko.pureComputed(function () {
                var result = [];

                var items = self.sectionContainer().sections;
                for (var i = 0; i < items.length; i++) {
                    result.push({ id: items[i].id, title: items[i].title });
                }

                return result;
            }, self);
        }

        dashboardModel.prototype.dispose = function () {
        };

        return {
            viewModel: dashboardModel,
            template: { element: 'dashboard-report' }
        };
    });
})(window, window.app);