; (function (window, app, undefined) {
    define('task/wizard-step/launch', ['knockout', 'underscore'], function (ko, _) {
        ko.bindingHandlers.slideVisible = {
            update: function (element, valueAccessor, allBindings) {
                var $el = $(element),
                    value = ko.unwrap(valueAccessor()),
                    duration = allBindings.get('slideDuration') || 400;

                if (value) {
                    $el.slideDown(duration);
                }
                else {
                    $el.slideUp(duration);
                }
            }
        };

        var wizardModel = function (params) {
            var self = this;

            self.visible = ko.observable(false);
            self.taskName = ko.observable('');
            self.taskParams = ko.observableArray([]);
            self.taskStarted = ko.observable(false);
            self.taskStatus = ko.observable('');

            self.taskNotStarted = ko.pureComputed(function () {
                return !self.taskStarted();
            }, self);
            self.taskHasParams = ko.pureComputed(function () {
                return self.taskParams().length > 0;
            }, self);
            self.taskHasNoParams = ko.pureComputed(function () {
                return self.taskParams().length == 0;
            }, self);

            var viewClearDlg = function () {
                self.visible(false);
                self.taskName('');
                self.taskParams([]);
                self.taskStatus('');
                self.taskStarted(false);

                app.pubsub.trigger(app.events.task.wizard.clear);
            };

            self.taskStart = function () {
                self.taskStatus('Задача ' + self.taskName() + ' запущена');
                self.taskStarted(true);
                app.pubsub.trigger(app.events.common.sectionView.completed, { index: 2, state: true });

                _.delay(function () {
                    viewClearDlg();
                }, 1500); //1.5 сек                
            };
            self.taskCancel = function () {
                viewClearDlg();
            };

            self.launchDlg = function (obj) {
                self.taskName('Задача "' + obj.name + '"');
                self.visible(obj.state);
            };
            app.pubsub.on(app.events.task.wizard.launch, self.launchDlg);

            self.defineParamsDlg = function (params) {
                var tmp = [];
                for (var i = 0; i < params.length; i++) {
                    tmp.push(params[i].keyTitle + ' - ' + params[i].valueTitle);
                }
                self.taskParams(tmp);
            };
            app.pubsub.on(app.events.task.wizard.defineParams, self.defineParamsDlg);
        };

        wizardModel.prototype.dispose = function () {
            app.pubsub.off(app.events.task.wizard.launch, this.launchDlg);
            app.pubsub.off(app.events.task.wizard.defineParams, this.defineParamsDlg);
        };

        return {
            viewModel: wizardModel,
            template: { element: 'task-wizard-step-launch' }
        };
    });
})(window, window.app);