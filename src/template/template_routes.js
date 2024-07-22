import express from 'express';
const router = express.Router();
import authMiddleware from '../auth/middleware/auth_middleware.js';
import roleMiddleware from '../user/middleware/role_middleware.js';
import UserRoles from '../user/enum/user_roles.js';
import { createTemplate } from './template_controller.js';

router.post('/new', authMiddleware, roleMiddleware([UserRoles.ADMIN]), createTemplate);
export default router;
