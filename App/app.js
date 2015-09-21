require.config({
    baseUrl: "App",
    paths: {
        "knockout": "node/knockout",
        "jquery": "node/jquery.min",
        "modules": "modules/",
        "text": "node/text",
        "Sammy": "../bower_components/sammy/lib/sammy"
    }
});

require(["knockout", "Sammy", "text"], function(ko, Sammy) {

  var registrationTemplate = function(name, model, template) {
    if ( !ko.components.isRegistered(name) ) {
      ko.components.register(name, {
        viewModel: { require: model },
        template: { require: template }
      });
    }
  }

  var menuItem = function(name, url) {
    this.name = name;
    this.url = '#/' + url;
  }

  var self = this;
  var windowHash = window.location.hash;

  self.templateRegister = ko.observable('tables');
  registrationTemplate('tables', 'modules/tables', 'text!../templates/tables.html');

  self.menu = ko.observableArray([
    new menuItem('Главная', 'home'),
    new menuItem('Таблица', 'tables'),
    new menuItem('Блоки', 'blocks'),
    new menuItem('Форма', 'forms')
  ]);
  self.menuActive = function(url) {
    if ( url === '#/' + self.templateRegister() ) {
      return true;
    }
  }
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
