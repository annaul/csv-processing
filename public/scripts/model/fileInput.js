'use strict';

(function(module) {
  var fileInput = {};

  // --- get data from file ---
  function fileLoaded(reader) {
    var data = reader.result
    var lines = data.split('\n');
    // TODO: where do the last 2 lines go?
    restructureData(data, lines);
    sortbyName(statement);
    findGroupSum(names);
    sortbySum(names);
    sortbyDay(statement);
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
      //.split(/[^A-Za-z]/)[0].toLowerCase()
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
      var statsObj = { sum: sum };
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

  function sortbyDay(statement) {
    var mon = {number: 0, names: []}; var tue = {number: 0, names: []}; var wed = {number: 0, names: []}; var thur = {number: 0, names: []}; var fri = {number: 0, names: []}; var sat = {number: 0, names: []}; var sun = {number: 0, names: []};

    for (var i = 0; i < statement.length; i++) {
      if (new Date(statement[i].date).getDay() === 1) {
        mon.number += 1;
        if (mon.names.indexOf(statement[i].name) === -1) mon.names.push(statement[i].name);
      }
      if (new Date(statement[i].date).getDay() === 2) {
        tue.number += 1;
        if (tue.names.indexOf(statement[i].name) === -1) tue.names.push(statement[i].name);
      }
      if (new Date(statement[i].date).getDay() === 3) {
        wed.number += 1;
        if (wed.names.indexOf(statement[i].name) === -1) wed.names.push(statement[i].name);
      }
      if (new Date(statement[i].date).getDay() === 4) {
        thur.number += 1;
        if (thur.names.indexOf(statement[i].name) === -1) thur.names.push(statement[i].name);
      }
      if (new Date(statement[i].date).getDay() === 5) {
        fri.number += 1;
        if (fri.names.indexOf(statement[i].name) === -1) fri.names.push(statement[i].name);
      }
      if (new Date(statement[i].date).getDay() === 6) {
        sat.number += 1;
        if (sat.names.indexOf(statement[i].name) === -1) sat.names.push(statement[i].name);
      }
      if (new Date(statement[i].date).getDay() === 0) {
        sun.number += 1;
        if (sun.names.indexOf(statement[i].name) === -1) sun.names.push(statement[i].name);
      }
    }
  };
  module.fileInput = fileInput;
  fileInput.statement = statement;
  fileInput.names = names;
  fileInput.sortedBySum = sortedBySum;
  console.log('statement ', statement);
  console.log('sum ', sortedBySum);

})(window);
