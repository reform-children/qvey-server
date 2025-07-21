import { Router } from 'express';
import { login } from '../controllers/authController';

export const authRouter = Router();

// 로그인 엔드포인트
authRouter.post('/login', login);
