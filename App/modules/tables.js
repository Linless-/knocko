define('modules/tables', ['knockout', 'proto/history', 'proto/objects'], function(ko, historyService, objects) {

  var TableViewModel = function() {
    var self = this;
    var names = ['Tashya V. Fuentes', 'Asher X. Pennington', 'Ariel H. Schmidt', 'Bradley R. Hancock', 'Simon V. Brewer'];

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Data
    self.modal = ko.observableArray([]);
    self.modal.open = ko.observable(false);
    self.modal.item = ko.observable({});
    self.items = ko.observableArray([]);
    self.maxLengthTable = historyService.get('countItems');

    if ( historyService.search('users') ) {
      self.items = ko.observableArray(historyService.get('users'));
    }

    //Options
    self.removeItem = function(item) {
      self.items.remove(item);
    }
    self.addItem = function() {
      self.items.push(new objects.User(self.items().length + 1, names[getRandomInt(0, names.length - 1)]));
      historyService.add('users', self.items());
    }
    self.removeAll = function() {
      self.items.removeAll();
      self.maxLengthTable(10);
      historyService.remove('users');
    }

    self.openModal = function(item) {
      self.modal.open(true);
      var item = item;
      self.modal.item(item);
    }
    self.saveItem = function() {
      self.items()[0] = self.modal.item();
      self.modal.item({});
      self.modal.open(false);
      historyService.add('users', self.items());
    }
  }


  return TableViewModel;
});
