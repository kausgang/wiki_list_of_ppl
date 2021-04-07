const fs = require('fs')
var request = require('request');
var input_stream = fs.readFileSync('people.json');
var input = JSON.parse(input_stream);
// var cheerio = require('cheerio');


var people = [], pageid = [];

Object.keys(input).forEach(function(key){
  var value = input[key];
 
  people.push(value);

});

console.log(people)


// https://en.wikipedia.org/w/api.php?format=json&action=query&
// prop=extracts|pageimages&exintro&explaintext&generator=search&gsrsearch=intitle:planet%20mars&gsrlimit=1&redirects=1











people.forEach(element => {

  var url = "https://en.wikipedia.org/w/api.php"; 

  var params = {
      action: "query",
      list: "search",
      srsearch: element,
      format: "json",
      srlimit:1
      // redirects:1
  };
  
  url = url + "?origin=*";
  Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

  console.log(url)

//   // url = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts|pageimages&exintro&explaintext&generator=search&gsrsearch=intitle:planet%20mars&gsrlimit=1&redirects=1"


  request.get(url,(err,rsp_code,data)=>{

    if(err) throw err;

    data = JSON.parse(data);


    pageid.push(data.query.search[0].pageid)


    var obj = {};
    obj.people = people;
    obj.pageid=pageid;

    

     fs.writeFile('pageid.json',JSON.stringify(obj,null,2), (err,)=>{

      if(err) throw err;

      console.log("data writing complete");

    })
       

  })
  
})






