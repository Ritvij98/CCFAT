const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const mongoose = require('mongoose');
var cors = require('cors')
var passport  = require("passport");
var config = require("./config");
const recordsRoute = require('./routes/recordsRoute');
const reservationsRoute = require('./routes/reservationsRoute');
const router = require('./routes/users');
const calendar = require('./routes/calendar');
require('dotenv').config();



const authMiddleware = require('./auth')
const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
const url = config.mongoUrl;
const connect = mongoose.connect(url,connectionOptions);

connect.then(() => {
    console.log("Connected successfully to the server.");
}, (err) => {console.log(err)});


const app = express();


app.use(cors({credentials:true}));
app.use(bodyParser.json());
app.use(authMiddleware.initialize)


app.use('/auth',router)
app.use('/records',recordsRoute);
app.use('/reservations',reservationsRoute);
app.use('/calendar',calendar);


const server = http.createServer(app);

server.listen(3002,()=>{
    console.log("running");
    
});
