const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session'),
      MongoClient = require('mongodb').MongoClient,
      url = 'mongodb://localhost:27017/mi_agenda_db';

const app = express();

mongoose.connect(url)
  .then(db => console.log('db connected'))
  .catch(err => console.log(err));

const indexRoutes = require('./routes/index');

app.set('port', process.env.PORT || 3000);
app.set('public', path.join(__dirname, '../public'));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('client'));
app.use(session({
	secret:"arielon",
	resave:false,
	saveUninitialized:false,
}));	

app.use('/', indexRoutes);


app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});