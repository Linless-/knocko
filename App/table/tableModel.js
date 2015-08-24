(function(){
  'use strict';

  function tableViewModel() {
    var self = this;

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
      self.items.push({"id":6, "name": "Simon V. Brewer111"});
    }
    self.removeAll = function() {
      self.items.removeAll();
    }
  }
  ko.applyBindings(new tableViewModel());
})();
