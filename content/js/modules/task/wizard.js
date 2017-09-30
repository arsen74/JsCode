; (function (window, app, undefined) {
    define('task/wizard', ['knockout'], function (ko) {
        var wizardModel = function (params) {
            var self = this;

            params = params || {};

            self.sectionContainer = {
                containerClass: 'wizard-vertical',
                title: 'Шаги',
                sections: [
                {
                    id: app.sys.generateUniqueId(),
                    sectionItem: 'task/wizard-step/selectTaskType',
                    sectionParams: {}
                },
                {
                    id: app.sys.generateUniqueId(),
                    sectionItem: 'task/wizard-step/defineParams',
                    sectionParams: {}
                },
                {
                    id: app.sys.generateUniqueId(),
                    sectionItem: 'task/wizard-step/launch',
                    sectionParams: {}
                }]
            };
        };

        wizardModel.prototype.dispose = function () {
        };

        return {
            viewModel: wizardModel,
            template: { element: 'task-wizard' }
        };
    });
})(window, window.app);