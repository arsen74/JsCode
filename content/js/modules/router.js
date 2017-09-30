; (function (window, app, undefined) {
	define('router', ['underscore', 'backbone'], function (_, backbone) {
	    _.extend(app.pubsub, Backbone.Events);

		var router = Backbone.Router.extend({
			routes : {
			    '(/)': 'index',
			    'projects': 'projectList',
			    'project/:id': 'projectInfo',
			    'project/:id/tasks': 'taskList',
			    'project/:id/task/new': 'taskNew',
			    'project/:id/task/:guid': 'taskInfo',
			    'project/:id/reports': 'reportList',
			    'project/:id/report/:guid': 'reportInfo',
			    '*404': 404
			},
			index: function () {			    
			    app.pubsub.trigger(app.events.url.change, { url: '/' });
			},
			projectList: function () {
			    app.pubsub.trigger(app.events.url.change, { url: '/projects' });
			},
			projectInfo: function (id) {
			    app.pubsub.trigger(app.events.url.change, { url: '/project/' + id, params: id, level: 2 });
			},
			taskList: function (id) {
			    app.pubsub.trigger(app.events.url.change, { url: '/project/' + id + '/tasks', params: id, level: 3 });
			},			
			tasksNew: function (id) {			    
			    app.pubsub.trigger(app.events.url.change, { url: '/project/' + id + '/task/new', params: id, level: 3 });
			},
			reportList: function (id) {
			    app.pubsub.trigger(app.events.url.change, { url: '/project/' + id + '/reports', level: 2 });
			},
			404: function () {			    
			    app.pubsub.trigger(app.events.url.change, { url: '/404' });
			}
		});

		var oldLoadUrl = Backbone.History.prototype.loadUrl;

		_.extend(Backbone.History.prototype, {
		    loadUrl: function () {
		        var matched = oldLoadUrl.apply(this, arguments);
		        if (!matched) {
		            this.trigger('*404', arguments);
		        }
		        return matched;
		    }
		});

		app.router = new router();
		if (!Backbone.history.start({ pushState: true })) {		    
		    app.router.navigate('*404', { trigger: true });
		};
	});
})(window, window.app);