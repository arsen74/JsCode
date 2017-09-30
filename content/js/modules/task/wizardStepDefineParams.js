; (function (window, app, undefined) {
    define('task/wizard-step/defineParams', ['knockout'], function (ko) {
        ko.bindingHandlers.taskSetParams = {
            update: function (element, valueAccessor) {
                app.pubsub.trigger(app.events.task.wizard.defineParams, ko.unwrap(valueAccessor()));
            }
        };

        var wizardModel = function (params) {
            var self = this;

            self.control = ko.observable('');
            self.visible = ko.observable(false);

            self.hasControl = ko.pureComputed(function () {
                return self.control().length > 0;
            }, self);

            self.selectTypeDlg = function (obj) {
                self.control(obj.control);
                self.visible(obj.state);
            };
            app.pubsub.on(app.events.task.wizard.selectType, self.selectTypeDlg);

            self.clearDlg = function () {
                self.control('');
                self.visible(false);
            };
            app.pubsub.on(app.events.task.wizard.clear, self.clearDlg);
        };

        wizardModel.prototype.dispose = function () {
            app.pubsub.off(app.events.task.wizard.selectType, this.selectTypeDlg);
            app.pubsub.off(app.events.task.wizard.clear, this.clearDlg);
        };

        return {
            viewModel: wizardModel,
            template: { element: 'task-wizard-step-defineParams' }
        };
    });
})(window, window.app);