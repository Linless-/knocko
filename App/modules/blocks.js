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

    var ratingModel = function(params) {
      this.value = params.value;
      this.like = function(item) {
        this.value(item);
      }.bind(this);
    }

    var ratingTemplate = '<div class="like-widget">' +
      '<div class="like-widget__buttons" data-bind="foreach: [1,2,3,4,5], visible: !value()">' +
        '<button data-bind="click: $parent.like, text: $data" class="btn-text"></button>' +
      '</div>' +
      '<div class="like-widget__text" data-bind="visible: value()">' +
        'Вы оценили на <span data-bind="text: value"></span>!' +
      '</div>' +
    '</div>';

    settings.registrationTemplate('like-widget', ratingModel, ratingTemplate);

  }

  return BlocksViewModel;
});
