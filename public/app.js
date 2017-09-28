'use strict';

// --- get data from file ---

function fileLoaded(reader) {
  var data = reader.result
  var lines = data.split('\n'));
}

$('input').change(function() {
  var file = $('#input')[0].files[0];
  var reader = new FileReader();

  reader.addEventListener('loadend', function() { fileLoaded(reader); }, false)
  reader.readAsText(file);
});

// --- create array of objects ---
var Transaction = function(date, transaction, name, memo, amount) {
  this.date = date;
  this.transaction = transaction;
  this.name = name;
  this.memo = memo;
  this.amount = amount;
};

for (var i = 1; i < lines; i++) {
  
}
