const multer = require('multer')
const express = require('express')
const path = require('path')

//storage location and filename
const myStorage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null,"documents/")
    },
    filename:(req,file,cb) => {
        // cb(null,file.originalname)//original file name
        cb(null, `doc-${new Date().getTime().toString()}${path.extname(file.originalname)}`)
    }
});


//multer config
const fileConfig = multer({
    storage:myStorage,
    limits:{
        fileSize: 10 * 1024 * 1024 //10Mb
    }
}).single('mFile')

module.exports = fileConfig