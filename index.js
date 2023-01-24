const startupDebugger = require('debug')('app:startup'); // coincides with export DEBUG=app:startup
const dbDebugger = require('debug')('app:db'); // to turn off all debugging, use export DEBUG=
                                                // to use multiple debug environments: export DEBUG=app:startup,app:db OR export DEBUG=app*
const config = require('config');
const Joi = require('joi'); // capital J because Joi is a class // this library does validations for us
const express = require('express');

// Routes
const home = require('./routes/home.js');
const courses = require('./routes/courses.js');

const app = express();

// Templating Engine
app.set('view engine', 'pug'); // this replaces the need to "require" the module pug
// app.set('views', './views'); // this is set by default

// Middleware
app.use(express.json()); // this parses the request and, if there is a JSON object, parses it and populates request.body
app.use('/', home);
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