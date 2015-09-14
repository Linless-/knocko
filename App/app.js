require.config({
    baseUrl: "App",
    paths: {
        "knockout": "node/knockout",
        "jquery": "node/jquery.min",
        "modules": "modules/",
        "text": "node/text",
        "Sammy": "../bower_components/sammy/lib/sammy"
    }
});

require(["knockout", "Sammy", "text"], function(ko, Sammy) {

  Sammy(function() {
    this.get('#/:id', function() {
      var param = this.params.id;
      ko.components.register('templates', {
        viewModel: { require: 'modules/' + param },
        template: { require: 'text!../templates/' + param + '.html' }
      });
    });

    this.get('', function() { this.app.runRoute('get', '#table') });
  }).run("#/table");
  
  ko.applyBindings();

});
