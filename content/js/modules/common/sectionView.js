; (function (window, app, undefined) {
    define('common/sectionView', ['jquery', 'knockout'], function ($, ko) {
        var viewModel = function (params) {
            var self = this;

            params = params || {};
            params.containerClass = params.containerClass || '';
            params.title = params.title || '';
            params.sections = params.sections || [];

            self.containerClass = ko.observable(params.containerClass);
            self.sections = ko.observableArray(params.sections);
            self.title = ko.observable(params.title);

            self.showTitle = ko.pureComputed(function () {
                return self.title().length > 0;
            }, self);

            self.sectionCompletedDlg = function (obj) {
                var item = self.sections()[obj.index],
                    $el;

                $el = $('#' + item.id + ' div.circle');
                if ($el) {
                    if (obj.state) {
                        $el.addClass('circle-yellow');
                    }
                    else {
                        $el.removeClass('circle-yellow');
                    }
                }
            };
            app.pubsub.on(app.events.common.sectionView.completed, self.sectionCompletedDlg);
        };

        viewModel.prototype.dispose = function () {
            app.pubsub.off(app.events.common.sectionView.completed, this.sectionCompletedDlg);
        };

        return {
            viewModel: viewModel,
            template: { element: 'common-section-view' }
        };
    });
})(window, window.app);