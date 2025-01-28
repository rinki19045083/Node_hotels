const express = require('express')
const person = require('./data/person')
const menu = require('./data/menu')
const db = require('./db')
const passport = require('./auth')
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express()
app.use(bodyParser.json());

const port = process.env.PORT || 3000;


////middleware function: for logging capture:
const logRequest = (req, res, next)=>{
    console.log(`${new Date().toLocaleString()} Request Made to ${req.originalUrl}`);
    next();
}

//app.use(logRequest);

//bodyParser: automatically modify the data from the request body: in the actually format: bodyParser.JSON() provide it in json format

const localauth = passport.authenticate('local', {session: false} );
app.get('/'  ,function (req, res){
    res.send("Hello! i am Rinki");
})
//authentication:
app.use(passport.initialize());




//import routes
const personRoutes = require('./routes/personRoutes');
app.use('/person',logRequest,localauth,  personRoutes);
//menu route import:

const menuRoutes = require('./routes/menuRoute');
app.use('/menu', menuRoutes);

//async and await: using try: if successful and catch: if successful

app.listen(port, ()=>{
    console.log("Hello!");
})




//CRUD operations:
//  create : POST
// read: GET 
// update: PUT/PATCH
// delete: DELETE






//express router: to write multiple endpoints


//parameterized menu route for dish taste : get the count of dishes for that taste



//update operation:: which record to update and what to update

