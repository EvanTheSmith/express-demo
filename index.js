const express = require('express');
const res = require('express/lib/response');
const app = express();

// Express gives us shortcuts to various HTTP Verbs used in REST
// app.get('url', callback-function(request, response) => {})
// app.post()
// app.put()
// app.delete()
/////////////////////////////////////////////////////////////////


// this tells our app to host a server on post 3000 and listen for requests
app.listen(3000, () => console.log('Listening on port # 3000'));

// this gives our app a response to send the user when the user visits the root directory '/'
app.get('/', (request, response) => response.send('Hello world!'));

// another potential response, this time for a subdirectory of simulated courses
app.get('/api/courses', (request, response) => response.send([1, 2, 3]));

