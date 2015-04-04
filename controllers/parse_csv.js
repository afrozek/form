module.exports = function(req, res){


//OPEN FILE
var fs = require('fs');
var file = fs.readFileSync('./uploads/contacts.csv', "utf8");
//console.log(file);

//DATA INTO MONGO  
var mongoose = require('mongoose');

var rankSchema = new mongoose.Schema({
    serverid: Number,
    resetid: Number,
    rank: Number,
    countryNumber: Number,
    name: String,
    land: Number,
    networth: Number,
    tag: String,
    gov: String,
    gdi: Boolean,
    protection: Boolean,
    vacation: Boolean,
    alive: Boolean,
    deleted: Boolean
  });

var Rank = mongoose.model('Rank', rankSchema);

/* Data is just a block of CSV formatted text. This can be read from a file                                                                                                  
   or retrieved right in the response. */                                                                                                                                    
var data = '' +                                                                                                                                                              
    '9,386,1,451,Super Kancheong Style,22586,318793803,LaF,D,1,0,0,1,0\n' +                                                                                                  
    '9,386,2,119,Storm of Swords,25365,293053897,LaF,D,1,0,0,1,0\n' +                                                                                                        
    '9,386,3,33,eug gave it to mak gangnam style,43501,212637806,LaF,H,1,0,0,1,0\n' +                                                                                        
    '9,386,4,128,Justpickupgirlsdotcom,22628,201606479,LaF,H,1,0,0,1,0\n' +                                                                                                  
    '9,386,5,300,One and Done,22100,196130870,LaF,H,1,0,0,1,0\n';                                                                                                            

data = data.split('\n');                                                                                                                                                     

data.forEach(function(line) {                                                                                                                                                
    line = line.split(',');   

    if (line.length != 14)
        return;                                                                                                                                               

    /* Create an object representation of our CSV data. */                                                                                                                   
    var new_rank = {                                                                                                                                                         
        serverid: line[0],                                                                                                                                                   
        resetid: line[1],                                                                                                                                                    
        rank: line[2],                                                                                                                                                       
        countryNumber: line[3],                                                                                                                                              
        name: line[4],                                                                                                                                                       
        land: line[5],                                                                                                                                                       
        networth: line[6],                                                                                                                                                   
        tag: line[7],                                                                                                                                                        
        gov: line[8],                                                                                                                                                        
        gdi: line[9],                                                                                                                                                        
        protection: line[10],                                                                                                                                                
        vacation: line[11],                                                                                                                                                  
        alive: line[12],                                                                                                                                                     
        deleted: line[13]                                                                                                                                                    
    };                                                                                                                                                                       

    /* Store the new entry in MongoDB. */                                                                                                                                    
    Rank.create(new_rank, function(err, rank) {                                                                                                                            
        //console.log('Created new rank!', rank);                                                                                                                              
    });                                                                                                                                                                      
});

// database query, getting from mongo
Rank.find(function (err, ranks) {
  if (err) return console.error(err);
  console.log(ranks)
})

}
