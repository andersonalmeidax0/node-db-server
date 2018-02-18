/*
V1: inicial
APPGPSTEST: faz insert, list
CouchDB: appgps

//Ciclo: save, git add *, git diff --staged, git commit -m
*/

var sys = require("sys");
var http = require("http");
var events = require("events");
var path = require("path");
var url = require("url");
var fs = require("fs");
var https = require('https');
var qs = require('querystring');

//var srequest = require("httpclient");
//var srequest = require("sync-request");

sys.puts("Version: V1.1");

var program_name = process.argv[0]; //value will be "node"
var script_path = process.argv[1]; //value will be "yourscript.js"

/* *************************************************/
/* *************************************************/
/* UTIL    UTIL   UTIL                 */
/* *************************************************/
/* *************************************************/
function replaceAll(str, find, replace) {
  var i = str.indexOf(find);
  if (i > -1){
    str = str.replace(find, replace); 
    i = i + replace.length;
    var st2 = str.substring(i);
    if(st2.indexOf(find) > -1){
      str = str.substring(0,i) + replaceAll(st2, find, replace);
    }       
  }
  return str;
} 
/* *************************************************/
/* *************************************************/
/* UTIL    UTIL   UTIL                 */
/* *************************************************/
/* *************************************************/

function toAsciiNoComma(src) {
    var ch, str, i, result = '';
    str = JSON.stringify(src);

    for (i = 1; i < str.length - 1; i++) {
        ch = str.charCodeAt(i);  
	  
        if (ch < 128) {
		    if(str.charAt(i) === ',')
              result += ' ';
			else	
              result += str.charAt(i);
        } else {
            result += '\\u' + ch.toString(16);
        }
    }
	return result;
}

/* *************************************************/
/* *************************************************/
/************************ MAIN ********************/
/************************ MAIN ********************/
/************************ MAIN ********************/
/* *************************************************/
/* *************************************************/
console.info('START2...');

/* TODO
REPASSA GET e POST
*/

var serverPort = 8080;
var G_request;
var G_response;

var currentdate = new Date(); 
var datetime = 
                 currentdate.getFullYear() + "-"  + (currentdate.getMonth()+1)  + "-"  +  currentdate.getDate() + "-"
                + currentdate.getHours() + "-" + currentdate.getMinutes() + "-"  + currentdate.getSeconds();

var flog = fs.createWriteStream(datetime+'-dblog.txt'); 
var dbhost='172.18.0.2';
var dbport=5984;

/************************ SERVER   ********************/
/************************ SERVER   ********************/
/************************ SERVER   ********************/
/************************ SERVER   ********************/

http.createServer(function (request, response) 
{
//posiciona para os callbacks
   G_request=request;
   G_response=response;

var datetime = 
                 currentdate.getFullYear() + "-"  + (currentdate.getMonth()+1)  + "-"  +  currentdate.getDate() + "-"
                + currentdate.getHours() + "-" + currentdate.getMinutes() + "-"  + currentdate.getSeconds();

   flog.write(datetime+" "+request.connection.remoteAddress + ": " + request.method + " " + request.url+'\n');
   console.log(datetime+" "+request.connection.remoteAddress + ": " + request.method + " " + request.url);

// GET GET GET GET GET GET GET GET
  if(request.method === "GET") 
  {
      var dbpath=request.url;
      var dbmethod='GET';
      optionsget = {     host : dbhost, port : dbport,  path : dbpath, method : dbmethod   };
      var result1=''; var r='';
      //prepara callback quando fizer leitura do couddb response
      var UIMainFormShowListHandler  =  function(res) 
          {
            console.log("statusCode: ", res.statusCode);
            G_response.writeHead(res.statusCode, {'Content-Type': 'text/html'});
            res.on('data', 
            function(d) {
              //console.info('GET result data....\n');
              result1=result1+d;
            }
            ).on('end',
            function(){
              r=result1;
            console.info(JSON.stringify(result1));
            G_response.end(r);
            });
          };  
      //faz chamada do couchdb e termina   
      var reqGet = http.request(optionsget,UIMainFormShowListHandler );
      reqGet.end();
      reqGet.on('error', function(e) {
          console.error(e);
      });
    }
// POST POST POST POST POST POST POST POST 
   else
   { 
      if(request.method === "POST" || request.method === "PUT") 
      {
            var requestBody = '';
            request.on('data', function(data)  {
              requestBody += data;
              if(requestBody.length > 1e7) 
              {
                response.writeHead(413, 'Request Entity Too Large', {'Content-Type': 'text/html'});
                response.end('<!doctype html><html><head><title>413</title></head><body>413: Request Entity Too Large</body></html>');
              }
            });
            //apos receber todo o body do POST, executa este codigo.
            request.on('end', function() 
            {  
            /* end: chegou no final do parsing do body do post */
                  var dbpath=request.url;
                  var dbmethod=request.method;
                    optionsget = { host : dbhost, port : dbport,  path : dbpath, method : dbmethod ,
                     headers: {"content-type": "application/json"}
                      };
                  var result1=''; var r='';
                //prepara callback quando fizer leitura do couddb response
                  var UIMainFormShowListHandler  =  function(res) 
                      {
                        console.log("statusCode: ", res.statusCode);
                        G_response.writeHead(res.statusCode, {'Content-Type': 'text/html'});
                        res.on('data', function(d) {
                          //console.info('GET result data....\n');
                          result1=result1+d;
                        }
                        ).on('end',
                        function(){
                          r=result1;
                        console.info(JSON.stringify(result1));
                        G_response.end(r);
                        });
                      };
                        
                  //faz chamada do couchdb e termina   
                  var reqGet = http.request(optionsget,UIMainFormShowListHandler );
                  //isto faz POST dos dados
                  reqGet.write(requestBody);
                  reqGet.end();
                  reqGet.on('error', function(e) {
                      console.error(e);
                  });
            /* endcode: apos parsing do body do post */
            });
        }
        else 
        {
          response.writeHead(405, 'Method Not Supported', {'Content-Type': 'text/html'});
          return response.end('<!doctype html><html><head><title>405</title></head><body>405: Method Not Supported</body></html>');
        }
     }   
}).listen(serverPort);

console.log('Server running at localhost:'+serverPort);

//process.exit(0);



/*var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello Node.JS!');
}).listen(8080);

console.log('Server running at http://localhost:8080/');
*/
/*
var http = require('http');
var fs = require('fs');
var index = fs.readFileSync('index.html');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end(index);
}).listen(8080);
sys.puts("Server Running on 8080");  

/*var sys = require("sys"),
my_http = require("http"),
path = require("path"),
url = require("url"),
filesys = require("fs");
my_http.createServer(function(request,response){
  var my_path = url.parse(request.url).pathname;
  var full_path = path.join(process.cwd(),my_path);
  path.exists(full_path,function(exists){
    if(!exists){
      response.writeHeader(404, {"Content-Type": "text/plain"});  
      response.write("404 Not Found\n");  
      response.end();
    }
    else{
      filesys.readFile(full_path, "binary", function(err, file) {  
           if(err) {  
               response.writeHeader(500, {"Content-Type": "text/plain"});  
               response.write(err + "\n");  
               response.end();  
          
           }  
         else{
          response.writeHeader(200);  
              response.write(file, "binary");  
              response.end();
        }
            
      });
    }
  });
}).listen(8080);
sys.puts("Server Running on 8080");  
*/
