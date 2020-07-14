const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const moment= require('moment');
const nodemailer = require("nodemailer");
const smtpTransport = require('nodemailer-smtp-transport');
const {
    requireJWT
   } = require('../auth')

const Reservations = require('../models/reservations'); 
const { Users } = require('../models/records')

const reservationsRoute = express.Router();

reservationsRoute.use(bodyParser.json());

reservationsRoute.route('/')
.get((req,res,next) => {

    Reservations.find({})
    .then((reservations) => {
        res.statusCode =200;
        res.setHeader('Content-Type','application/json');
        res.json(reservations);
    }, (err) => next(err))
    .catch((err) => next(err));

})
.post(requireJWT,(req,res,next) => {
  
  
    if(req.body.notrecurring===1)
    {
         var booking = {
            user:req.body.userId, 
            dob: req.body.dob,
            st: req.body.st,
            et: req.body.et,
            purpose: req.body.purpose,
            nop:req.body.nop,
            recurring:[],
            recurringEndDate:req.body.recurringEndDate,
            approvalStatus:req.body.isAdmin,
            responded:req.body.responded
    }
    }else{
        
        
        var array=[];
        for(var i=moment(req.body.dob);i.isSameOrBefore(req.body.recurringEndDate,'day');i=i.add(1,'d')){
            if(i.day()===0){
                array.push(0)
            }else{
                array.push(1);
            }
        }
       
        var booking = {
            user:req.body.userId, 
            dob: req.body.dob,
            st: req.body.st,
            et: req.body.et,
            purpose: req.body.purpose,
            nop:req.body.nop,
            recurring:[...array],
            recurringEndDate:req.body.recurringEndDate,
            approvalStatus:req.body.isAdmin,
            responded:true
    }
    }
       
    Reservations.create(booking)
    .then((booking) => {
    
        Users.findByIdAndUpdate(req.body.userId, { "$push": { "reservations": booking._id } },
        function(err, managerparent) {
            if (err) throw err;
            
        })
      
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(booking);
    }, (err) => next(err))
    .catch((err) => next(err));
  
    
    

})

reservationsRoute.route('/approvallist')
.get(requireJWT,(req,res,next)=>{

    Reservations.find({responded:{$ne:true}})
    .populate('user')
    .exec(function (err, userdoc) {
    if (err) return handleError(err);    
    res.statusCode =200;
    res.setHeader('Content-Type','application/json');
    res.json(userdoc);
});
})
reservationsRoute.route('/recurring')
.get(requireJWT,(req,res,next)=>{
    Reservations.find({recurringEndDate:{$ne:null}})
    .then((reservations)=>{
        res.statuscode=200;
        res.setHeader('Content-Type','application/json');
        res.json(reservations);
    },(err) => next(err))
    .catch((err) => next(err));
})
.put(requireJWT,(req,res,next)=>{ 
   
    if(moment(req.body.chosenDate).dayOfYear()===(moment(req.body.dob)).dayOfYear()){
        index=0;
    }else{
        index = moment(req.body.chosenDate).diff(moment(req.body.dob),'days')+1
   } 
    
    var ob ='recurring.'+index
    Reservations.findByIdAndUpdate({_id:req.body.reservation},{$set:{[ob]:0}},function(err, doc) {
     
        if (err) return res.status(500).send({error: err});
        return res.status(200).send("done");
        
});
})




