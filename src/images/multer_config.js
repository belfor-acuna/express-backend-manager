import multer from 'multer';

// Configuración de almacenamiento en memoria
const storage = multer.memoryStorage();

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },  //10 MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true); 
    } else {
      cb(new Error('Solo se aceptan imagenes'), false);
    }
  }
});

export default upload;
