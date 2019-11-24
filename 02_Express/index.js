//export module
express = require('express');
metrics = require('./metrics');
//create a server
app = express();

path = require('path')
app.use(express.static(path.join(__dirname, 'public'))) 

//server on port 1338
app.set('port', 1338);
app.set('views', __dirname + "/view");
app.set('view engine', 'ejs');

//homepage with small description
app.get(
    '/', 
    (req, res) => res.render('homepage.ejs')
)
//hello page with obtaining metrics
app.get(
    '/hello', 
    (req, res) => res.render('hello2.ejs')
)

//hello page with obtaining metrics and using parameters in the route
app.get(
    '/hello/:name', 
    (req, res) => res.render('hello.ejs', {name: req.params.name})
)
//show metrics
app.get(
    '/metrics.json', (req, res) => {
        metrics.get((err, data) => {
            if(err) throw err
            res.status(200).json(data)
        })
    }
)

app.listen(
    //start listeniing server here
    app.get('port'), 
    () => console.log(`server listening on ${app.get('port')}`)
)
