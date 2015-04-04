var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var personSchema = new Schema({
    name: String,
    age: String
})

// mongoose.model('Person',personSchema);


var mongoose = require('mongoose');
var	Person = mongoose.model('Person',personSchema);

afroze = new Person();
afroze.name = "afroze";
afroze.age = '24';

//saving to mongo
afroze.save(function (err) {
        console.log(err);
      });

//form handle
exports.form_handle = function(req, res){

// var username=req.body.username;
// res.send("the username is: " + username);


// database query, getting from mongo
Person.find(function (err, people) {
  if (err) return console.error(err);
  console.log(people)
})

//render the page
  Person.find({}, function(err, people) {
    res.render('people', { 
      title: 'Links', 
      people: people 
    });
 });




};
