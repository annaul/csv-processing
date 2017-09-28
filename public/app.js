'use strict';

// --- get data from file ---

function fileLoaded(reader) {
  var data = reader.result
  console.log(data);
  var lines = data.split('\n');
  console.log(lines[1].split(',')[0]);
  restructureData(data, lines);
}

$('input').change(function() {
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
  };

  for (var i = 1; i < lines.length; i++) {
    var oneTransaction = lines[i].split(',');
    var transactionObj = new Transaction(oneTransaction[0], oneTransaction[1], oneTransaction[2], oneTransaction[3], oneTransaction[4]);
    statement.push(transactionObj);
  }
  return statement;
}

// --- manipulate statement array ---
