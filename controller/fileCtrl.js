const { StatusCodes } = require('http-status-codes')
const File = require('../model/file')

//upload File - post
const uploadFile =async (req,res) => {
    try {
        //to file data -> req.file
        let data = req.file

        //to validate file already exists or not
        let extFile = await File.findOne({originalname:data.originalname})
            if(extFile)
                return res.status(StatusCodes.CONFLICT).json({msg:`file already exist`})
        //file data upload to db 
        let newFile = await File.create(data)

        res.status(StatusCodes.CREATED).json({ data })

        res.status(StatusCodes.CREATED).json({status:true, msg:"file uploaded", newFile})
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status:false, msg : err})
        
    }
}
//read all files - get
const readAllFiles =async (req,res) => {
    try {
        res.status(StatusCodes.ACCEPTED).json({ msg : 'read all files'})
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status:false, msg : err})
        
    }
}

//read single files - get(id)
const readSingleFile =async (req,res) => {
    try {
        res.status(StatusCodes.ACCEPTED).json({ msg : 'read single file'})
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status:false, msg : err})
        
    }
}   

//read delete files - delete(id)
const deleteFile =async (req,res) => {
    try {
        res.status(StatusCodes.ACCEPTED).json({ msg : 'Delete file'})
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status:false, msg : err})
        
    }
}

module.exports = {uploadFile , readAllFiles, readSingleFile, deleteFile}