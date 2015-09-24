define('generic/menu', ['knockout', 'proto/objects'], function(ko, objects) {

  var MenuViewModel = function() {
    var self = this;

    self.menuActive = function(url) {
      if ( url === '#/' + self.templateRegister() ) {
        return true;
      }
    }
    
    self.menu = ko.observableArray([
      new objects.menuItem('Главная', 'home'),
      new objects.menuItem('Таблица', 'tables'),
      new objects.menuItem('Блоки', 'blocks'),
      new objects.menuItem('Форма', 'forms')
    ]);


  }

  return MenuViewModel;
});
