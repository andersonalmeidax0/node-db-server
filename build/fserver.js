var http = require('http');
var fs = require('fs');
var path = require('path');

http.createServer(function (request, response) {
    console.log('request starting...');

    var filePath = '.' + request.url;
    if (filePath == './')
        filePath = './index.html';

    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;      
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
    }

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT'){
                fs.readFile('./404.html', function(error, content) {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                response.end(); 
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });

}).listen(8081);
console.log('Server running at http://127.0.0.1:8081/');

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
