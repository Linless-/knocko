/**
 * Все js лежат в App. С разбиением на логику.
 * App/components - Зарегистрированные компоненты через Knockout, с последующим использованием хоть где.
 * App/generic    - Общие Модели, вроде меню.
 * App/modules    - Модели каждого раздела.
 * App/node       - Либы системы.
 * App/proto      - Вынесенные прототипы системы.
 *
 * templates      - Шаблоны для каждого раздела или модуля.
 */

/**
 * Основной конфиг ReqiuredJS.
 */
require.config({
    baseUrl: "App",
    paths: {
        "knockout": "node/knockout",
        "jquery": "node/jquery.min",
        "modules": "modules/",
        "generic": "generic/",
        "proto": "proto/",
        "components": "components/",
        "text": "node/text",
        "Sammy": "../bower_components/sammy/lib/sammy",
        "knockout.validation": "../node_modules/knockout.validation/dist/knockout.validation",
        "localeValidation": "../node_modules/knockout.validation/localization/ru-RU"
    }
});

require(["knockout", "Sammy", "proto/settings", "text"], function(ko, Sammy, settings) {
  var self = this;
  var windowHash = window.location.hash;
  self.templateRegister = settings.templateRegister; // Наследуем прототип регистрации компонента.
  settings.init(); // Инициализируем настройки.
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
