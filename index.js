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
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port # ${port}`));

// this gives our app a response to send the user when the user visits the root directory '/'
app.get('/', (request, response) => response.send('Hello world!'));

// another potential response, this time for a subdirectory of simulated courses
app.get('/api/courses', (request, response) => response.send([1, 2, 3]));

// on Windows, use "set" to setup an environment variable; on Mac, use "export"
// in this app, I used `export PORT=4000' to setup the environment variable for PORT
// to view all environment variables: console.log(process.env);

// Route Parameter : '/2018' in browser, ':year' (or any name) in backend (stored in request.params)
// Query String Parameter : '?somethingElse=true' in browser (stored in request.query)

app.get('/api/courses/:id', (request, response) => response.send(request.params));