define('modules/blocks', ['knockout', 'proto/history', 'proto/objects', 'proto/settings', 'components/like-widget'], function(ko, historyService, objects, settings) {

  var BlocksViewModel = function() {
    var self = this;

    self.items = ko.observableArray([]);
    self.maxLengthTable = settings.maxLengthItems;

    if ( historyService.search('users') ) {
      self.items = ko.observableArray(historyService.get('users'));
    }

  }

  return BlocksViewModel;
});