reservationsRoute.route('/:bookingid/:decision')
.put(requireJWT,(req,res,next)=>{
   
    Reservations.findByIdAndUpdate({_id:req.params.bookingid},{$set:{approvalStatus:req.params.decision,responded:true}})
        .populate('user')
        .then((doc)=>{
        nodemailer.createTestAccount((err, account) => {
            if (err) {
                console.error('Failed to create a testing account. ' + err.message);
                return process.exit(1);
            }
    let output;
    if(req.params.decision){
     output = `
     <h4>Dear ${doc.user.name},</h4>
     <h4>Your CCF Lab booking has been approved by the Administrator.</h4>  
     <h5>Booking Details</h5>
     <ul>
            
         <li>Date: ${moment(doc.dob).format("DD/MM/YYYY")}</li>
         <li>Purpose: ${doc.purpose}</li>
         <li>Number of Participants: ${doc.nop}</li>
         <li>Starting time: ${moment(doc.st).format("HH:mm")}</li>
         <li>Ending time: ${moment(doc.et).format("HH:mm")}</li>
     </ul> `
    }else{
     output = `
     <h4>Dear ${doc.user.name},</h4>
     <h4>Your following CCF Lab booking has been declined by the Administrator.</h4>  
     <h5>Booking Details</h5>
     <ul>
            
         <li>Date: ${moment(doc.dob).format("DD/MM/YYYY")}</li>
         <li>Purpose: ${doc.purpose}</li>
         <li>Number of Participants: ${doc.nop}</li>
         <li>Starting time: ${moment(doc.st).format("HH:mm")}</li>
         <li>Ending time: ${moment(doc.et).format("HH:mm")}</li>
     </ul> `
    }
        const transporter = nodemailer.createTransport(smtpTransport({
           
            service: 'gmail',
            host:'smtp.gmail.com',
            auth: {
                user: 'ccfmit2020@gmail.com',
                pass: 'naachnaaawe'
            }
        }));
     
        let info =  transporter.sendMail({
        
         from: '"CCFAT" <ccfmit2020@gmail.com>',
          to: doc.user.email,
          subject: "Booking Confirmed", 
          text: "Confirmed", 
          html: output 
        });
      
       
        return console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      


 })
},(err) => next(err))
.catch((err) => next(err));
})

// reservationsRoute.route('/dec/:bookingid')
// .put((req,res,next)=>{
//     Reservations.findByIdAndUpdate({_id:req.params.bookingid},{$set:{approvalStatus:false}})
//         .populate('user')
//         .then((doc)=>{
//         nodemailer.createTestAccount((err, account) => {
//             if (err) {
//                 console.error('Failed to create a testing account. ' + err.message);
//                 return process.exit(1);
//             }

//      const output = `
//      <h4>Dear ${doc.user.name},</h4>
//      <h4>Your following CCF Lab booking has been declined by the Administrator.</h4>  
//      <h5>Booking Details</h5>
//      <ul>
            
//          <li>Date: ${moment(doc.dob).format("DD/MM/YYYY")}</li>
//          <li>Purpose: ${doc.purpose}</li>
//          <li>Number of Participants: ${doc.nop}</li>
//          <li>Starting time: ${moment(doc.st).format("HH:mm")}</li>
//          <li>Ending time: ${moment(doc.et).format("HH:mm")}</li>
//      </ul> `
   
//         const transporter = nodemailer.createTransport(smtpTransport({
           
//             service: 'gmail',
//             host:'smtp.gmail.com',
//             auth: {
//                 user: 'ccfmit2020@gmail.com',
//                 pass: 'naachnaaawe'
//             }
           
//         }));
      
        
//         let info =  transporter.sendMail({

//          from: '"CCFAT" <ccfmit2020@gmail.com>',
//           to:"ritvij981@gmail.com",
//           subject: "Booking Confirmed",
//           text: "Confirmed", 
//           html: output 
//         });
      
       
//         return console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
       


//  })
// },(err) => next(err))
// .catch((err) => next(err));
// })

reservationsRoute.route('/:dob')
.get(requireJWT,(req,res,next) => {
    console.log(req.params.dob);
    var i=req.params.dob;

   console.log(moment(i).startOf('day').toISOString());
   
   console.log(moment(i).endOf('day').toISOString());
    
    
    Reservations.find({dob: {"$gte": moment(i).startOf('day').toISOString(),
                             "$lt": moment(i).endOf('day').toISOString()}})
    .then((reservations) => {
        
      
        
        res.statuscode =200;
        res.setHeader('Content-Type','application/json');
        res.json(reservations); 
    },(err) => next(err))
    .catch((err) => next(err));
})



reservationsRoute.route('/delete/:bookingid')
.delete(requireJWT,(req, res, next) => {
    
    Reservations.findByIdAndRemove(req.params.bookingid)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});


module.exports = reservationsRoute;
