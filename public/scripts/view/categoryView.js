'use strict';

(function(module) {
  var categoryView = {};

  $('#input').change(function() {
    $.when( $.ajax( 'fileInput.js' )).then( function() {
      var statement = module.fileInput.statement;
      var names = module.fileInput.names;
      showRetailers(names);
      autoAssignCategory(names);
      showCategories(names);
      chooseCategory(names);
    });
  });

  //show a list of retailers to assign categories
  function showRetailers(names) {
    var retailerCategories = [
      'clothing', 'groceries', 'entertainment', 'travel', 'donation',
      'home', 'utilities', 'education', 'health', 'beauty', 'eating out', 'amazon'
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

  function showCategories(names) {
    var retailersList = $('.retailer').siblings();
    for (var i = 0; i < retailersList.length; i++) {
      var keys = Object.keys(names)
      var autoCategory = names[keys[i]][names[keys[i]].length - 1]['category']
      if (autoCategory) {
        $(retailersList[i]).append('<span>' + autoCategory + '</span>')
      }
    }
  }

  function autoAssignCategory(names) {
    for (var key in names) {
      if (names[key][0]['name'].match(/URBAN|HAUTLK|ANTHR|NORDSTR|OLDNA|GAP|LOFT/g)) {
        names[key][names[key].length - 1].category = 'clothing';
      } else if (names[key][0]['name'].match(/MARKET|WHOLEFDS|TRADER JOE'S|SAFEWAY|QFC|PCC/g)) {
        names[key][names[key].length - 1].category = 'groceries';
      } else if (names[key][0]['name'].match(/GOLDSTAR/g)) {
        names[key][names[key].length - 1].category = 'entertainment';
      } else if (names[key][0]['name'].match(/TRACY IRVING|SEPHORA|RECOOP/g)) {
        names[key][names[key].length - 1].category = 'beauty';
      } else if (names[key][0]['name'].match(/COMCAST/g)) {
        names[key][names[key].length - 1].category = 'utilities';
      } else if (names[key][0]['name'].match(/YOUSEFIAN/g)) {
        names[key][names[key].length - 1].category = 'health';
      } else if (names[key][0]['name'].match(/AMAZON/g)) {
        names[key][names[key].length - 1].category = 'amazon';
      } else {
        names[key][names[key].length - 1].category = null;
      }
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
