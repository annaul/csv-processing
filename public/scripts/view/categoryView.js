'use strict';

(function(module) {
  var categoryView = {};

  $('#input').change(function() {
    $.when( $.ajax( 'fileInput.js' )).then( function() {
      var statement = module.fileInput.statement;
      var names = module.fileInput.names;
      autoAssignCategory(names);
      showRetailers(names);
      chooseCategory(names);
      var spec1 = module.nestedData.getNestedData();
      console.log('------', module.fileInput.sortedBySum[63][module.fileInput.sortedBySum[63].length - 1]['category']);
      var view = new vega.View(vega.parse(spec1))
        .renderer('svg')  // set renderer (canvas or svg)
        .initialize('#bar') // initialize view within parent DOM container
        .hover()             // enable hover encode set processing
        .run();
    });
  });

  $('button').click(function(){
    $('#bar').toggle();
  });

  function showRetailers(names) {
    var retailerCategories = [ ' ',
      'clothing', 'groceries', 'coffee', 'entertainment', 'travel', 'donation',
      'home', 'utilities', 'education', 'health', 'beauty', 'eating out', 'amazon'
    ];
    $('thead').show();
    var template = Handlebars.compile($('#category-template').html());
    var number = 1;
    for (var key in names) {
      var category = names[key][names[key].length - 1]['category'];
      var context = { number: number + '.', retailerName: names[key][0]['name'], category: category }
      number += 1;
      var html = template(context);
      $('.categories').append(html);
      for (var i = 0; i < retailerCategories.length; i++) {
        $('.retailer:last-child select').append(
          '<option value=\"' + retailerCategories[i] + '\">' + retailerCategories[i] + '</option>');
      }
    }
  }

  function autoAssignCategory(names) {
    for (var key in names) {
      var retailerName = names[key];
      if (retailerName[0]['name'].match(/URBAN|HAUTLK|ANTHR|NORDSTR|OLDNA|GAP|LOFT/g)) {
        retailerName[retailerName.length - 1].category = 'clothing';
      } else if (retailerName[0]['name'].match(/MARKET|WHOLEFDS|TRADER JOE'S|SAFEWAY|QFC|PCC/g)) {
        retailerName[retailerName.length - 1].category = 'groceries';
      } else if (retailerName[0]['name'].match(/GOLDSTAR/g)) {
        retailerName[retailerName.length - 1].category = 'entertainment';
      } else if (retailerName[0]['name'].match(/TRACY IRVING|SEPHORA|RECOOP/g)) {
        retailerName[retailerName.length - 1].category = 'beauty';
      } else if (retailerName[0]['name'].match(/COMCAST|TMOBILE/g)) {
        retailerName[retailerName.length - 1].category = 'utilities';
      } else if (retailerName[0]['name'].match(/YOUSEFIAN|PHARMACY|LABCORP/g)) {
        retailerName[retailerName.length - 1].category = 'health';
      } else if (retailerName[0]['name'].match(/AMAZON/g)) {
        retailerName[retailerName.length - 1].category = 'amazon';
      } else if (retailerName[0]['name'].match(/STARBUCKS|BEAN BOX/g)) {
        retailerName[retailerName.length - 1].category = 'coffee';
      } else if (retailerName[0]['name'].match(/SALVATION ARMY|GLOBALGIVING/g)) {
        retailerName[retailerName.length - 1].category = 'donation';
      } else if (retailerName[0]['name'].match(/HOUZZ|HOMEGOODS|IKEA/g)) {
        retailerName[retailerName.length - 1].category = 'home';
      } else {
        retailerName[retailerName.length - 1].category = null;
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
  module.categoryView.autoAssignCategory = autoAssignCategory;

})(window);
