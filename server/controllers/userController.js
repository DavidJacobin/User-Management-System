
const mysql = require('mysql')

const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});


exports.view = (req, res) => {



    //connect to db
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Connected to DB');


        connection.query('SELECT * FROM user', (err, rows) => {
            connection.release();

            if (!err) {
                res.render('home', { rows })
            } else {
                console.log(err);
            }
        })
    })
};
