; (function (window, app, undefined) {
    define('main', ['knockout'], function (ko) {        
        var mainModel = function (params) {
            var self = this;

            self.leftMenu = [
                {
                    url: '/projects', title: 'Проекты', imageSrc: '/content/images/basic_case.png', level: 1
                },
                {
                    url: '/projects/{0}/tasks', title: 'Задачи', imageSrc: '/content/images/basic_book.png', level: 2
                },
                {
                    url: '/projects/{0}/tasks/new', title: 'Новая задача', imageSrc: '/content/images/basic_elaboration_todolist_plus.png', level: 3
                },
                {
                    url: '/projects/{0}/tasks/history', title: 'История', imageSrc: '/content/images/basic_todo_txt.png', level: 3
                },
                {
                    url: '/projects/{0}/scheduler', title: 'Планировщик', imageSrc: '/content/images/basic_clock.png', level: 2
                },
                {
                    url: '/projects/{0}/reports', title: 'Отчеты', imageSrc: '/content/images/basic_elaboration_folder_graph.png', level: 2
                },
                {
                    url: '/settings', title: 'Настройки', imageSrc: '/content/images/basic_question.png', level: 1
                },
                {
                    url: '/help', title: 'Помощь', imageSrc: '/content/images/basic_gear.png', level: 1
                }
            ];

            self.controls = ko.observableArray([
                {
                    url: '/404',
                    name: 'Страница не найдена',
                    topMenu: [],
                    help: [],
                    controls: ['common/404']
                },
                {
                    url: '/',
                    name: 'Окироя',
                    topMenu: [{ url: '/', title: 'Проекты' }],
                    help: ['Пример', 'Еще'],
                    controls: ['dashboard/home']
                },
                {
                    url: '/projects',
                    name: 'Проекты',
                    topMenu: [{ url: '/', title: 'Проекты' }],
                    help: [],
                    controls: ['project/list']
                },
                {
                    url: '/projects/{0}/tasks',
                    name: 'Задачи',
                    topMenu: [{ url: '/tasks', title: 'Задачи' }, { url: '/scheduler', title: 'Планировщик' }, { url: '/reports', title: 'Отчеты' }],
                    help: [],
                    controls: ['dashboard/task']
                },
                {
                    url: '/projects/{0}/tasks/new',
                    name: 'Создать новую задачу',
                    topMenu: [{ url: '/tasks/new', title: 'Новая задача' }, { url: '/tasks/history', title: 'История' }],
                    help: [],
                    controls: ['task/wizard']
                },
                {
                    url: '/reports',
                    name: 'Отчеты',
                    topMenu: [],
                    help: [],
                    controls: ['dashboard/report']
                }
            ]);
            self.currentUrl = ko.observable(window.location.pathname);
            self.currentUrlParams = ko.observable('');
            self.currentLevel = ko.observable(1);

            self.currentControlSet = ko.pureComputed(function () {          
                var result,
                    data = self.controls(),
                    url = self.currentUrl(),
                    urlParams = self.currentUrlParams();
                for (var i = 0; i < data.length; i++) {
                    if (app.sys.format(data[i].url, urlParams) == url) {
                        result = data[i];
                    }
                }

                if (result === undefined) {
                    result = data[0];
                }

                window.document.title = result.name;

                return result;
            },
			self);

            self.navigate = function () {
                app.router.navigate('/', { trigger: true });
            };
                        
            app.pubsub.on(app.events.url.change, function (data) {    
                self.currentUrl(data.url);
                self.currentLevel(data.level || 1);
                self.currentUrlParams(data.params || '');
            });
        };

        mainModel.prototype.dispose = function () {
            app.pubsub.off(app.events.url.change, this);
        };

        return {
            viewModel: mainModel,
            template: { element: 'main' }
        };
    });
})(window, window.app);