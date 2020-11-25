const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const logger = require("morgan");
const cors = require('cors');
const dbConfig = require('./config/database.config');
const routes = require('./routes');

// create express app
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// cors
var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));


// set up mongoose
mongoose.connect(
    dbConfig.url,
    { useNewUrlParser: true, useUnifiedTopology: true})
  .then(()=> {
    console.log('Database connected');
  })
  .catch((error)=> {
    console.log('Error connecting to database');
  });

// set up port
const port = 3000;
// set up route

routes.auth(app)
routes.user(app)

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Project with Nodejs Express and MongoDB',
  });
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});


