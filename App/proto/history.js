define("proto/history", function(ko) {

  var historyService = function() {
    this.history = {};
  }

  historyService.prototype = {
    add: function(key, obj) {
      this.history[key] = obj;
      console.log(this.history);
    },
    remove: function(key) {
      if ( this.search(key) ) {
        delete this.history[key];
      }
    },
    search: function(key) {
      return this.history.hasOwnProperty(key);
    }
  }

  return new historyService();
});
