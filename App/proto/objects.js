define('proto/objects', ['knockout'], function(ko) {

  var descObject = function() {
    this.User = function(id, name, email, adress, city, card) {
      this.id = ko.observable(id);
      this.name = ko.observable(name || 'No Name');

      this.phone = ko.observable('x xxx xxx xx xx');
      this.email = email || '';
      this.adress = adress || '';
      this.city = city || '';
      this.card = card || '';

      this.active = ko.observable(false);
    }
  }

  return new descObject();
});
