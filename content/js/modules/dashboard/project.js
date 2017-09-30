; (function (window, app, undefined) {
    define('dashboard/project', ['jquery', 'knockout', 'common/grid'], function ($, ko, grid) {
        var dashboardModel = function (params) {
            var self = this;

            params = params || {};
            params.id = params.id || 0;

            var _dataLoader = function (page, pageSize, sortBy, sortAsc) {
                return [
                    { id: 1, name: 'first' },
                    { id: 2, name: 'second' }
                ];
            };

            self.gridOptions = ko.observable({
                dataSource: _dataLoader,
                columns: ['Тип', 'Наименование'],
                rowTemplate: 'project-grid-row',
                sorting: {
                    enabled: true
                }
            });

            self.projectName = ko.observable('www.ozon.ru');
            self.projectId = ko.observable(params.id);

            self.newTaskUrl = ko.pureComputed(function () {
                return app.sys.format('/projects/{0}/tasks/new', self.projectId());
            }, self);

            self.schedulerUrl = ko.pureComputed(function () {
                return app.sys.format('/projects/{0}/scheduler', self.projectId());
            }, self);
        }

        dashboardModel.prototype.dispose = function () {
        };

        return {
            viewModel: dashboardModel,
            template: { element: 'dashboard-project' }
        };
    });
})(window, window.app);