define('modules/forms', ['knockout', 'proto/history', 'proto/objects'], function(ko, historyService, objects) {

  var FormsViewModel = function() {
    var self = this;
    self.clear = function() {
      if ( !ko.isObservable(self.item) ) {
        self.item = ko.observable(new objects.User(historyService.get('users').length + 1, "", ""));
      } else {
        self.item(new objects.User(historyService.get('users').length + 1, "", ""));
      }
    }
    self.clear();
    self.add = function() {
      if ( historyService.search('users') ) {
        historyService.push('users', self.item());
      } else {
        historyService.add('users', [self.item()]);
      }
      self.clear()
    }


  }

  return FormsViewModel;
});
