const express = require('express');
const app = express();
const port = 3010;
const path = require('path');
const dotenv = require("dotenv").config();
const db = require('./config/database')
const cors = require('cors');
const corsOptions = require('./config/corsOptions');

db.connect(process.env.DB_USERNAME, process.env.DB_PASSWORD);
app.use(express.json());

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 

//middleware for cookies
// app.use(cookieParser());

//middleware
app.use('/auth', require('./routes/auth.js'));
app.use('/hotels', require('./routes/hotels.js'));



app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
      res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
      res.json({ "error": "404 Not Found" });
  } else {
      res.type('txt').send("404 Not Found");
  }
});

app.use((err,req,res,next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something wend wrong."
  return res.status(errorStatus).json({
    success :false ,
    status : errorStatus,
    message : errorMessage,
    stack : err.stack
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port} ${process.env.DB_PASSWORD}`);
});


