'use strict';

(function(module) {
  var categoryView = {};

  $('#input').change(function() {
    $.when( $.ajax( 'fileInput.js' )).then( function() {
      var statement = module.fileInput.statement;
      var names = module.fileInput.names;
      var sortedBySum = module.fileInput.sortedBySum;
      autoAssignCategory(names);
      showRetailers(sortedBySum);
      chooseCategory(sortedBySum);
      // var spec1 = module.nestedData.getNestedData();
      // var view = new vega.View(vega.parse(spec1))
      //   .renderer('svg')  // set renderer (canvas or svg)
      //   .initialize('#bar') // initialize view within parent DOM container
      //   .hover()             // enable hover encode set processing
      //   .run();
      //   $('.mark-rect').css('background', 'black')

    });
  });
  // TODO: improve flow, no ajax/ when
  $('button').click(function(){
    $('#bar').toggle();
  });

  function showRetailers(sortedBySum) {
    var retailerCategories = [ ' ',
      'clothing', 'groceries', 'coffee', 'entertainment', 'travel', 'donation',
      'home', 'utilities', 'education', 'health', 'beauty', 'eating out', 'amazon'
    ];
    $('thead').show();
    var template = Handlebars.compile($('#category-template').html());
    var number = 1;
    var total = 0;
    for (var i = 0; i < sortedBySum.length; i++) {
      // TODO: put everything in first position, this is a nightmare!
      var a = sortedBySum[i];
      var retailerInfo = sortedBySum[i][a.length - 1];
      var context = { number: number + '.', retailerName: a[0]['name'], amount: retailerInfo['sum'], category: retailerInfo['category']}
      number += 1;
      total += retailerInfo['sum'];

      var html = template(context);
      $('.categories').append(html);
      for (var j = 0; j < retailerCategories.length; j++) {
        $('.retailer:last-child select').append(
          '<option value=\"' + retailerCategories[j] + '\">' + retailerCategories[j] + '</option>');
      }
    }
    context = { amount: total };

    $('.categories').append(template(context));
    $('tr:last-child td:last-child').remove();
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

  function chooseCategory(sortedBySum) {
    $('select').change(function() {
      var cat = $(this).children(':selected').text();
      var row = $(this).parent().parent().index() + 1;
      $('.categories tr:nth-child(' + row + ') td:nth-child(4)').empty().append(cat);

      sortedBySum[row - 1][sortedBySum[row - 1].length - 1]['category'] = cat;
    });
  }
  module.categoryView = categoryView;
  module.categoryView.autoAssignCategory = autoAssignCategory;

})(window);
