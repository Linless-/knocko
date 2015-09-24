define('modules/blocks', ['knockout', 'proto/history', 'proto/objects', 'proto/settings'], function(ko, historyService, objects, settings) {

  var BlocksViewModel = function() {
    var self = this;

    self.items = ko.observableArray([]);
    self.maxLengthTable = settings.maxLengthItems;

    if ( historyService.search('users') ) {
      self.items = ko.observableArray(historyService.get('users'));
    }

    self.userBlockToogle = function(item) {
      item.active(!item.active());
    }
    self.activeBlock = function(status) {
      return status;
    }

  }

  return BlocksViewModel;
});
