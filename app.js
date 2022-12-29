const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');

require('dotenv').config();


const app = express();


//Parsing middleware
app.use(bodyParser.urlencoded({extended: false}));

//parse application/ JSON
app.use(bodyParser.json());

app.use(express.static('public'))


app.listen(5000, () => console.log(`Server is listening!`));