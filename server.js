const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static('./public'));

// app.get('*', function(request, response) {
//   // console.log('New request:', request.url);
//   response.sendFile('index.html', { root: './public' });
// });

app.listen(PORT, function(){
  console.log('Server is up and running on port 5000');
})
