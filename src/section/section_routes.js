import express from 'express';
const router = express.Router();
import authMiddleware from '../auth/middleware/auth_middleware.js';
import roleMiddleware from '../user/middleware/role_middleware.js';
import UserRoles from '../user/enum/user_roles.js';
import {updateSectionContent, updateSectionStatus} from './section_controller.js'
router.patch('/save',authMiddleware, roleMiddleware([UserRoles.ADMIN,UserRoles.USER]), updateSectionContent);
router.patch('/status', authMiddleware, roleMiddleware([UserRoles.ADMIN,UserRoles.USER]), updateSectionStatus)
export default router;
