; (function (window, app, undefined) {
    define('common/tileView', ['jquery', 'knockout'], function ($, ko) {
        var viewModel = function (params) {
            var self = this;

            params = params || {};
            params.css = params.css || '';
            params.name = params.name || '';
            params.description = params.description || '';
            params.control = params.control || '';
            params.setActiveCallback = params.setActiveCallback || function () { };

            self.id = app.sys.generateUniqueId();
            self.css = ko.observable(params.css);
            self.name = ko.observable(params.name);
            self.description = ko.observable(params.description);
            self.control = ko.observable(params.control);
            self.isActive = ko.observable(false);
            self.setActiveCallback = params.setActiveCallback;

            self.status = ko.pureComputed(function () {
                return self.isActive() ? 'active' : '';
            }, self);

            self.toggleActive = function () {
                self.isActive(!self.isActive());

                self.setActiveCallback(self.isActive());

                app.pubsub.trigger(app.events.common.tileView.setActive, self.id);
            };

            self.setActiveDlg = function (id) {
                if (self.id != id) {
                    self.isActive(false);
                }
            };
            app.pubsub.on(app.events.common.tileView.setActive, self.setActiveDlg);

            self.setInactiveDlg = function (id) {
                self.isActive(false);
            };
            app.pubsub.on(app.events.common.tileView.setInactive, self.setInactiveDlg);
        };

        viewModel.prototype.dispose = function () {
            app.pubsub.off(app.events.common.tileView.setActive, this.setActiveDlg);
            app.pubsub.off(app.events.common.tileView.setInactive, this.setInactiveDlg);
        };

        return {
            viewModel: viewModel,
            template: { element: 'common-tile-view' }
        };
    });
})(window, window.app);