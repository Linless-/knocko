define('proto/objects', ['knockout'], function(ko) {

  // Описание частоиспользуемых объектов.
  var descObject = {
    User: function(id, name, number, email, adress, city, card, rating) {
      this.id = ko.observable(id); // ID.
      this.name = ko.observable(name !== undefined ? name : 'No Name')
                    .extend({"required": true}); // Имя.

      this.phone = ko.observable(number || null)
                     .extend({
                       "required": true,
                       "number": true,
                       "maxLength": 11
                     }); // Номер телефона.
      this.email = email || ''; // Электронная почта.
      this.adress = adress || ''; // Адресс.
      this.city = city || ''; // Город.
      this.card = card || ''; // Номер кредитки.
      this.rating = ko.observable(rating || null); // Оценка пользователя от 1 до 5.
      // Задает цвет фона в зависимости от оценки пользователя.
      this.userColor = function(rating) {
        if ( typeof(rating()) === 'number' ) {
          return 'user-block__color-' + rating();
        }
      }
    },
    menuItem: function(name, url) {
      this.name = name;
      this.url = '#/' + url;
    }
  }

  return descObject;
});
