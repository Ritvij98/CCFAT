const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');


const storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: function(req, file, cb){
       cb(null,"calendar" + ".pdf");
    }
 });
 


 const calendar =  express.Router();

calendar.post("/upload",  multer({
    storage: storage
 }).single("myFile"), (req, res, err) => {
        console.log("done");
        const file = req.file
            if (!file) {
              const error = new Error('Please upload a file')
              error.httpStatusCode = 400
              return next(error)
            }
       console.log("Request ---", req.body)
       console.log("Request file ---", req.file)      
       if(!err)
          return res.send(200).end()
    }
 )
calendar.get('/display', function (req, res) {

    var file = fs.createReadStream('./public/uploads/calendar.pdf');
var stat = fs.statSync('./public/uploads/calendar.pdf');
res.setHeader('Content-Length', stat.size);
res.setHeader('Content-Type', 'application/pdf');
res.setHeader('Content-Disposition', 'attachment; filename=calendar.pdf');
file.pipe(res);
  
});
 module.exports = calendar;
// const router2 = express.Router();
// router2.use(bodyParser.json());
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + '-' + Date.now())
//     }
//   })
   
//   var upload = multer({ storage: storage })


// router2.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
//     const file = req.file
//     if (!file) {
//       const error = new Error('Please upload a file')
//       error.httpStatusCode = 400
//       return next(error)
//     }
//       res.send(file)
    
//   })