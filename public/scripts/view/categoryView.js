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

  function showRetailers(names) {
    var retailerCategories = [ ' ',
      'clothing', 'groceries', 'coffee', 'entertainment', 'travel', 'donation',
      'home', 'utilities', 'education', 'health', 'beauty', 'eating out', 'amazon'
    ];
    $('thead').show();
    var template = Handlebars.compile($('#category-template').html());
    for (var key in names) {
      var context = { retailerName: names[key][0]['name'] }
      var html = template(context);
      $('.categories').append(html);
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
      } else if (names[key][0]['name'].match(/COMCAST|TMOBILE/g)) {
        names[key][names[key].length - 1].category = 'utilities';
      } else if (names[key][0]['name'].match(/YOUSEFIAN|PHARMACY|LABCORP/g)) {
        names[key][names[key].length - 1].category = 'health';
      } else if (names[key][0]['name'].match(/AMAZON/g)) {
        names[key][names[key].length - 1].category = 'amazon';
      } else if (names[key][0]['name'].match(/STARBUCKS|BEAN BOX/g)) {
        names[key][names[key].length - 1].category = 'coffee';
      } else if (names[key][0]['name'].match(/SALVATION ARMY|GLOBALGIVING/g)) {
        names[key][names[key].length - 1].category = 'donation';
      } else if (names[key][0]['name'].match(/HOUZZ|HOMEGOODS|IKEA/g)) {
        names[key][names[key].length - 1].category = 'home';
      } else {
        names[key][names[key].length - 1].category = null;
      }
    }
  }

  function chooseCategory(names) {
    $('select').change(function() {
      var cat = $(this).parent().prop('id')
      names[cat][names[cat].length - 1].category = $(this).val();
    });
  }
  module.categoryView = categoryView;

})(window);
