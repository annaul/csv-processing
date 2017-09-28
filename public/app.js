'use strict';

function fileLoaded(reader) {
  console.log(reader.result);
}

$('input').change(function() {
  var file = $('#input')[0].files[0];
  var reader = new FileReader();

  reader.addEventListener('loadend', function() { fileLoaded(reader); }, false)
  reader.readAsText(file);
});
