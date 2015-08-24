(function(){
  'use strict';

  function tableViewModel() {
    var self = this;
    var names = ["Tashya V. Fuentes", "Asher X. Pennington", "Ariel H. Schmidt", "Bradley R. Hancock", "Simon V. Brewer"];

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    // Data
    self.items = ko.observableArray([
      {
        "id": 1,
        "name": "Tashya V. Fuentes"
      },
      {
        "id": 2,
        "name": "Asher X. Pennington"
      },
      {
        "id": 3,
        "name": "Ariel H. Schmidt"
      },
      {
        "id": 4,
        "name": "Bradley R. Hancock"
      },
      {
        "id": 5,
        "name": "Simon V. Brewer"
      }
    ]);

    //Options
    self.removeItem = function(item) {
      self.items.remove(item);
    }
    self.addItem = function() {
      self.items.push({"id":(self.items().length + 1), "name": names[getRandomInt(0, names.length - 1)]});
    }
    self.removeAll = function() {
      self.items.removeAll();
    }
  }
  ko.applyBindings(new tableViewModel());
})();
