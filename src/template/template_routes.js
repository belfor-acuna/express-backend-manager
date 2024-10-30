import express from 'express';
const router = express.Router();
import authMiddleware from '../auth/middleware/auth_middleware.js';
import roleMiddleware from '../user/middleware/role_middleware.js';
import UserRoles from '../user/enum/user_roles.js';
import { createTemplate, getTemplates,deleteTemplate } from './template_controller.js';

router.post('/new', authMiddleware, roleMiddleware([UserRoles.ADMIN]), createTemplate);
router.get('/all',authMiddleware,roleMiddleware([UserRoles.ADMIN,UserRoles.USER]), getTemplates);
router.delete('/delete/:id', authMiddleware, roleMiddleware([UserRoles.ADMIN]), deleteTemplate);

export default router;
