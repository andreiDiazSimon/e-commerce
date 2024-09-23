
const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 9999;
app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'test',
  port: 3306,
  password: 'password',
});

connection.addListener('error', (err) => {
  console.log(err);
});

app.use(bodyParser.json());

app.post('/auth/create', (req, res) => {
  const { username, password } = req.body;

  const checkSql = `SELECT * FROM users WHERE username = ?`;
  connection.query(checkSql, [username], (err, results) => {
    if (err) {
      console.log(err);
      return res.send({ error: 'may error gago' });
    }

    if (results.length > 0) {
      return res.send({ mayGantongUsernameNa: true });
    }

    const sql = `INSERT INTO users (username, password) VALUES (?, ?)`;
    connection.query(sql, [username, password], (err, result) => {
      if (err) {
        console.log(err);
        return res.send({ error: 'error pag gawa account gago' });
      }
      console.log(result);
      res.send({ nakaGawaNaNewAccount: true });
    });
  });
});

app.post('/auth/login', (req, res) => {
  const { username, password } = req.body;
  const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;

  connection.query(sql, [username, password], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ error: 'Error logging in' });
    }

    if (results.length > 0) {
      console.log(results);
      res.send({ gumana: true }); // Successful login
    } else {
      res.status(401).send({ gumana: false, error: 'Invalid credentials' }); // Invalid credentials
    }
  });
});

app.listen(port, () => {
  console.log(`Node.js is running on http://localhost:${port}`);
});

