const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // change if needed
    password: 'Sgn@1234', // set your MySQL password here
    database: 'placement'
});

connection.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

app.post('/submit', (req, res) => {
    const { name, usn, branch, company, ctc, phonenumber, date_of_placement } = req.body;
    const sql = 'INSERT INTO placements (name, usn, branch, company, ctc, phonenumber, date_of_placement) VALUES (?, ?, ?, ?, ?, ?, ?)';
    connection.query(sql, [name, usn, branch, company, ctc, phonenumber, date_of_placement], (error, results) => {
        if (error) {
            res.status(500).json({ message: 'Error: ' + error });
            return;
        }
        res.status(200).json({ message: 'Placement details submitted successfully!' });
    });
});

app.get('/search', (req, res) => {
    const query = req.query.query;
    const sql = 'SELECT * FROM placements WHERE name LIKE ? OR usn LIKE ? OR company LIKE ?';
    const likeQuery = '%' + query + '%';
    connection.query(sql, [likeQuery, likeQuery, likeQuery], (error, results) => {
        if (error) {
            res.status(500).json({ message: 'Error: ' + error });
            return;
        }
        res.status(200).json(results);
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
