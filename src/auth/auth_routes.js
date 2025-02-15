import express from 'express';
const router = express.Router();
import {getMe, login,register, forgotPassword, validateRequest, updatePassword} from './auth_controller.js'
import authMiddleware from './middleware/auth_middleware.js';

router.post('/login', login);
router.post('/register',  register);
router.post('/recovery', forgotPassword)
router.post('/recovery/update',updatePassword)
router.post('/validateRequest', validateRequest)
router.get('/me',authMiddleware,getMe)
export default router;
