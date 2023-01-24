const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
    response.render('index', {title: "Express Demo App", message: "Hello World"}); // a pug template, passed with an object holding 2 variables
});

modules.export = router;