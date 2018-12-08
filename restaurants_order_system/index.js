"use strict";
var express = require('express'),
    app = express(), //Define instance ofexpress module
    orderService = require('./mdl_order/mdl'), //Define the path to import module   
    handler = [], //Handling list of orders
    port = process.env.PORT || 8080;

for (let i = 0; i < 10; i++) //Creating order
    handler.push(orderService({ order: `order number: ${i}`, statusOrder: 0 }));

//Sending response to http browser in get method (When enterting root adress)
app.get('/', (req, res) => {
    res.send(`<!DOCTYPE html> <html> <head></head> <body>
    <h1> restaurant order managment service </h1> <blockquote> ${log} </blockquote>
    </body> </html>`);
});

//Listening to connections
app.listen(port);
console.log(`listening on port ${port}`);