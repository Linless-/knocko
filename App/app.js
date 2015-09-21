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

require(["knockout", "Sammy", "proto/history", "proto/objects", "text"], function(ko, Sammy, historyService, objects) {

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

  self.templateRegister = ko.observable('home');
  registrationTemplate('home', 'modules/home', 'text!../templates/home.html');

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


  // Тестовые данные
  historyService.add('users', [
    new objects.User(1, 'Tashya V. Fuentes', "+7 264 333-55-22", "euismod.est@musAeneaneget.net", "P.O. Box 251, 276 Nec Ave", "Newmarket", "5141178987072785"),
    new objects.User(2, 'Asher X. Pennington', "+7 222 326-55-66", "consectetuer@purus.net", "P.O. Box 981, 6173 Nec, Rd.", "Cras-Avernas", "4257942325854678"),
    new objects.User(3, 'Ariel H. Schmidt', "+7 231 844-44-66", "magnis.dis.parturient@Integer.net", "Ap #542-5772 Ipsum Avenue", "Pont-Saint-Martin", "5157078013438730"),
    new objects.User(4, 'Bradley R. Hancock', "+7 222 357-55-22", "suscipit.nonummy@ac.co.uk", "333-7545 Neque St.", "Oostende", "4505783597473050"),
    new objects.User(5, 'Simon V. Brewer', "+7 623 473-94-66", "amet.risus.Donec@eunibhvulputate.com", "379 Metus Avenue", "Saint-Prime", "5444664897220206")
  ]);


});
