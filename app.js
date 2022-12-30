const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');

require('dotenv').config();


const app = express();


//Parsing middleware
app.use(bodyParser.urlencoded({ extended: false }));

//parse application/ JSON
app.use(bodyParser.json());

app.use(express.static('public'));

//templating engine
app.engine('hbs', exphbs.engine({ extname: '.hbs'}));
app.set('view engine', 'hbs');


//connection pool
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

//connect to db
pool.getConnection((err,connection) =>{
    if(err) throw err;
    console.log('Connected to DB');
})


//router
app.get('/', (req, res) =>{
    res.render('home')
})

app.listen(5000, () => console.log(`Server is listening!`));