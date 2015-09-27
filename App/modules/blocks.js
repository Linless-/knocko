define('modules/blocks', ['knockout', 'proto/history', 'proto/objects', 'proto/settings', 'components/like-widget'], function(ko, historyService, objects, settings) {

  var BlocksViewModel = function() {
    var self = this;

    self.items = ko.observableArray([]); // Список объектов.
    self.maxLengthTable = settings.maxLengthItems; // Максимальная длинна элементов, берется из настроек.
    // Полчаем список объектов из депозит сервиса, если они имеются.
    if ( historyService.search('users') ) {
      self.items = ko.observableArray(historyService.get('users'));
    }
  }

  return BlocksViewModel;
});
