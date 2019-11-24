// Import a module
const http = require('http')
// Import Node url module
const url = require('url')

const qs = require('querystring')

const content = '<!DOCTYPE html>' +
'<html>' +
'    <head>' +
'        <meta charset="utf-8" />' +
'        <title>ECE AST</title>' +
'    </head>' + 
'    <body>' +
'         <p>Hello World !</p>' +
'    </body>' +
'</html>'

const serverHandle = function (req, res) {
    // Retrieve and print the queryParams
    const route = url.parse(req.url)
    const path = route.pathname 
    const params = qs.parse(route.query)

    res.writeHead(200, {'Content-Type': 'text/plain'});

    if (path === '/hello' && 'name' in params) {
        res.write('Hello mister ' + params['name'])
    } else {
        res.write('Hello anonymous')
    }

    res.end();
}

http.createServer(serverHandle).listen(8080)


// curl localhost:8080 or go to http://localhost:8080