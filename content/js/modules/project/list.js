; (function (window, app, undefined) {
    define('project/list', ['jquery', 'knockout', 'foundation'], function ($, ko, f) {
        var initFunc = function (selector, val) {
            $(selector).filter(function (index, el) {
                if (el.id == val) {
                    $(el).foundation();
                }
            });
        };

        ko.bindingHandlers.initTabs = {
            init: function (element, valueAccessor) {
                initFunc('.js-tabs', ko.unwrap(valueAccessor()));
            }
        };
        ko.bindingHandlers.initModal = {
            init: function (element, valueAccessor) {
                initFunc('.js-modal', ko.unwrap(valueAccessor()));
            }
        };
        ko.virtualElements.allowedBindings.initTabs = true;
        ko.virtualElements.allowedBindings.initModal = true;

        var listModel = function (params) {
            var self = this;

            self.moduleId = app.sys.generateUniqueId();

            self.sites = ko.observableArray([{ id: 1000, name: 'www.ozon.ru' }]).extend({ deferred: true });

            self.newSiteUrl = ko.observable('');

            self.isActive = function (index, activeState) {
                return index == 0 ? activeState : '';
            };

            self.addSite = function (el) {
                self.sites.push({
                    id: 1,
                    name: self.newSiteUrl()
                });
                self.newSiteUrl('');

                $(el.close).click();
                ko.tasks.schedule(function () {
                    Foundation.reInit('tabs');
                });                
            };
        };

        listModel.prototype.dispose = function () {
        };

        return {
            viewModel: listModel,
            template: { element: 'project-list' }
        };
    });
})(window, window.app);