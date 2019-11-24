express = require('express');
metrics = require('./metrics');
//create a server
app = express();

path = require('path')
app.use(express.static(path.join(__dirname, 'public'))) 

app.set('port', 1338);
app.set('views', __dirname + "/view");
app.set('view engine', 'ejs');

app.get(
    '/', 
    (req, res) => res.send("Hello world")
)

app.get(
    '/hello/:name', 
    (req, res) => res.render('hello.ejs', {name: req.params.name})
)

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
