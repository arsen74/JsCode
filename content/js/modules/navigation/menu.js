; (function (window, app, undefined) {
    define('navigation/menu', ['jquery', 'knockout', 'router'], function ($, ko, router) {
		var menuModel = function (params) {
		    var self = this;

		    params = params || {};
		    params.items = params.items || [];
		    params.css = params.css || false;
		    params.showImage = params.showImage || false;
		    params.level = params.level || 1;

		    self.items = ko.observableArray(params.items);

		    self.currentItems = ko.pureComputed(function () {
		        var data = [],
                    item;
		        for (var i = 0; i < self.items().length; i++) {
		            item = self.items()[i];
		            if ((item.level == undefined) ||
                        ((item.level != undefined) && (item.level <= params.level))) {
		                data.push(item);
		            }
		        }
		        return data;
		    }, this);

		    self.menuCss = function () {
		        return params.css;
		    };

		    self.hasImage = function (item) {
		        return item.imageSrc != undefined;
		    };

		    self.navigate = function (item) {
		        app.router.navigate(item.url, { trigger: true });
		    };
		};

		return {
		    viewModel: menuModel,
			template: { element: 'navigation-menu' }
		};
    });
})(window, window.app);