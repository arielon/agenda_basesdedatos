const express = require('express'),
      router = express.Router(),
      Users = require('../model/users'),
      Events = require('../model/events'),
      mongoose = require('mongoose'),
      Operaciones = require('./CRUD.js');

MongoClient = require('mongodb').MongoClient


const url = 'mongodb://localhost:27017/mi_agenda_db';
const dbName = 'mi_agenda_db';

router.post('/login', async (req, res) => {
    let mail = req.body.user
    let pass_word = req.body.pass
    const client = new MongoClient(url);
  try {
  		  await client.connect();
    	 //console.log("Connected correctly to server /login");**check point

    	 const db = client.db(dbName);

   		 db.collection('users').find({}).count().then((n) => {
        	//console.log(`There are ${n} documents`);**check point
        	if (n == 0 ) {
        		Operaciones.insertarUsuario((error,result)=>{
  					if(error)console.log(error);
  					console.log(result);
				})
        	} 
          if(n > 0 ) {
        		  Users.find({email: mail, password: pass_word}).count({}, (err, count) =>{
               if (count == 1 ){
                  req.session.use_r = mail;
                   res.send("Validado");
                }else{
                  res.send("Usuario/contraseña incorrecta, verifiquelos e intente nuevamente");
                }       
              });	
            }
          });
        }catch (err) {
        console.log(err.stack);
      }
   client.close();
});



router.get('/events/all', async (req, res) => {
    let current_user = req.session.use_r
    const client = new MongoClient(url);

  try {
      await client.connect();
       //console.log("Connected correctly to server /events/all");**check point
       const db = client.db(dbName);

        db.collection('events').find({}).count().then((n) => {
          if (n==0) {
            Operaciones.createCollection((error,result)=>{
            if(error)console.log(error);
            console.log(result);
           })
        };
          //console.log(`There are ${n} documents`);**check point
        
        });

       Events.find({user: current_user}).exec((error, doc) => {
        if(error)console.log(error);
          res.send(doc);
        });

      }catch(err){
          console.log(err.stack);

      }

 client.close();

});

router.post('/events/new', async (req, res) => {
    const client = new MongoClient(url);
  try {
      await client.connect();
       //console.log("Connected correctly to server /events/new");**check point
       const db = client.db(dbName);
       let current_user = req.session.use_r
       let new_event={
            "title":req.body.title,
            "start":req.body.start,
            "end":req.body.end,
            "allDay":req.body.allDay,
            "user": current_user,
          }
          console.log(new_event);
        db.collection('events').insertOne(new_event);
        res.send("Evento Guardado");

    }catch(err) {

        console.log(err);

    }
  

 client.close();

});

router.post('/events/delete/:_id', async (req, res) => {
  const client = new MongoClient(url);
  try {
      await client.connect();
      //console.log("Connected correctly to server /events/delete");**check point
      const db = client.db(dbName);
      let id = req.params._id
      console.log(id);
      Events.remove({_id: id}, function(error) {
        if(error)console.log(error);
        res.send("Evento eliminado")
      })
    }catch(err) {

        console.log(err);

    }
  client.close();  
});

router.post('/events/update/:_id/:start/:end/:allDay', async (req, res) => {
  const client = new MongoClient(url);
  try {
      await client.connect();
      //console.log("Connected correctly to server /events/update");**check point
      //console.log(req.params.data);**check point
      const db    = client.db(dbName);
      let id_     = req.params._id;
      let start_  = req.params.start;
      let end_    = req.params.end;
      let allday_ = req.params.allDay;
          Events.update({_id: id_}, {$set: {start:start_ , end:end_, allDay:allday_ }}, (error, result) => { 
            if (error){ 
              res.send(error )
            }else{
              res.send("Evento actualizado") 
            }
      });
    }catch(err) {

        console.log(err);
    }
  client.close();  
});

module.exports = router;