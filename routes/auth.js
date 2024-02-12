import { Router } from 'express';
import Joi from 'joi';

import authController from '../controllers/authController.js'

const router = Router();

router.post('/register', authController.createUser)
router.post('/login', authController.loginUser)

export default router;