'use strict';

(function(module) {
  var fileInput = {};
  var spec;
  // --- get data from file ---
  function fileLoaded(reader) {
    var data = reader.result
    var lines = data.split('\n');
    // TODO: where do the last 2 lines go?
    restructureData(data, lines);
    sortbyName(statement);
    findGroupSum(names);
    sortbySum(names);
  }

  $('#input').change(function() {
    var file = $('#input')[0].files[0];
    var reader = new FileReader();

    reader.addEventListener('loadend', function() { fileLoaded(reader); }, false)
    reader.readAsText(file);
  });

  // --- create array of objects ---
  var statement = [];

  function restructureData(data, lines) {
    var Transaction = function(date, transaction, name, memo, amount) {
      this.date = date;
      this.transaction = transaction;
      this.name = name;
      this.memo = memo;
      this.amount = amount;
    }

    for (var i = 1; i < lines.length; i++) {
      var oneTransaction = lines[i].split(',');
      var transactionObj = new Transaction(oneTransaction[0], oneTransaction[1], oneTransaction[2], oneTransaction[3], oneTransaction[4]);
      statement.push(transactionObj);
    }
    return statement;
  }

  // --- manipulate statement array ---
 var names = {};

  // Structure:
  // Names {
  //   retailer: [{transaction}, {transaction}, statsObj{ sum: ...}],
  //   retailer: [{transaction}, {transaction}, statsObj{ sum: ...}]
  // }

  function sortbyName(statement) {
    for (var i = 0; i < statement.length; i++) {
      if (!statement[i].name) { break; };
      var retailer = statement[i].name.split(' ')[0].split(/[^A-Za-z]/)[0].toLowerCase();
      if (!names.hasOwnProperty(retailer)) {
        names[retailer] = retailer = [];
      }
      names[statement[i].name.split(' ')[0].split(/[^A-Za-z]/)[0].toLowerCase()].push(statement[i]);
      // TODO: why is just using variable retailer not working here?
    }
    return names;
  }

  function findGroupSum(names) {
    for (var key in names) {
      var sum = 0;
      for (var i = 0; i < names[key].length; i ++) {
        sum+= parseInt(names[key][i]['amount']);
      };
      var statsObj = { sum: sum, name: key};
      names[key].push(statsObj);
    };
  };

  var sortedBySum = [];
  function sortbySum(names) {
    for (var key in names) {
      sortedBySum.push(names[key]);
    }
    sortedBySum.sort(function(a, b) {
      return a[a.length - 1]['sum'] - b[b.length -1]['sum'];
    });
    return sortedBySum;
  };
  module.fileInput = fileInput;
  fileInput.statement = statement;
  fileInput.names = names;
  fileInput.sortedBySum = sortedBySum;
  fileInput.spec = spec;
})(window);
