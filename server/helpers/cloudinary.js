const cloudinary = require('cloudinary').v2
const multer = require('multer')

cloudinary.config({
  cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
  api_key : process.env.CLOUDINARY_API_KEY ,
  api_secret : process.env.CLOUDINARY_API_SECRET
})

const storage = multer.memoryStorage()
const upload = multer({ storage })

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type : 'auto'
  })
  return result
}

module.exports = {
  upload,
  imageUploadUtil
}