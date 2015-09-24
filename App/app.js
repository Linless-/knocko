require.config({
    baseUrl: "App",
    paths: {
        "knockout": "node/knockout",
        "jquery": "node/jquery.min",
        "modules": "modules/",
        "proto": "proto/",
        "text": "node/text",
        "Sammy": "../bower_components/sammy/lib/sammy"
    }
});

require(["knockout", "Sammy", "proto/history", "proto/objects", "proto/settings", "text"], function(ko, Sammy, historyService, objects, settings) {

  var registrationTemplate = function(name, model, template) {
    if ( !ko.components.isRegistered(name) ) {
      ko.components.register(name, {
        viewModel: { require: model },
        template: { require: template }
      });
    }
  }

  var self = this;
  var windowHash = window.location.hash;

  self.templateRegister = ko.observable('home');
  registrationTemplate('home', 'modules/home', 'text!../templates/home.html');

  self.menu = ko.observableArray([
    new objects.menuItem('Главная', 'home'),
    new objects.menuItem('Таблица', 'tables'),
    new objects.menuItem('Блоки', 'blocks'),
    new objects.menuItem('Форма', 'forms')
  ]);
  self.menuActive = function(url) {
    if ( url === '#/' + self.templateRegister() ) {
      return true;
    }
  }

  settings.init();
  ko.applyBindings();

  Sammy(function() {
    this.get('#/:id', function() {
      var param = this.params.id;
      var model = 'modules/' + param;
      var template = 'text!../templates/' + param + '.html';
      registrationTemplate(param, model, template)
      self.templateRegister(param);
    });

    this.get('', function() { this.app.runRoute('get', '#tables') });
  }).run(windowHash);


});
