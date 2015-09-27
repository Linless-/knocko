define('generic/menu', ['knockout', 'proto/objects', 'proto/settings'], function(ko, objects, settings) {

  var MenuViewModel = function() {
    var self = this;

    // Список меню.
    self.menu = ko.observableArray([
      new objects.menuItem('Главная', 'home'),
      new objects.menuItem('Таблица', 'tables'),
      new objects.menuItem('Блоки', 'blocks'),
      new objects.menuItem('Форма', 'forms')
    ]);
  }
  // Добавляем класс на активую кнопку.
  MenuViewModel.prototype.menuActive = function(url) {
    if ( url === '#/' + settings.templateRegister() ) {
      return true;
    }
  }

  return MenuViewModel;
});
