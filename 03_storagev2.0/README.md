# NodeJs
Nodejs projects's history

# Description
We used the project from lab2 with typescript and add operation with a database.   
We created routes to :
* save metrics in database
* get all metrics of the database, no matter the ID
* get metrics of ONE user
* delete all metrics of ONE user
* delete ONE metric based on its key so, delete only for a specific user id

# Installation
Need to do `npm install`  
Do `npm run dev` to run server.ts

# Usage Instructions
We test our app with Postman.

## POST
1. To save metrics in the db use POST http protocol in Postman.  
To do so, use the route **localhost::8082/metrics/:id** and in the body type metrics with the format :   
[    
  {     
  	"timestamp":"1384686660000",    
	"value":"10"     
  }   
]    
Don't forget to check the raw and choose JSON type.    

## GET
1. Get all metrics use GET protocol and the route **localhost::8082/metrics/** 
2. Get all metrics of ONE user use GET protocol and the route **localhost::8082/metrics/:id** 

## DELETE
1. Delete all metrics of ONE user use DELETE protocol and the route **localhost::8082/metrics/:id** 
2. Delete ONE metric of ONE user use DELETE protocol and the route **localhost::8082/metrics/:id/:timestamp** 

# Contributors
* Cynthia Quaye
* Barbara Germaneau
> TD01 SI inter

