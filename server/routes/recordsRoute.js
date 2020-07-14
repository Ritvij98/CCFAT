const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {
    requireJWT
  } = require('../auth')
const { Users,Departments,Institutes } = require('../models/records')
const Records = require('../models/records'); 

const recordsRoute = express.Router();

recordsRoute.use(bodyParser.json());

recordsRoute.route('/users')
.get(requireJWT,(req,res,next) => {
   
    
    Records.Users.find({})
    .then((users) => {
        res.statusCode =200;
        res.setHeader('Content-Type','application/json');
        res.json(users);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(requireJWT,(req,res,next) => {
    Records.Users.create(req.body);
    console.log("done");
});

recordsRoute.route('/departments')
.get(requireJWT,(req,res,next) => {
    Records.Departments.find({})
    .then((departments) => {
        res.statusCode =200;
        res.setHeader('Content-Type','application/json');
        res.json(departments)       
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(requireJWT,(req,res,next) => {
    Records.Departments.create(req.body);
    console.log("done");
});

recordsRoute.route('/departments/:institute')
.get((req,res,next) => {
    Records.Departments.find({"institute":req.params.institute})
    .then((departments) => {
        res.statusCode =200;
        res.setHeader('Content-Type','application/json');
        res.json(departments)       
    }, (err) => next(err))
    .catch((err) => next(err));
})

recordsRoute.route('/institutes')
.get((req,res,next) => {
    Records.Institutes.find({})
    .then((institutes) => {
        res.statusCode =200;
        res.setHeader('Content-Type','application/json');
        res.json(institutes);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(requireJWT,(req,res,next) => {
    Records.Institutes.create(req.body);
    console.log("done");
});

recordsRoute.route('/userdata/:userID')
.get(requireJWT,(req,res)=>{
    Users.findById({_id:req.params.userID})
    .then((usersData) => {
        res.statusCode =200;
        res.setHeader('Content-Type','application/json');
        res.json(usersData);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(requireJWT,(req, res) => {
    Users.findByIdAndRemove({_id:req.params.userID})
    .then(() => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.send("Record Deleted.");
    }, (err) => next(err))
    .catch((err) => next(err));
});



recordsRoute.route('/mybookings/:userID')
.get(requireJWT,(req,res,next)=>{
   Users.findById({_id:req.params.userID})
        .populate('reservations')
        .exec(function (err, userdoc) {
            if (err) return handleError(err);
                      
            res.statusCode =200;
            res.setHeader('Content-Type','application/json');
            res.json(userdoc.reservations);
          });
        

   })

   recordsRoute.route('/deptdata/:deptID')
   .get(requireJWT,(req,res)=>{
       Departments.findById({_id:req.params.deptID})
       .then((deptData) => {
           res.statusCode =200;
           res.setHeader('Content-Type','application/json');
           res.json(deptData);
       }, (err) => next(err))
       .catch((err) => next(err));
   })
   .delete(requireJWT,(req, res) => {
    Departments.findByIdAndRemove({_id:req.params.deptID})
       .then(() => {
           res.statusCode = 200;
           res.setHeader('Content-Type', 'application/json');
           res.send("Record Deleted.");
       }, (err) => next(err))
       .catch((err) => next(err));
   });

   recordsRoute.route('/instdata/:instID')
   .get(requireJWT,(req,res)=>{
       Institutes.findById({_id:req.params.instID})
       .then((instData) => {
           res.statusCode =200;
           res.setHeader('Content-Type','application/json');
           res.json(instData);
       }, (err) => next(err))
       .catch((err) => next(err));
   })
   .delete(requireJWT,(req, res) => {
    Institutes.findByIdAndRemove({_id:req.params.instID})
       .then(() => {
           res.statusCode = 200;
           res.setHeader('Content-Type', 'application/json');
           res.send("Record Deleted.");
       }, (err) => next(err))
       .catch((err) => next(err));
   });

module.exports = recordsRoute;


