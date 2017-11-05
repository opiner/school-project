var express = require('express');
var router = express.Router();
var app = express();
var router = express.Router();


var mongodb     = require('mongodb');
var MongoClient = mongodb.MongoClient;
//var dburl = "mongodb://localhost:27017/joeschool";
var dburl = 'mongodb://nsima:ab123456@ds111565.mlab.com:11565/schoolinfo'





router.get('/restrationform', function(req, res, next) {
  res.render('partials/addstudent', { title: 'Express' });
});


router.get('/viewall', function(req, res, next) {
  res.render('partials/viewall', { title: 'Express' });
});

router.get('/details', function(req, res, next) {
  res.render('partials/details', { title: 'Express' });
});

router.get('/edit', function(req, res, next) {
  res.render('partials/edit', { title: 'Express' });
});

router.get('/delete', function(req, res, next) {
  res.render('partials/delete', { title: 'Express' });
});



router.post('/addstudent', function(req, res, next) {

MongoClient.connect(dburl, function(err, db) {

    if(err) { res.send({"status":"network error"}) ;  return; }

    var collection = db.collection('students');

    var student =  {'firstname':req.body.firstname,'lastname':req.body.lastname, 'email':req.body.email, 
	'password':req.body.password, 'department':req.body.department, 'phone':req.body.phone} ;

    collection.insert(student, function(err, result) {

    if(err) { res.send({"status":"failed"}); }
	else{
		 res.send({"status":"ok", "student":student}) ;
		}

      db.close();
	});
   });
  
});




router.get('/register', function(req, res, next) {
  res.render('student/register', { title: 'Joseph Michael school' });
});



router.post('/pulldetails', function(req, res, next) {
   var id = req.body.id;
   console.log(id);
   MongoClient.connect(dburl, function(err, db) {
	 if(err) {  res.send({"status":"network error"})  ; return;  }
		var student = db.collection('students').find({_id : new mongodb.ObjectID(id)}).toArray(function(err, docs){
		console.log(docs);
	
	if(err) { res.send({"status":"failed"}); }
	else{
		 res.send(JSON.stringify({"status":"ok", "student":docs})) ;
		}
	db.close();
     });

  });

});


router.post('/liststudents', function(req, res, next) {
   var email = req.body.email;
   MongoClient.connect(dburl, function(err, db) {
	 if(err) {  res.send({"status":"network error"}) ; return; }
		var students = db.collection('students').find().toArray(function(err, docs){
		
	
	if(err) { res.send({"status":"failed"}); }
	else{
		 res.send(JSON.stringify({"status":"ok", "student":docs})) ;
		}
	db.close();
     });

  });

});




router.post('/updatestudent', function(req, res, next) {
 
   MongoClient.connect(dburl, function(err, db) {
	 if(err) {  res.send({"status":"network error"})  ; return;  }
		
		
	db.collection('students').update({'_id':new mongodb.ObjectID(req.body._id)}, 
    { $set: {'firstname': req.body.firstname, 'lastname': req.body.lastname, 'phone': req.body.phone, 'email': req.body.email,
	'password':req.body.password, 'department' : req.body.department } }, function(err, result) { 

	
	if(err) { res.send({"status":"failed"}); }
	else{
		 res.send(JSON.stringify({"status":"ok", "student":result})) ;
		}
	db.close();
     });

  });

});


router.post('/deletestudent', function(req, res, next) {
 
   var id = req.body._id;
 
  MongoClient.connect(dburl, function(err, db) {

    if(err) { res.send({"status":"failed"}); }

    db.collection('students', function(err, students) {

      students.deleteOne({_id: new mongodb.ObjectID(id)});

      if (err){
  
      res.send({"status":"failed"});
   
      }else{
    
         db.close();
          res.send({"status":"ok"});
    
       }

    });

  });

});




module.exports = router;
