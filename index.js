const config = require('config');
const Joi = require('joi'); // capital J because Joi is a class // this library does validations for us
const express = require('express');
const evan_middleware = require('./evan');
const app = express();

// Configuration Testing
console.log(`Application Name: ${config.get('name')}`);
console.log(`Mail Server Name: ${config.get('mail.host')}`);

// Middleware
app.use(express.json()); // this parses the request and, if there is a JSON object, parses it and populates request.body
// app.use(evan_middleware); // this just logs to the console
app.use(express.static('local_files')); // this allows files in the "local_files" folder to be accessed on the server
                                        // e.g. http://localhost:3000/pokemon.txt
if (app.get('env') === 'development') {
    // any code (e.g. middleware) placed in here will only run in the development environment
    // to switch environment, change the environment variable in the console
    // e.g. export NODE_ENV=production
}

const courses = [
    {id: 0, name: "Composition", professor: "John"},
    {id: 1, name: "Sociology", professor: "Raj"},
    {id: 2, name: "US History 2", professor: "Jay"},
    {id: 3, name: "Biology", professor: "Holly"}
];

// Express gives us shortcuts to various HTTP Verbs used in REST
// app.get('url', callback-function(request, response) => {})
// app.post()
// app.put()
// app.delete()
/////////////////////////////////////////////////////////////////

// this tells our app to host a server on post 3000 and listen for requests
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port # ${port}`));

// GET

// this gives our app a response to send the client when the user visits the root directory '/'
app.get('/', (request, response) => response.send('Hello world!'));

// another potential response, this time for a subdirectory of simulated courses
app.get('/api/courses', (request, response) => response.send(courses));

// on Windows, use "set" to setup an environment variable; on Mac, use "export"
// in this app, I used `export PORT=4000' to setup the environment variable for PORT
// to view all environment variables: console.log(process.env);

// Route Parameter : '/2018' in browser, ':year' (or any name) in backend (stored in request.params)
// Query String Parameter : '?somethingElse=true' in browser (stored in request.query)

app.get('/api/courses/:id', (request, response) => {
    let course_id = parseInt(request.params.id);
    if (!courses[course_id]) return response.status(404).send(`course #${course_id} not found`);
    response.send(courses[course_id]);
});

// POST 

app.post('/api/courses/', (request, response) => { 
    const {error} = validateCourse(request.body); // error validations
    if (error) return response.status(400).send(error.details[0].message); // return if error

    const course = {
        id: courses.length, // generate an id in lieu of a database doing this for us
        name: request.body.name,
        professor: request.body.professor
    };

    courses.push(course); // add the new course to the courses variable
    response.send(course); // return the new course back to the client
});

// PUT 

app.put('/api/courses/:id', (request, response) => {
    let course_id = parseInt(request.params.id);
    if (!courses[course_id]) return response.status(404).send(`Course #${course_id} not found`);
    // 404 response if course isn't found 

    const {error} = validateCourse(request.body); // if course is found, do validations
    if (error) return response.status(400).send(error.details[0].message); // return if error

    course.name = request.body.name; // update name
    course.professor = request.body.professor; // update professor

    response.send(course);
});

function validateCourse(course) { // function used by PUT and POST requests
    // this function depends on the Joi class
    const schema = { name: Joi.string().min(3).required(), professor: Joi.string().min(3).required()};
    return Joi.validate(course, schema);
}

// DELETE

app.delete('/api/courses/:id', (request, response) => {
    const course = courses.find(c => c.id === parseInt(request.params.id));
    if (!course) return response.status(404).send(`Course #${request.params.id} not found`);

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    response.send(course);
});