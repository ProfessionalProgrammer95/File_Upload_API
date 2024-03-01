
const fileRoute = require('express').Router()

const { uploadFile , readAllFiles , readSingleFile , deleteFile} =require('../controller/fileCtrl')

//path

fileRoute.post(`/upload`, uploadFile)

fileRoute.get(`/all`, readAllFiles)

fileRoute.get(`/single/:id`, readSingleFile)

fileRoute.delete(`/delete/:id`, deleteFile)

module.exports = fileRoute