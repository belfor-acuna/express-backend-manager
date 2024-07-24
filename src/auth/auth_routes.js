import express from 'express';
const router = express.Router();
import {getMe, login,register} from './auth_controller.js'
import authMiddleware from './middleware/auth_middleware.js';

router.post('/login', login);
router.post('/register',  register);
router.get('/me',authMiddleware,getMe)
export default router;
