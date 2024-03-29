const { StatusCodes } = require('http-status-codes')
const File = require('../model/file')
const fs = require('fs')
const mailsend = require("../config/mail")

//upload File - post
const uploadFile =async (req,res) => {
    try {
        //to file data -> req.file
        let data = req.file
        //  let data = req.files -> mulitple files

        //to validate file already exists or not
        let extFile = await File.findOne({originalname:data.originalname})
            if(extFile){
                fs.unlinkSync(data.path)
                return res.status(StatusCodes.CONFLICT).json({msg:`file already exist`})
            }


        //file data upload to db 
        let newFile = await File.create(data)

        //attachments data
        let fileData = [
            {
                filename:newFile.filename,
                path:newFile.path
            }
        ]

        //sending email with attachments
        let mailRes = await mailsend("rakshithav1358@gmail.com", "File attachment", "Welcome to file api with file attachment", fileData)

        res.status(StatusCodes.CREATED).json({status:true, msg:"file uploaded", newFile, mailRes})
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status:false, msg : err})
    }
}
//read all files - get
const readAllFiles =async (req,res) => {
    try {
        //to find  all the documents in collection and send as a response
        let data = await File.find({})

        //final response
        res.status(StatusCodes.ACCEPTED).json({ status:true, length:data.length, files:data})
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status:false, msg : err})
        
    }
}

//read single files - get(id)
const readSingleFile =async (req,res) => {
    try {
        //reading file id from router parameter
        let id = req.params.id

        //file exists in db or not
        let extFile = await File.findById(id)

        //if not exists throw error
        if(!extFile)
            return res.status(StatusCodes.NOT_FOUND).json({status: false, msg: 'requested is not found'})
        //final response
        res.status(StatusCodes.ACCEPTED).json({ status:true, file:extFile})
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status:false, msg : err})
        
    }
}   

//read delete files - delete(id)
const deleteFile =async (req,res) => {
    try {
        //reading file id from router parameter
        let id = req.params.id

        //file is exists in db or not
        let extFile = await File.findById(id)

        //if file not exists -> throw err
        if(!extFile)
            return res.status(StatusCodes.NOT_FOUND).json({status: false, msg:'requested id not found'})

        //delete file from location
            fs.unlinkSync(extFile.path) /* delete file from location*/

        //deleting db content
            await File.findByIdAndDelete(id)

        //final response
        res.status(StatusCodes.ACCEPTED).json({ status:true, msg : ' File Deleted Successfully'})
    } catch (err) {
        //logical error
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status:false, msg : err.message})
        
    }
}

module.exports = {uploadFile , readAllFiles, readSingleFile, deleteFile}