import express from 'express';
import upload from './multer_config.js'; 
import { uploadImage } from './image_controller.js';
import authMiddleware from '../auth/middleware/auth_middleware.js';

const router = express.Router();


router.post(
  '/upload', 
  authMiddleware, 
  upload.single('image'), 
  uploadImage, 
);

export default router;
