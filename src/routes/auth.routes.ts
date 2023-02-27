import express from 'express';
import {
  changePasswordHandler,
  loginUserHandler,
  logoutHandler,
  refreshAccessTokenHandler,
  registerUserHandler,
} from '../controllers/auth.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { validate } from '../middleware/validate';
import { changePasswordSchema, createUserSchema, loginUserSchema } from '../schemas/user.schema';

const router = express.Router();

// Register user
router.post('/register', validate(createUserSchema), registerUserHandler);

// Login user
router.post('/login', validate(loginUserSchema), loginUserHandler);

// ChangePassword
router.put('/changepassword', validate(changePasswordSchema), deserializeUser, requireUser, changePasswordHandler);

// Logout user
router.get('/logout', deserializeUser, requireUser, logoutHandler);

// Refresh access token
router.get('/refresh', refreshAccessTokenHandler);

export default router;

