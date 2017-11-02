// import modules

var http = require('http');
var fs = require('fs');
var formidable = require("formidable");
var util = require('util');
var exec = require('child_process').exec;
var BitlyAPI = require("node-bitlyapi");
var wait=require('wait.for');
var getUrls=require('get-urls');

// declare variables
var shorturl;


//Bitly Credentials
var access_token ;

var Bitly = new BitlyAPI({
	client_id: "<username>", //provide bitly user name here
	client_secret: access_token	
});
//set access token
Bitly.setAccessToken('<accesstoken>'); //provide bitly access token


//create server and bring up the application
var server = http.createServer(function (req, res) {
    if (req.method.toLowerCase() == 'get') {
        displayForm(res);
    } else if (req.method.toLowerCase() == 'post') {
        processAllFieldsOfTheForm(req, res);
    }

});

//this function is to display the html page when the page is accessed firt time - GET
function displayForm(res) {
    fs.readFile('form.html', function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'text/html',
                'Content-Length': data.length
        });
        res.write(data);
        res.end();
    });
}

//this function search for any occurence of url in a given text and replace it with short url
function urlify(text, phoneNumber) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    // return text.replace(urlRegex, function(url) {
        // convert long url to short url 
        const url = Array.from(getUrls(text))[0] ;
        
        
       Bitly.shorten({longUrl: url}, function(err, results) {
        // Do something with your new, shorter url...
           var obj = JSON.parse(results);
            shorturl= obj.data.url;
                   //burst api credentials
        var apiKey = "<burstsmsapikey>"; // provide BurstSMS api key
        var login = "<username>";  //burstsms username
        var message =  text.replace(urlRegex, shorturl) 
        
        // command to invoke to burssmsapi 
        var command = `curl https://api.transmitsms.com/send-sms.json \
        -u ${apiKey}:secret \
        -d "message=${message}" \
        -d to=${phoneNumber}`;

        // invoke to burssmsapi 
        child = exec(command, function(error, stdout, stderr){
            
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            
            if(error !== null)
            {
                console.log('exec error: ' + error);
            }
            
            });

        });
        
        // return obj ;
    // });
}

//this function is to display the html page on clicking submit button - POST
function processAllFieldsOfTheForm(req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        //Store the data from the fields in your data store.
        //The data store could be a file or database or any other store based
        //on your application.
        res.writeHead(200, {
            'content-type': 'text/plain'
        });
        
        //get from field values
        var message = fields.message;
        var phoneNumber = fields.phone;

        // var text = "Find me at http://www.example.com and also at http://stackoverflow.com";
        
        // shorten the url in the message
        var html = urlify(message, phoneNumber);

        res.end(`Your message is successfully send!!\n\n`);


    });   
    
}

server.listen(1185);
console.log("server listening on 1185");
