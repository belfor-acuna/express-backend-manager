// image_controller.js
import { uploadImageToR2, deleteImageFromR2Service } from './r2_service.js';

export async function uploadImage(req, res) {
  try {
    const file = req.file;
    const userId = req.user._id;  // ID del usuario autenticado

    if (!file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const fileName = `${userId}/${Date.now()}-${file.originalname}`;  // Genera un nombre único para la imagen
    const imageUrl = await uploadImageToR2(file, fileName);
  
    res.status(200).json({ url: imageUrl });
  } catch (error) {
    console.error('Error uploading image to R2:', error);
    res.status(500).json({ error: 'Error uploading image' });
  }
}

export async function deleteImageFromR2(req, res) {
  try {
    const { url } = req.body;
    const key = url.split(`${process.env.R2_BUCKET_NAME}/`)[1];

    await deleteImageFromR2Service(key);

    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Error deleting image from R2:', error);
    res.status(500).json({ error: 'Error deleting image' });
  }
}
