// COPIED FROM index.js

// Configuration Testing
console.log(`Application Name: ${config.get('name')}`);
console.log(`Mail Server Name: ${config.get('mail.host')}`);
console.log(`Mail Password: ${config.get('mail.password')}`);

// Middleware
const evan_middleware = require('./middleware/evan'); // CUSTOM middleware
app.use(evan_middleware);
app.use(express.static('local_files')); // this allows files in the "local_files" folder to be used ( e.g. http://localhost:3000/pokemon.txt )

// MAC ENVIRONMENT VARIABLE: `export PORT=4000'
// VIEW ALL ENVIRONMENT VARIABLES: 
console.log(process.env);

// Route Parameter : '/2018' in browser, ':year' (or any name) in backend (stored in request.params)
// Query String Parameter : '?somethingElse=true' in browser (stored in request.query)