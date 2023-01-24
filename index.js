const startupDebugger = require('debug')('app:startup'); // coincides with export DEBUG=app:startup
const dbDebugger = require('debug')('app:db'); // to turn off all debugging, use export DEBUG=
                                                // to use multiple debug environments: export DEBUG=app:startup,app:db OR export DEBUG=app*
const config = require('config');
const Joi = require('joi'); // capital J because Joi is a class // this library does validations for us
const express = require('express');
const courses = require('./routes/courses.js');
const evan_middleware = require('./evan'); // currently not used
const app = express();

// Templating Engine
app.set('view engine', 'pug'); // this replaces the need to "require" the module pug
// app.set('views', './views'); // this is set by default

// Configuration Testing
// console.log(`Application Name: ${config.get('name')}`);
// console.log(`Mail Server Name: ${config.get('mail.host')}`);
// console.log(`Mail Password: ${config.get('mail.password')}`);

// Middleware
app.use(express.json()); // this parses the request and, if there is a JSON object, parses it and populates request.body
// app.use(evan_middleware); // this just logs to the console
app.use(express.static('local_files')); // this allows files in the "local_files" folder to be accessed on the server
                                        // e.g. http://localhost:3000/pokemon.txt
app.use('/api/courses', courses); // for any routes starting with 'api/courses', use my courses module router

if (app.get('env') === 'development') {
    // any code (e.g. middleware) placed in here will only run in the development environment
    // to switch environment, change the environment variable in the console
    // e.g. export NODE_ENV=production
    startupDebugger("this comment should only show in development mode with debugger enabled");
}

// this tells our app to host a server on post 3000 and listen for requests
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port # ${port}`));

// GET

// this gives our app a response to send the client when the user visits the root directory '/'
app.get('/', (request, response) => {
    // response.send('Hello world!')
    response.render('index', {title: "Express Demo App", message: "Hello World"}); // a pug template, passed with an object holding 2 variables
});

// MAC ENVIRONMENT VARIABLE: `export PORT=4000'
// VIEW ALL ENVIRONMENT VARIABLES: console.log(process.env);

// Route Parameter : '/2018' in browser, ':year' (or any name) in backend (stored in request.params)
// Query String Parameter : '?somethingElse=true' in browser (stored in request.query)