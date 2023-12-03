const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv'); // para poder usar la variables de entorno del archivo .env

dotenv.config(); 

const cloudinaryCloudName = process.env.CLOUDINARY_CLOUD_NAME;
const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY;
const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET;


// configuracion de cloudinary
cloudinary.config({ 
    cloud_name: cloudinaryCloudName, 
    api_key: cloudinaryApiKey,
    api_secret: cloudinaryApiSecret,
    secure: true
});

// funcion para subir imagenes a cloudinary
async function uploadImage(filePath) {
    return await cloudinary.uploader.upload(filePath, {
        folder: 'replit'
    });
}

// funcion para borrar imagenes de cloudinary
async function deleteImage(publicId) {
    return await cloudinary.uploader.destroy(publicId)
}

module.exports = {
    uploadImage: uploadImage,
    deleteImage: deleteImage
};