define("proto/history", function() {

  /**
   * Сервис для локального хранения данных.
   *
   */
  var historyService = function() {
    this.history = {}; // Объект где всё хранится.
    this.logBool = true; // Нужно ли выводить в консоль информацию.
  }
  /**
   * Добавление объекта с ключом.
   * @param  {String} key Ключ для хранения.
   * @param  {Object, Massive} obj Объект или массив данных
   */
  historyService.prototype.add = function(key, obj) {
    this.history[key] = obj;
  }
  /**
   * Удаление по ключу.
   * @param  {String} key Ключ, который нужно снести из общей картины.
   */
  historyService.prototype.remove = function(key) {
    if ( this.search(key) ) {
      delete this.history[key];
    }
  }
  /**
   * Поиск объекта по ключу.
   * @param  {String} key Ключ, который ищем.
   */
  historyService.prototype.search = function(key) {
    if ( this.history.hasOwnProperty(key) ) {
      return true;
    } else {
      if ( this.logBool ) {
        console.info('Записей с таким ключом нет.');
      }
      return false;
    }
  }
  /**
   * Отдаем данные по ключу.
   * @param  {Sctring}         key Ключ.
   * @return {Object, Massive}     Данные, которые хранили.
   */
  historyService.prototype.get = function(key) {
    if ( this.search(key) ) {
      return this.history[key];
    }
  }
  /**
   * Добавляем дополнительное значение.
   * Если нет данного ключа, то создаем объект/массив с таким ключом и вносим значение.
   * @param  {String} key   Ключ объекта, к которому надо добавлять.
   * @param  {      } obj   Что нужно добавлять
   * @param  {String} label Если это не массив, а объект. То нужно указать поле, в которое добавлять новое значение.
   */
  historyService.prototype.push = function(key, obj, label) {
    if ( this.search(key) ) {
      // Проверка массив это или нет.
      if ( this.history[key] instanceof Array ) {
        this.history[key].push(obj);
      } else {
        this.history[key][label] = obj;
      }
    } else {
      if ( this.logBool ) {
        console.info('Создаем запись с ключом ' + key + '. И вносим новое значение.');
      }
      // Если нет label, то создаем массив.
      // Иначе создаем оъект с этим значением.
      if ( label === undefined ) {
        var k = [];
        k.push(obj);
        this.add(key, k);
      } else {
        var k = {};
        k.label = obj;
        this.add(key, k);
      }
    }
  }

  return new historyService();
});
