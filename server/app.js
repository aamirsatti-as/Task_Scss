
var cors = require('cors')
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const mongoose = require('mongoose')


var studentRouter = require('./app_Endpoints/notes.js');
require("dotenv").config({path:"./config.env"});
var app = express();
var corsOptions = {
  origin: 'http://localhost:3000',
  credentials:  true
}

app.use(cors())
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

// Connection to Local MongoDb
mongoose.connect('mongodb://localhost:27017/Notes').then(() => {
  console.log('connected to Mongo Atlas')
}).catch((err) => console.log(err));


app.use('/', studentRouter);

const port = 5000;
app.listen(port,()=>{
  console.log(`Server running at Port ${port}`);
});

module.exports = app;
