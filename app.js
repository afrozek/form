
/**
 * Module dependencies.
 */

var express = require('express');
var multer  = require('multer');
var done=false;
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var mongoose = require('mongoose');


var parse_csv = require('./controllers/parse_csv.js');
var form = require('./controllers/form');
var person = require('./controllers/person.js');





var app = express();

//mongo variables
var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;
mongoose.connect('mongodb://localhost/test');

/*require the person model*/
//require('./models/person');




/*Configure the multer.*/

app.use(multer({ dest: './uploads/',
 rename: function (fieldname, filename) {
    return filename+Date.now();
  },
onFileUploadStart: function (file) {
  console.log(file.originalname + ' is starting ...')
},
onFileUploadComplete: function (file) {
  console.log(file.fieldname + ' uploaded to  ' + file.path)
  done=true;
}
}));

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/*ROUTES*/
/*ROUTES*/
    // app.get('/', routes.index);
   
    //1.form route
    app.get('/',form.form);

    //2.process form
    app.post('/api/file',function(req,res){
      if(done==true){
        console.log(req.files);
        res.end("File uploaded.");
      }
    });

    //3.display links
    app.get('/person', person.form_handle);
    app.get('/parse_csv',parse_csv);

    //4.display details




http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
