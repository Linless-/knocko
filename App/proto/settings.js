define('proto/settings', ['knockout', 'proto/history', 'proto/objects'], function(ko, historyService, objects) {

  var settings = {
    init: function() {

      // Инициализация максимального кол-ва объектов в массиве.
      if ( !historyService.search('countItems') ) {
        self.maxLengthTable = ko.observable(10);
        historyService.add('countItems', self.maxLengthTable);
      } else {
        self.maxLengthTable = historyService.get('countItems');
      }

      // Инициализация тестовых данных.
      historyService.add('users', [
        new objects.User(1, 'Tashya V. Fuentes', "+7 264 333-55-22", "euismod.est@musAeneaneget.net", "P.O. Box 251, 276 Nec Ave", "Newmarket", "5141178987072785"),
        new objects.User(2, 'Asher X. Pennington', "+7 222 326-55-66", "consectetuer@purus.net", "P.O. Box 981, 6173 Nec, Rd.", "Cras-Avernas", "4257942325854678"),
        new objects.User(3, 'Ariel H. Schmidt', "+7 231 844-44-66", "magnis.dis.parturient@Integer.net", "Ap #542-5772 Ipsum Avenue", "Pont-Saint-Martin", "5157078013438730"),
        new objects.User(4, 'Bradley R. Hancock', "+7 222 357-55-22", "suscipit.nonummy@ac.co.uk", "333-7545 Neque St.", "Oostende", "4505783597473050"),
        new objects.User(5, 'Simon V. Brewer', "+7 623 473-94-66", "amet.risus.Donec@eunibhvulputate.com", "379 Metus Avenue", "Saint-Prime", "5444664897220206")
      ]);
    }
  }

  return settings;
});
