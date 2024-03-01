const { StatusCodes } = require('http-status-codes')

//upload File - post
const uploadFile =async (req,res) => {
    try {
        res.status(StatusCodes.CREATED).json({ msg : 'upload file'})
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