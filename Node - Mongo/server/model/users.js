var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  email:{type:String, required:true, unique: true},
  nombre:{type:String, required:true},
  fecha_nac:{type:String, required:true},
  password: { type: String, required: true}
})

var users = mongoose.model('users', userSchema)

module.exports = users;