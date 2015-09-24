define('proto/objects', ['knockout'], function(ko) {

  // Описание частоиспользуемых объектов.
  var descObject = {
    User: function(id, name, number, email, adress, city, card, rating) {
      this.id = ko.observable(id);
      this.name = ko.observable(name !== undefined ? name : 'No Name');

      this.phone = ko.observable(number !== undefined ? number : 'x xxx xxx xx xx');
      this.email = email || '';
      this.adress = adress || '';
      this.city = city || '';
      this.card = card || '';
      this.rating = ko.observable(rating || null);
      this.userColor = function(rating) {
        if ( typeof(rating()) === 'number' ) {
          return 'user-block__color-' + rating();
        }
      }

      this.active = ko.observable(false);
    },
    menuItem: function(name, url) {
      this.name = name;
      this.url = '#/' + url;
    }
  }

  return descObject;
});
