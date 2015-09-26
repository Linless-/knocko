require.config({
    baseUrl: "App",
    paths: {
        "knockout": "node/knockout",
        "jquery": "node/jquery.min",
        "modules": "modules/",
        "generic": "generic/",
        "proto": "proto/",
        "text": "node/text",
        "Sammy": "../bower_components/sammy/lib/sammy",
        "knockout.validation": "../node_modules/knockout.validation/dist/knockout.validation",
        "localeValidation": "../node_modules/knockout.validation/localization/ru-RU"
    }
});

require(["knockout", "Sammy", "proto/settings", "text"], function(ko, Sammy, settings) {

  var self = this;
  var windowHash = window.location.hash;
  self.templateRegister = settings.templateRegister;
  settings.init();
  ko.applyBindings();

  Sammy(function() {
    this.get('#/:id', function() {
      var param = this.params.id;
      var model = 'modules/' + param;
      var template = 'text!../templates/modules/' + param + '.html';
      settings.registrationTemplate(param, model, template)
      self.templateRegister(param);
    });

    this.get('', function() { this.app.runRoute('get', '#tables') });
  }).run(windowHash);


});
