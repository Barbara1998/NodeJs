//import express module
import express = require('express')
import { MetricsHandler } from './metrics'
import path = require('path')
import bodyparser = require('body-parser')

//create a server
const app = express()
const port: string = process.env.PORT || '8080'

app.use(express.static(path.join(__dirname, '/../public'))) 

app.set('views', __dirname + "/../view");
app.set('view engine', 'ejs');

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({"extended": false}))

//route 1
app.get('/', (req: any, res: any) => {
    res.write('Hello world')
    res.end()
})

//route 2
app.get(
    '/hello/:name', 
    (req, res) => res.render('hello.ejs', {name: req.params.name})
)

//declare a instance of MetricsHandler
const dbMet: MetricsHandler = new MetricsHandler('./db/metrics')

//route 3 : write metrics (key, value) in db
app.post('/metrics/:id', (req: any, res: any) => {
    dbMet.save(req.params.id, req.body, (err: Error | null) => {
        if (err) throw err
        res.status(200).send("Ya qqch")
    })
})

//route 4 : get all metrics
app.get('/metrics/', (req: any, res: any) => {
    dbMet.getAll(
        (err: Error | null, result: any) => {
        if(err) throw err    
        res.status(200).send(result)
    
        }
    )
})

//route 5 : get metrics from id
app.get('/metrics/:id', (req: any, res: any) => {
    dbMet.getOne(req.params.id, (err: Error | null, result: any) => {
        if(err) throw err
        res.status(200).send(result)
        }
    )
})

//route 6 : delete one metric from an ID
app.delete('/metrics/:id/:timestamp', (req: any, res: any) => {
    dbMet.deleteOneFromID(req.params.id, req.params.timestamp, (err: Error | null, result: any) => {
            if(err) throw err
            res.status(200).send(result)
            dbMet.delete(result, req.params.id)
        }
    )
})

//route 7 : delete metrics of user
app.delete('/metrics/:id', (req: any, res: any) => {
    dbMet.deleteAllFromID(req.params.id, (err: Error | null, result: any) => {
            if(err) throw err
            res.status(200).send(result)
            dbMet.delete(result, req.params.id)
        }
    )
})

app.listen(port, (err: Error) => {
    if (err) {
        throw err
    }
    console.log(`server is listening on port ${port}`)
})