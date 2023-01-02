
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

exports.find = (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Connected to DB');

        let searchTerm = req.body.search

        connection.query('SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?', ['%' + searchTerm + "%", '%' + searchTerm + "%"], (err, rows) => {
            connection.release();

            if (!err) {
                res.render('home', { rows })
            } else {
                console.log(err);
            }
        })
    })

};

exports.create = (req, res) => {
    res.render('create')
};

exports.form = (req, res) => {

    const { first_name, last_name, email, phone } = req.body;

    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query('INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?', [first_name, last_name, email, phone], (err, rows) => {
            connection.release();

            if (!err) {
                res.render('create')
            } else {
                console.log(err);
            }
        });
    });

};

exports.edit = (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err;



        connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release();

            if (!err) {
                res.render('edit', { rows })
            } else {
                console.log(err);
            }
        })
    })
};

exports.edited = (req, res) => {

    const { first_name, last_name, email, phone } = req.body;

    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query('UPDATE user SET first_name = ?, last_name = ?, email = ?, phone = ? WHERE id = ?', [first_name, last_name, email, phone, req.params.id], (err, rows) => {
            connection.release();

            if (!err) {
                connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
        
                    if (!err) {
                        res.render('edit', { rows })
                    } else {
                        console.log(err);
                    }
                })
            } else {
                console.log(err);
            }
        });
    });

};
