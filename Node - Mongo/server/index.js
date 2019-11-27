const path = require('path'),
  express = require('express'),
  morgan = require('morgan'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  MongoClient = require('mongodb').MongoClient,
  url = 'mongodb://localhost:27017/mi_agenda_db';

const app = express();

mongoose.connect(url)
  .then(db => console.log('db connected'))
  .catch(err => console.log(err));

const indexRoutes = require('./routes/index');

app.set('port', process.env.PORT || 3000);
app.set('client', path.join(__dirname, '../client'));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(express.static('../client/'));
app.use(session({
  secret: "arielon",
  resave: false,
  saveUninitialized: false,
}));

app.use('/', indexRoutes);


app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});