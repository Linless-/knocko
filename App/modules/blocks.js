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

    var ratingModel = function(params) {
      this.value = params.value;
      this.like = function() {
        this.value('like');
      };
      this.dislike = function() {
        this.value('dislike');
      };
    }

    var ratingTemplate = '<div class="like-widget">' +
      '<div class="like-widget__buttons" data-bind="visible: !value()">' +
        '<button data-bind="click: like" class="btn-text">Like</button>' +
        '<button data-bind="click: dislike" class="btn-text">Dislike</button>' +
      '</div>' +
      '<div data-bind="visible: value()">' +
        'Вы <span data-bind="text: value"></span>!' +
      '</div>' +
    '</div>';

    settings.registrationTemplate('like-widget', ratingModel, ratingTemplate);

  }

  return BlocksViewModel;
});
