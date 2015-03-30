
/*
 * POST REQUEST
 */

//db connect
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log(' hey we are connected');
});


//schema
var personSchema = mongoose.Schema({
    name: String
})

//model
var Person = mongoose.model('Person',personSchema);

//istance of person model
var afroze = new Person({name:'afroze'});

//saving to mongo
afroze.save(function (err) {
        console.log(err);
      });




//form handle
exports.form_handle = function(req, res){

var username=req.body.username;
res.send("the username is: " + username);


// database query, getting from mongo
Person.find(function (err, people) {
  if (err) return console.error(err);
  console.log(people)
})

//console.log(afroze.name);


};