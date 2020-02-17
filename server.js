const express = require('express')
const app = express()
const port = 3000
require('dotenv').config();

const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Add after body parser initialization!
app.use(expressValidator());

// enable JWT
app.use(cookieParser());

// setup db
require('./data/proposals-db');

// import routes
require("./controllers/auth")(app);

app.get('/', (req, res) => { res.send("hello world")})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))