'use strict';

(function(module) {
  var categoryView = {};

  $('#input').change(function() {
    $.when( $.ajax( 'fileInput.js' )).then( function() {
      var statement = module.fileInput.statement;
      var names = module.fileInput.names;
      showRetailers(names);
      chooseCategory(names);
      autoAssignCategory(names);
    });
  });

  //show a list of retailers to assign categories
  function showRetailers(names) {
    var retailerCategories = [
      'clothing', 'groceries', 'entertainment', 'travel', 'donation',
      'home', 'utilities', 'education', 'beauty', 'eating out', 'amazon'
    ];
    var template = Handlebars.compile($('#category-template').html());
    for (var key in names) {
      var context = { retailer: names[key][0]['name'] };
      var html = template(context);
      $('.categories').append(html);
      $('.retailer:last-child').append('<select></select>').attr('id', key);
      for (var i = 0; i < retailerCategories.length; i++) {
        $('.retailer:last-child select').append(
          '<option value=\"' + retailerCategories[i] + '\">' + retailerCategories[i] + '</option>');
      }
    }
  }

  function autoAssignCategory(names) {
    for (var key in names) {
      
    }
  }

  function chooseCategory(names) {
    $('select').change(function() {
      var cat = $(this).parent().prop('id')
      names[cat][names[cat].length - 1].category = $(this).val();
      console.log(names[cat][names[cat].length - 1]);
    });
  }

  module.categoryView = categoryView;
})(window);
