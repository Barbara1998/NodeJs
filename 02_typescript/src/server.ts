//import express module
import express = require('express')
//create a server
const app = express()
const port: string = process.env.PORT || '8080'

const path = require('path')
app.use(express.static(path.join(__dirname, 'public'))) 

app.set('views', __dirname + "./view");
app.set('view engine', 'ejs');

import { MetricsHandler } from './metrics'

app.get('/metrics.json', (req: any, res: any) => {
  MetricsHandler.get((err: Error | null, result?: any) => {
    if (err) {
      throw err
    }
    res.json(result)
  })
})

app.get('/', (req: any, res: any) => {
  res.write('Hello world')
  res.end()
})

//don't know how to render html with typescript 
app.get('/hello', (req: any, res: any) => {
  res.write('<html lang="en"> '+
 '<body class="container">'+
      '<div class="col-md-6 col-md-offset-3">'+
          '<h1>Hello </h1>'+
          '<button class="btn btn-success" id="show-metrics">'+
          'Bring the metrics'+
          '</button>'+
          '<div id="metrics"></div>'+
      '</div>'+
  '</body>'+
'</html>')
  res.end()
})

app.listen(port, (err: Error) => {
  if (err) {
    throw err
  }
  console.log(`server is listening on port ${port}`)
})