const express = require('express');
const bodyParser  = require('body-parser');
const mongoose = require('mongoose');
const moment = require('moment');
const birthdayModel = require('birthdayModel');

//Require all the operation files
const addEntry = require('./operations/add.js');
const deleteEntry = require('./operations/delete.js');
const findEntry = require('./operations/find.js');
const updateEntry = require('./operations/update.js');
const getNearestBirthday = require('./operations/nearestBirthday.js');

//Set up the express server
const app = express();
app.use(bodyParser.json());
app.listen(3000, ()=> console.log("Server up!"));

//Connect to the MongoDB database
mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PW}@cluster0.zifzv.mongodb.net/?retryWrites=true&w=majority`, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

//POST requests
app.post('/add', (req, res)=>{
  addEntry(req, res, birthdayModel);
});
app.post('/update', (req, res)=>{
  updateEntry(req, res, birthdayModel);
});
app.post('/delete', (req, res)=>{
  deleteEntry(req, res, birthdayModel);
});

//GET requests
app.get('/find', (req, res)=>{
  findEntry(req, res, birthdayModel);
})
app.get('/nearestBirthday', (req, res)=>{
  getNearestBirthday(req, res, birthdayModel);
})