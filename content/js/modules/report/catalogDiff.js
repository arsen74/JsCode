; (function (window, app, undefined) {
    define('report/catalogDiff', ['jquery', 'knockout'], function ($, ko) {
        var itemTypes = [
            { name: 'Без изменений', css: '' },
            { name: 'Добавлен', css: 'fi-plus' },
            { name: 'Удален', css: 'fi-x' },
            { name: 'Переименован', css: 'fi-refresh' }];
        
        var treeItem = function (id, type, name, level, children) {
            var self = this;

            self.id = ko.observable(id);
            self.type = ko.observable(type);
            self.name = ko.observable(name);
            self.level = ko.observable(level);
            self.children = ko.observableArray(children);

            self.hasChildren = ko.pureComputed(function () {
                return self.children().length > 0;
            }, self);

            self.iconClass = ko.pureComputed(function () {
                return itemTypes[self.type() - 1].css;
            }, self);

            self.iconText = ko.pureComputed(function () {
                return itemTypes[self.type() - 1].name;
            }, self);
        };

        var treeModel = function (params) {
            var self = this;

            params = params || {};
            
            self.items = ko.observableArray([]);

            self.addChildren = function (items) {
                var result = [],
                    localRoot,
                    tmp;

                for (var i = 0; i < items.length; i++) {
                    tmp = new treeItem(items[i].id, items[i].type, items[i].name, items[i].level);
                    if (items[i].level > 1) {
                        localRoot.children.push(tmp);
                    }
                    else {
                        localRoot = tmp;
                        result.push(localRoot);
                    }
                }

                return result;
            };

            self.loadItems = function () {
                self.items(
                    self.addChildren([
                        { id: 1, type: 1, name: 'Книги', level: 1 },
                        { id: 11, type: 2, name: 'Детская литература', level: 2 },
                        { id: 12, type: 4, name: 'Научно-техническая литература', old: 'Научная литература', level: 2 },
                        { id: 2, type: 1, name: 'Электроника', level: 1 },
                        { id: 21, type: 2, name: 'Наушники', level: 2 },
                        { id: 22, type: 3, name: 'Магнитофоны', level: 2 }
                    ]));
            };

            self.loadItems();
        }

        treeModel.prototype.dispose = function () {
        };

        return {
            viewModel: treeModel,
            template: { element: 'report-catalog-diff' }
        };
    });
})(window, window.app);