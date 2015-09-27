define('proto/settings', ['knockout', 'proto/history', 'proto/objects', "localeValidation", 'text'], function(ko, historyService, objects, localeValidation) {

  /**
   * Общие настройки системы и её инициализация.
   * Также хранение общих функций системы для общего пользования.
   */
  var settings = function() {
    this.maxLengthItems = ko.observable(10); // Максимальное кол-во объектов.
    this.templateRegister = ko.observable('home'); // Текущий state
  };
  /**
   * Инициализация настроек
   */
  settings.prototype.init = function() {
    // Валидатор
    ko.validation.configuration.messagesOnModified = false; // Сразу вывод ошибок в валидаторе
    ko.validation.locale("ru-RU"); // Русская локаль
    // Список имен.
    historyService.add('names', ['Tashya V. Fuentes', 'Asher X. Pennington', 'Ariel H. Schmidt', 'Bradley R. Hancock', 'Simon V. Brewer']);
    // Инициализация тестовых данных.
    historyService.add('users', [
      new objects.User(1, 'Tashya V. Fuentes', "+7 264 333-55-22", "euismod.est@musAeneaneget.net", "P.O. Box 251, 276 Nec Ave", "Newmarket", "5141178987072785"),
      new objects.User(2, 'Asher X. Pennington', "+7 222 326-55-66", "consectetuer@purus.net", "P.O. Box 981, 6173 Nec, Rd.", "Cras-Avernas", "4257942325854678"),
      new objects.User(3, 'Ariel H. Schmidt', "+7 231 844-44-66", "magnis.dis.parturient@Integer.net", "Ap #542-5772 Ipsum Avenue", "Pont-Saint-Martin", "5157078013438730"),
      new objects.User(4, 'Bradley R. Hancock', "+7 222 357-55-22", "suscipit.nonummy@ac.co.uk", "333-7545 Neque St.", "Oostende", "4505783597473050"),
      new objects.User(5, 'Simon V. Brewer', "+7 623 473-94-66", "amet.risus.Donec@eunibhvulputate.com", "379 Metus Avenue", "Saint-Prime", "5444664897220206")
    ]);
    // Инициализация меню.
    this.registrationTemplate('menu', 'generic/menu', 'text!../templates/generic/menu.html');
    // Загрузка шаблона при загрузке страницы.
    this.registrationTemplate('home', 'modules/home', 'text!../templates/modules/home.html');
  }
  /**
   * Регистрация компонента KnockoutJs.
   * @param  {String}   name     Название компонента.
   * @param  {Function} model    Передаем функцию с описанием модели.
   * @param  {String}   model    Передаем ссылку на модель, для подключения через RequiredJs.
   * @param  {String}   template Если model - function, то передаем готовый темплейт.
   *                             Если model - String, то передаем ссылку на темплейт.
   */
  settings.prototype.registrationTemplate = function(name, model, template) {
    if ( !ko.components.isRegistered(name) ) {
      if ( typeof(model) === 'function' ) {
        ko.components.register(name, {
          viewModel: model,
          template: template
        });
      } else {
        ko.components.register(name, {
          viewModel: { require: model },
          template: { require: template }
        });
      }
    }
  }
  settings.prototype.getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return new settings();
});
