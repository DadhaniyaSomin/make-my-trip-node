const express = require('express');
const app = express();
const port = 3010;
const path = require('path');
const dotenv = require("dotenv").config();
const db = require('./config/database');

app.use(express.static('static'));
app.use(express.json());

//database connection
db.connect(process.env.DB_USERNAME, process.env.DB_PASSWORD);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port} ${process.env}`);
});


