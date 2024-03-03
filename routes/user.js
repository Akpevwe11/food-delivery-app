import { Router } from 'express';
import userController from '../controllers/userController.js'
import verifyAndAuthorization from '../middleware/verifyToken.js'
const router = Router();

router.get('/', verifyAndAuthorization, userController.getUser)

router.delete('/', verifyAndAuthorization, userController.deleteUser)

router.put('/', verifyAndAuthorization, userController.updateUser)

export default router;