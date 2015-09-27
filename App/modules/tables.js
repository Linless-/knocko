define('modules/tables', ['knockout', 'proto/history', 'proto/objects', 'proto/settings'], function(ko, historyService, objects, settings) {

  var TableViewModel = function() {
    var self = this;

    self.modal = ko.observableArray([]); // Модальное окно.
    self.modal.open = ko.observable(false); // Флаг открытия модального окна.
    self.modal.item = ko.observable({}); // Данные для модального окна.
    self.items = ko.observableArray([]); // Объекты таблицы.
    self.maxLengthTable = settings.maxLengthItems; // Максимальное кол-во элементов, берется из настроек.
    // Полчаем список объектов из депозит сервиса, если они имеются.
    if ( historyService.search('users') ) {
      self.items = ko.observableArray(historyService.get('users'));
    }
  }
  // Удаление элемента.
  TableViewModel.prototype.removeItem = function(item) {
    var self = this;
    self.items.remove(item);
  }
  /**
   * Добавление нового элемента
   * С рандомным именем из массива имен.
   */
  TableViewModel.prototype.addItem = function() {
    var self = this;
    var names = historyService.get('names');
    self.items.push(new objects.User(self.items().length + 1, names[settings.getRandomInt(0, names.length - 1)]));
    historyService.add('users', self.items());
  }
  // Удаление всех элементов.
  TableViewModel.prototype.removeAll = function() {
    var self = this;
    self.items.removeAll();
    self.maxLengthTable(10);
    historyService.remove('users');
  }
  // Открытие модального окна.
  // В идеале для модального окна нужно описать прототип6 для общего наледования.
  TableViewModel.prototype.openModal = function(item) {
    var self = this;
    self.modal.open(true);
    var item = item;
    self.modal.item(item);
  }
  // Сохранение изменений в модальном окне.
  TableViewModel.prototype.saveItem = function() {
    var self = this;
    self.items()[0] = self.modal.item();
    self.modal.item({});
    self.modal.open(false);
    historyService.add('users', self.items());
  }

  return TableViewModel;
});
