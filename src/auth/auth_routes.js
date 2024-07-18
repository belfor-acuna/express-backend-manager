import express from 'express';
const router = express.Router();
import {getMe, login,register} from './auth_controller.js'

router.post('/login', login);
router.post('/register',  register);
router.get('/me',getMe)
export default router;
