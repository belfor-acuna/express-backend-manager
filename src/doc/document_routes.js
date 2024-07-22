import express from 'express';
const router = express.Router();
import authMiddleware from '../auth/middleware/auth_middleware.js';
import roleMiddleware from '../user/middleware/role_middleware.js';
import UserRoles from '../user/enum/user_roles.js';
import { createdoc,getMyDocs, getDocById  } from './document_controller.js';

router.post('/new',authMiddleware, roleMiddleware([UserRoles.ADMIN,UserRoles.USER]), createdoc);
router.get('/all',authMiddleware,roleMiddleware([UserRoles.ADMIN,UserRoles.USER]), getMyDocs);
router.get('/one',authMiddleware,roleMiddleware([UserRoles.ADMIN,UserRoles.USER]), getDocById);
export default router;
