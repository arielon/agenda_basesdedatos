var mongoose = require('mongoose');
var users = require('../model/users');

var Schema = mongoose.Schema;

var eventSchema = new Schema({
	 title:{ type: String, required: true }, 
      start: { type: String, required: true }, 
      end: { type: String, required: false },
      allDay:{type: Boolean, required: true},
      user: { type: String, ref: "users" }
    });


var events = mongoose.model('events', eventSchema)

module.exports = events;