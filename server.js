var express = require('express');
var app = express();
var mongojs = require('mongojs');//require mongojs module
var db = mongojs('contactlist',['contactlist']);//which database and collection we are used
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/contactlist',function (req,res) {
	console.log("I received a GET request")
	db.contactlist.find(function(err,docs){
		console.log(docs);
		res.json(docs);
	});
/*	person1 = {
			name : 'Tim',
			email: 'tim@gmail.com',
			number :'111-111-111'
		};
		person2 = {
			name : 'Emily',
			email: 'Emily@gmail.com',
			number :'222-222-222'
		};
		person3 = {
			name : 'Jhon',
			email: 'Jhon@gmail.com',
			number :'333-333-333'
		};

		contactlist = [person1, person2, person3];
		res.json(contactlist);*/
});
app.post('/contactlist',function (req, res) {
	console.log(req.body);
	db.contactlist.insert(req.body, function(err, doc){
		res.json(doc);
	});
})

app.delete('/contactlist/:id', function (req, res) {
	var id = req.params.id;
	console.log(id);
	db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
});

app.get('/contactlist/:id', function(req, res){
	var id = req.params.id;
	console.log(id);
	db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
		res.json(doc);
	});
});

app.put('/contactlist/:id', function (req, res) {
	var id = req.params.id;
	console.log(req.body.name);

	db.contactlist.findAndModify({query:{_id:mongojs.ObjectId(id)},
		update:{$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
		new: true}, function (err, doc) {
			res.json(doc);
		});
});

app.listen(3000, function () {
	console.log("server running on port 3000");
});
