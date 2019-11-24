// Import a module
const http = require('http')
// Import handles module
const handles = require('./handles')

//declare a http server
http.createServer(handles.serverHandle).listen(8080)


// curl localhost:8080 or go to http://localhost:8080