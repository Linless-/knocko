define('proto/objects', ['knockout'], function(ko) {

  /**
   * Частоиспользуеммые классы.
   */
  var descObject = {};
  /**
   * Класс юзера.
   * @param  {Number} id     ID.
   * @param  {String} name   Имя.
   * @param  {Number} number Номер телефона.
   * @param  {String} email  Электронная почта.
   * @param  {String} adress Адресс.
   * @param  {String} city   Город.
   * @param  {Number} card   Номер кредитки.
   * @param  {Number} rating Оценка пользователя от 1 до 5.
   */
  descObject.User = function(id, name, number, email, adress, city, card, rating) {
    this.id = ko.observable(id);
    this.name = ko.observable(name !== undefined ? name : 'No Name')
                  .extend({"required": true});
    this.phone = ko.observable(number || null)
                   .extend({
                     "required": true,
                     "number": true,
                     "maxLength": 11
                   });
    this.email = email || '';
    this.adress = adress || '';
    this.city = city || '';
    this.card = card || '';
    this.rating = ko.observable(rating || null);
    // Задает цвет фона в зависимости от оценки пользователя.
    this.userColor = function(rating) {
      if ( typeof(rating()) === 'number' ) {
        return 'user-block__color-' + rating();
      }
    }
  }
  /**
   * Класс разделов меню.
   * @param  {String} name Название раздела.
   * @param  {String} url  Link.
   */
  descObject.menuItem = function(name, url) {
    this.name = name;
    this.url = '#/' + url;
  }

  return descObject;
});
