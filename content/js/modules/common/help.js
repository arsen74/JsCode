; (function (window, app, undefined) {
    define('common/help', ['jquery', 'knockout'], function ($, ko) {        
        var helpModel = function (params) {
            var self = this;

            params = params || {};
            params.help = params.help || [];
            params.element = params.element || '';

            self.cite = ko.observableArray(params.help);

            self.isActive = ko.pureComputed(function () {
                return self.cite().length > 0;
            },
            self);

            $('body').on('keydown', function (event) {
                switch (event.key) {
                    case 'F1':
                        $(params.element).foundation('open', event);
                        event.preventDefault();
                        return true;
                }

                return true;
            });
        }

        helpModel.prototype.dispose = function () {
            $('body').off('keydown');
        };

        return {
            viewModel: helpModel,
            template: { element: 'common-help' }
        };
    });
})(window, window.app);