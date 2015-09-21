define("proto/history", function() {

  var historyService = function() {
    this.history = {};
  }

  historyService.prototype = {
    add: function(key, obj) {
      this.history[key] = obj;
    },
    remove: function(key) {
      if ( this.search(key) ) {
        delete this.history[key];
      } else {
        console.info('Записей с таким ключом нет.')
      }
    },
    search: function(key) {
      return this.history.hasOwnProperty(key);
    },
    get: function(key) {
      if ( this.search(key) ) {
        return this.history[key];
      } else {
        return false;
      }
    }
  }

  return new historyService();
});
