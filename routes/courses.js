const express = require('express');
// const app = express(); // this format does NOT work when separating routes into own file.
const router = require('express').Router(); // MUST use Router, not App as shown above

function validateCourse(course) { 
    // this function depends on the Joi class
    const schema = { name: Joi.string().min(3).required(), professor: Joi.string().min(3).required()};
    return Joi.validate(course, schema);
}

const courses = [
    {id: 0, name: "Composition", professor: "John"},
    {id: 1, name: "Sociology", professor: "Raj"},
    {id: 2, name: "US History 2", professor: "Jay"},
    {id: 3, name: "Biology", professor: "Holly"}
];

// All Coursess
// OLD: router.get('/api/courses' ... routes are truncated thanks to "app.use('/api/courses'"" in index.js
router.get('/', (request, response) => response.send(courses));

// One Course
router.get('/:id', (request, response) => {
    let course_id = parseInt(request.params.id);
    if (!courses[course_id]) return response.status(404).send(`course #${course_id} not found`);
    response.send(courses[course_id]);
});

// POST 
router.post('/', (request, response) => { 
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
router.put('/:id', (request, response) => {
    let course_id = parseInt(request.params.id);
    if (!courses[course_id]) return response.status(404).send(`Course #${course_id} not found`);
    // 404 response if course isn't found 

    const {error} = validateCourse(request.body); // if course is found, do validations
    if (error) return response.status(400).send(error.details[0].message); // return if error

    course.name = request.body.name; // update name
    course.professor = request.body.professor; // update professor

    response.send(course);
});

// DELETE
router.delete('/:id', (request, response) => {
    const course = courses.find(c => c.id === parseInt(request.params.id));
    if (!course) return response.status(404).send(`Course #${request.params.id} not found`);

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    response.send(course);
});

module.exports = router;