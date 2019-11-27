var User = require('../model/users.js')
var Events = require('../model/events.js')

var db = "mi_agenda_db"

module.exports.insertarUsuario = function (callback) {
    let Ariel = new User({
        email: "ariel@nextu.com",
        nombre: "Ariel",
        fecha_nac: "1994-06-04",
        password: "12345"
    })
    Ariel.save((error) => {
        if (error) callback(error)
        callback(null, "Registro guardado")
    })

}

module.exports.createCollection = function (callback) {
    Events.createCollection({})
    callback(null, "Se creo la coleccion")
}