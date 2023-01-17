const Joi = require('joi'); // capital J because Joi is a class // this library does validations for us
const express = require('express');
const res = require('express/lib/response');
const app = express();
app.use(express.json()); // this enables middleware for request processes, allowing JSON to work

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

// this gives our app a response to send the user when the user visits the root directory '/'
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
    if (courses[course_id]) response.send(courses[course_id]);
    else response.status(404).send("course not found");
});

// POST REQUESTS //

app.post('/api/courses/', (request, response) => {
    const schema = {
        name: Joi.string().min(3).required(),
        professor: Joi.string().min(3).required()
    };

    const result = Joi.validate(request.body, schema); // validations

    if (result.error) { response.status(400).send(result.error.details[0].message); return; }; // catch if validations fail

    const course = {
        id: courses.length + 1, // generate an id in lieu of a database doing this for us
        name: request.body.name,
        professor: request.body.professor
    };

    courses.push(course); // add the new course to the courses variable
    response.send(course); // return the new course back to the client
});