// Import a HTTP module
const http = require('http')
// Import Node url module
const url = require('url')
//import query module
const qs = require('querystring')

const helloExplain = '<!DOCTYPE html>' +
'<html>' +
'    <head>' +
'        <meta charset="utf-8" />' +
'    </head>' + 
'    <body>' +
'         <h1>How /hello works ?</h1>' +
'         <p> /hello is a path on the server so if url is like localhost:8080/hello it will redirect on the Hello World page </p>' +
'    </body>' +
'</html>'

const error404 = '<!DOCTYPE html>' +
'<html>' +
'    <head>' +
'        <meta charset="utf-8" />' +
'    </head>' + 
'    <body>' +
'         <h1>Error 404</h1>' +
'         <p>Page not found :/ Sorry </p>' +
'    </body>' +
'</html>'

const names = ['Emma', 'Lucie', 'Seb', 'Adrien', 'Andréa']

replies = function (name){

    var randomName = names[Math.floor(Math.random() * names.length)];
    return (
        '<!DOCTYPE html>' +
        '<html>' +
        '    <body>' +
        '         <p>' + name+ ' : Hello ! </p>' +
        '         <p>' + randomName + ' : Hello ' + name + ' ! </p>' +
        '         <p>' + name+ ' : Nice to meet you ! I like potatoes :) </p>' +
        '    </body>' +
        '</html>'
    );

}

module.exports = {
    serverHandle : function (req, res) {
        // Retrieve and print the queryParams
        const route = url.parse(req.url);
        const path = route.pathname;
        const params = qs.parse(route.query);

        console.log("route="+route);
        console.log("path="+path);
    
        res.writeHead(200, {'Content-Type': 'text/html'});

        //route 1 with path = '/'
        if (path === '/') {
            res.write(helloExplain);
        }
        //route 2
        if(path === '/hello'){
            res.write('Hello World\n');
        }
        //route 3 path = '/hello?name'
        if (path === '/hello' && 'name' in params) {
            res.write(replies(params['name']));
        }
        //if any of these routes : error 404
        else{
            if( path !== '/' && path !== '/hello' )
                res.write(error404);
        }
        res.end();
    }
}

