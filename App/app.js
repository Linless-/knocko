require.config({
    paths: {
        "knockout": "node/knockout",
        "text": "node/text",
        "jquery": "node/jquery.min"
    }
});

require(["knockout", "main", "stringTemplateEngine", "text"], function(ko, Main) {
    var vm = new Main();

    //simple client-side routing - update hash when current section is changed
    vm.currentSection.subscribe(function(newValue) {
        location.hash = newValue.name;
    });

    var updateSection = function() {
        vm.updateSection(location.hash.substr(1));
    };

    //respond to hashchange event
    window.onhashchange = updateSection;

    //initialize
    updateSection();

    ko.applyBindings(vm);
});
