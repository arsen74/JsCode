; (function (window, app, undefined) {
    define('task/wizard-step/selectTaskType', ['knockout'], function (ko) {
        var wizardModel = function (params) {
            var self = this;

            var setActiveCallback = function (state, name, control) {
                app.pubsub.trigger(app.events.task.wizard.selectType, { state: state, control: control });
                app.pubsub.trigger(app.events.task.wizard.launch, { name: name, state: state });

                app.pubsub.trigger(app.events.common.sectionView.completed, { index: 0, state: state });
                app.pubsub.trigger(app.events.common.sectionView.completed, { index: 1, state: state });
            };
            self.taskTypes = ko.observableArray([
                {
                    css: 'task-type-diff-catalog',
                    name: 'Сравнение каталогов',
                    description: 'Сравнение версий каталогов на предмет добавления, переименования, удаления веток',
                    control: 'task/definitions/catalogDiff',
                    setActiveCallback: function (state) {
                        setActiveCallback(state, 'Сравнение каталогов', 'task/definitions/catalogDiff');
                    }
                },
                {
                    css: 'task-type-redirect-off',
                    name: 'Снятие редиректов',
                    description: 'Автоматическое снятие существующих редиректов с товаров, появившихся в продаже',
                    control: '',
                    setActiveCallback: function (state) {
                        setActiveCallback(state, 'Снятие редиректов', '');
                    }
                },
                {
                    css: 'task-type-ya-google-data-download',
                    name: 'Выгрузка данных',
                    description: 'Выгрузка статистических данных из Yandex и Google',
                    control: '',
                    setActiveCallback: function (state) {
                        setActiveCallback(state, 'Выгрузка данных', '');
                    }
                }
            ]);

            self.clearDlg = function () {
                app.pubsub.trigger(app.events.common.tileView.setInactive);

                app.pubsub.trigger(app.events.common.sectionView.completed, { index: 0, state: false });
                app.pubsub.trigger(app.events.common.sectionView.completed, { index: 1, state: false });
                app.pubsub.trigger(app.events.common.sectionView.completed, { index: 2, state: false });
            };
            app.pubsub.on(app.events.task.wizard.clear, self.clearDlg);
        };

        wizardModel.prototype.dispose = function () {
            app.pubsub.off(app.events.task.wizard.clear, this.clearDlg);
        };

        return {
            viewModel: wizardModel,
            template: { element: 'task-wizard-step-selectTaskType' }
        };
    });
})(window, window.app);