window.$ = window.jQuery = require('jquery');
var Application = require('./main');

window.app = new Application();

var Backbone = require('backbone');

var MainView = require('./screens/main/index');

Backbone.$ = $;

var Application = function() {
  this.initialize();
};

Application.prototype.initialize = function() {
  this.mainView = new MainView({
    el: $('#app'),
    router: this.router
  });

  this.showApp();
};

Application.prototype.showApp = function() {
  this.mainView.render();
  Backbone.history.start({ pushState: true });
};

module.exports = Application;
