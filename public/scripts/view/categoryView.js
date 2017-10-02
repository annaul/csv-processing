'use strict';

(function(module) {
  var categoryView = {};

  $('#input').change(function() {
    $.when( $.ajax( 'fileInput.js' )).then( function() {
      var statement = module.fileInput.statement;
      var names = module.fileInput.names;
      console.log(names);
      showRetailers(names);
    });
  });

  var template = Handlebars.compile($('#category-template').html());

  var context = { st: 'hello!' };
  var html = template(context);

  $('.categories').append(html);

  //show a list of retailers to assign categories
  function showRetailers(names) {
    for (var key in names) {
      console.log(key, names[key]);
    }
  }

  module.categoryView = categoryView;
})(window);
