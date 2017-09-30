; (function (window, app, undefined) {
    define('common/grid', ['jquery', 'knockout', 'common/loader'], function ($, ko, loader) {
        ko.bindingHandlers.grid = {
            init: function (element, valueAccessor) {
                var $el = $(element),
                    options = ko.unwrap(valueAccessor());
                
                var grid = new gridModel(options);

                var $gridEl = $('<div data-bind="template: \'' + grid.gridSettings.template + '\'"></div>');
                $el.append($gridEl);

                ko.applyBindings(grid, $gridEl[0]);
				
				ko.utils.domNodeDisposal.addDisposeCallback(element, function() {					
				});

                return { controlsDescendantBindings: true };
            }
        };
        ko.bindingHandlers.gridElement = {
            update: function (element, valueAccessor) {
                var $el = $(element),
                    data = ko.unwrap(valueAccessor());

                for (var prop in data) {
                    if (data.hasOwnProperty(prop)) {
                        $el.append($('<td>' + data[prop] + '</td>'));
                    }
                }
                
            }
        };
        ko.bindingHandlers.columnElement = {
            update: function (element, valueAccessor) {
                var $el = $(element),
                    data = ko.unwrap(valueAccessor());

                if (data.asc !== undefined) {
                    $el.text(data.name + ' ');
                    $el.append($('<i class="fi-arrow-' + (data.asc ? 'up' : 'down') + '" title="по ' + (data.asc ? 'возрастанию' : 'убыванию') + '"></i>'));
                }
                else {
                    $el.text(data.name);
                }
            }
        };

        var _subscription;
        var gridModel = function (params) {
            var self = this;
            
            self.gridSettings = ko.utils.extend({
                dataSource: function (page, pageSize, sortBy, sortAsc) {
                    return [];
                },
                template: 'common-grid',
                rowTemplate: '',
                sorting: {
                    enable: false,
                    sortAsc: true,
                    sortFields: []
                },
                paging: {
                    pageSize: 20,
                    pageSizes: [20, 50, 100],
                    currentPage: 1
                },
                columns: []
            }, params || {});

            self.columns = ko.observableArray([]);
            self.rowTemplate = ko.observable('');
            self.data = ko.observableArray([]).extend({ deferred: true });
            self.total = ko.observable(0);
            self.page = ko.observable(0);
            self.pageSize = ko.observable(0);
            self.pageSizes = ko.observableArray([]);
            self.sortBy = ko.observable('');
            self.sortAsc = ko.observable(true);
            self.loading = ko.observable(true);

            self.columnCount = ko.pureComputed(function () {
                return self.columns().length;
            }, self);

            self.from = ko.pureComputed(function () {
                return ((self.page() - 1) * self.pageSize()) + 1;
            }, self);

            self.to = ko.pureComputed(function () {
                var tmp = self.page() * self.pageSize();
                return tmp <= self.total() ? tmp : self.total();
            }, self);

            self.hasResult = ko.pureComputed(function () {
                return self.total() > 0;
            }, self);

            self.showPager = ko.pureComputed(function () {
                return self.total() > self.pageSize();
            }, self);

            self.showItemOnPage = ko.pureComputed(function () {
                return self.pageSizes().length > 0 ?
                    self.total() > self.pageSizes()[0] :
                    false;
            }, self);

            self.prevPageEnabled = ko.pureComputed(function () {
                return self.page() > 1;
            }, self);

            self.nextPageEnabled = ko.pureComputed(function () {
                return self.page() < Math.ceil(self.total() / self.pageSize());
            }, self);

            self.goToPrevPage = function () {
                self.page(self.page() - 1);
                _loadData();
            };

            self.goToNextPage = function () {
                self.page(self.page() + 1);
                _loadData();
            };

            self.hasCustomRowTemplate = ko.pureComputed(function () {
                return self.rowTemplate() != '';
            }, self);

            self.sort = function (item) {
                if (!self.gridSettings.sorting.enable) {
                    return;
                }

                self.sortBy(item.name);
                self.sortBy(!self.sortBy());

                var index = ko.utils.arrayIndexOf(ko.utils.peekObservable(self.columns), item);
                var tmp = self.columns();
                self.columns([]);
                for (var i = 0; i < tmp.length; i++) {
                    if (i == index) {
                        if (tmp[i].hasOwnProperty('asc')) {
                            tmp[i].asc = !tmp[i].asc;
                        }
                        else {
                            tmp[i].asc = true;
                        }
                    }
                    else {
                        tmp[i].asc = undefined;
                    }
                    self.columns.push(tmp[i]);
                }

                _loadData();
            };

            self.refresh = function () {
                _loadData();
            };

            self.showRowTemplate = function (elements) {
                //callback
            };

            var _loadData = function () {
                loader.action(
                    function () {
                        self.loading(true);

                        self.data(self.gridSettings.dataSource(self.page(), self.pageSize(), self.sortBy(), self.sortAsc()));

                        self.total(self.data().length);
                    },
                    function () {
                        self.loading(false);
                    });
            };

            var _setColumnsFromData = function (dataItem) {
                for (var prop in dataItem) {
                    if (dataItem.hasOwnProperty(prop)) {
                        self.columns.push({ name: prop });
                    }
                }
            };

            var _init = function () {
                self.page(self.gridSettings.paging.currentPage);
                self.pageSize(self.gridSettings.paging.pageSize);
                self.pageSizes(self.gridSettings.paging.pageSizes);

                _subscription = self.pageSize.subscribe(function (newValue) {
                    _loadData();
                });

                self.rowTemplate(self.gridSettings.rowTemplate);

                if (self.gridSettings.columns.length > 0) {
                    for (var i = 0; i < self.gridSettings.columns.length; i++) {
                        self.columns.push({ name: self.gridSettings.columns[i] });
                    }
                }

                _loadData();

                if ((self.gridSettings.columns.length == 0) && (self.total() > 0)) {
                    _setColumnsFromData(self.data()[0]);
                }
            };

            _init();
        }

        gridModel.prototype.dispose = function () {
            if (_subscription !== undefined) {
                _subscription.dispose();
            }
        };
    });
})(window, window.app);