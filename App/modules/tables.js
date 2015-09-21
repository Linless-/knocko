define('modules/tables', ['knockout'], function(ko) {

  var TableViewModel = function() {
    var self = this;
    var names = ['Tashya V. Fuentes', 'Asher X. Pennington', 'Ariel H. Schmidt', 'Bradley R. Hancock', 'Simon V. Brewer'];

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function User(id, name) {
      this.id = ko.observable(id);
      this.name = ko.observable(name || 'No Name');

      this.phone = ko.observable('x xxx xxx xx xx');
      this.email = '';
      this.adress = '';
      this.city = '';
      this.card = '';

      return this;
    }

    // Data
    self.modal = ko.observableArray([]);
    self.modal.open = ko.observable(false);
    self.modal.item = ko.observable({});
    self.maxLengthTable = ko.observable(10);

    self.items = ko.observableArray([
      new User(1, 'Tashya V. Fuentes'),
      new User(2, 'Asher X. Pennington'),
      new User(3, 'Ariel H. Schmidt'),
      new User(4, 'Bradley R. Hancock'),
      new User(5, 'Simon V. Brewer')
    ]);

    //Options
    self.removeItem = function(item) {
      self.items.remove(item);
    }
    self.addItem = function() {
      self.items.push(new User(self.items().length + 1, names[getRandomInt(0, names.length - 1)]));
    }
    self.removeAll = function() {
      self.items.removeAll();
      self.maxLengthTable(10);
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
    }
  }


  return TableViewModel;
});
