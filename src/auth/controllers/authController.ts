import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/authService';

/**
 * POST /api/v1/auth/login
 * - RequestBody: LoginDto
 * - ResponseBody: TokenDto 또는 { error: string }
 */
export async function login(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: '이메일과 비밀번호를 모두 입력하세요.' });
    }

    const user = await authService.authenticate(email, password);
    const token = authService.createToken(user);
    res.json({ token });
  } catch (err: any) {
    next(err);
  }
}