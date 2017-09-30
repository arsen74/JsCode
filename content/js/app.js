; (function (window, undefined) {
    var app = window.app = {};

    var _sys = app.sys = (function () {
        var _logger,
            _s4 = function () {
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            };
        return {
            type: function (input) {
                return Object.prototype.toString.call(input).match(/^\[object\s(.*)\]$/)[1];
            },
            typeEqual: function (input, desiredType) {
                return _sys.type(input).toLowerCase() == desiredType;
            },
            format: function (format, args) {
                if (_sys.typeEqual(format, 'string')) {
                    if (!_sys.typeEqual(args, 'object')) {
                        args = [args];
                    }
                    else {
                        var tmp = [];
                        for (var prop in obj) {
                            if (obj.hasOwnProperty(prop)) {
                                tmp.push(args[prop]);
                            }
                        }
                        args = tmp;
                    }
                    return format.replace(/{(\d+)}/g, function (match, number) {
                        return !_sys.typeEqual(args[number], 'undefined') ?
                            args[number] :
                            '';
                    });
                }
                else {
                    _sys.logError(format + ' не является строкой');
                }
            },
            generateUniqueId: function(){
                return _s4();
            },
            generateGuid: function () {
                return (_s4() + _s4() + "-" + _s4() + "-" + _s4() + "-" + _s4() + "-" + _s4() + _s4() + _s4());
            },
            log: function (msgType, msg) {
                if (!_logger) {
                    if (window.console && window.console.log && _sys.typeEqual(window.console.log, 'function')) {
                        _logger = function () {
                            window.console.log.apply(window.console, arguments)
                        }
                    }
                    else {
                        _logger = function () { };
                    }
                }
                if (msgType) {
                    _logger(msgType, msg);
                }
                else {
                    _logger(msg);
                }
            },
            logError: function (msg) {
                _sys.log('Ошибка', msg);
            },
            trace: function (msg) {
                _sys.log('Трассировка', msg);
            }
        }
    }());
		
    app.pubsub = {};

    app.events = {
        url: {
            change: 'url:change'
        },
        task: {
            wizard: {
                selectType: 'task:wizard:select-type',
                defineParams: 'task:wizard:define-params',
                launch: 'task:wizard:launch',
                clear: 'task:wizard:clear'
            }
        },
        common: {
            tileView: {
                setActive: 'common:tile-view:set-active',
                setInactive: 'common:tile-view:set-inactive'
            },
            sectionView: {
                completed: 'common:section-view:completed'
            }
        }
    };

	var _document = window.document;
	_document.documentElement.className = _document.documentElement.className.replace("no-js", "js");
	
	requirejs.config({
        paths: {
            jquery: 'libs/jquery-2.2.4.min',
			domReady: 'libs/domReady',
            knockout: 'libs/knockout-3.4.0',
			foundation: 'libs/foundation.min',
			underscore: 'libs/underscore-min',
            backbone: 'libs/backbone-min',
            router: 'modules/router',
            'main': 'modules/main',
            'common/404': 'modules/common/404',
            'common/loader': 'modules/common/loader',
            'common/help': 'modules/common/help',
            'common/grid': 'modules/common/grid',
            'common/sectionView': 'modules/common/sectionView',
            'common/box': 'modules/common/box',
            'common/tileView': 'modules/common/tileView',
            'navigation/menu': 'modules/navigation/menu',
            'dashboard/home': 'modules/dashboard/home',            
            'dashboard/project': 'modules/dashboard/project',            
            'dashboard/task': 'modules/dashboard/task',
            'dashboard/report': 'modules/dashboard/report',
            'project/list': 'modules/project/list',
            'task/wizard': 'modules/task/wizard',
            'task/wizard-step/selectTaskType': 'modules/task/wizardStepSelectTaskType',
            'task/wizard-step/defineParams': 'modules/task/wizardStepDefineParams',
            'task/wizard-step/launch': 'modules/task/wizardStepLaunch',
            'task/definitions/catalogDiff': 'modules/task/definitions/catalogDiff',
            'report/catalogDiff': 'modules/report/catalogDiff'
        }
    });
	
	define('ko-modules', ['knockout'], function (ko) {
	    ko.components.register('main', { require: 'main' });
	    ko.components.register('common/404', { require: 'common/404' });
	    ko.components.register('common/sectionView', { require: 'common/sectionView' });
	    ko.components.register('common/box', { require: 'common/box' });
	    ko.components.register('common/help', { require: 'common/help' });
	    ko.components.register('common/tileView', { require: 'common/tileView' });
	    ko.components.register('navigation/menu', { require: 'navigation/menu' });
	    ko.components.register('dashboard/home', { require: 'dashboard/home' });	    
	    ko.components.register('dashboard/project', { require: 'dashboard/project' });	    
	    ko.components.register('dashboard/task', { require: 'dashboard/task' });
	    ko.components.register('dashboard/report', { require: 'dashboard/report' });
	    ko.components.register('project/list', { require: 'project/list' });
	    ko.components.register('task/wizard', { require: 'task/wizard' });
	    ko.components.register('task/wizard-step/selectTaskType', { require: 'task/wizard-step/selectTaskType' });
	    ko.components.register('task/wizard-step/defineParams', { require: 'task/wizard-step/defineParams' });
	    ko.components.register('task/wizard-step/launch', { require: 'task/wizard-step/launch' });	    
	    ko.components.register('task/definitions/catalogDiff', { require: 'task/definitions/catalogDiff' });
	    ko.components.register('report/catalogDiff', { require: 'report/catalogDiff' });	    

        ko.applyBindings();
    });

	define('js-navigate', ['jquery'], function ($) {
	    $('body').on('click', 'a.js-navigate', function () {	        
	        app.router.navigate($(this).attr('href'), { trigger: true });
	        return false;
	    });
	});

	define('foundation-plugins', ['jquery', 'domReady!'], function ($, doc) {
	    require(['foundation'], function (f) {
	        $(doc).foundation();
	    });
	});
	
	require(['ko-modules', 'router', 'js-navigate', 'foundation-plugins']);
})(window, true);