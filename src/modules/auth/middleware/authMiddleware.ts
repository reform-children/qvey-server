import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET!;

// JWT 페이로드 타입
interface JwtPayload {
  sub: string;    // user_id
  email: string;
  iat: number;
  exp: number;
}

/**
 * Authorization: Bearer <token>
 * - 토큰 유효성 검증
 * - req.user 에 { id, email } 부착
 */
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const h = req.headers.authorization;
  if (!h?.startsWith('Bearer ')) {
    res.status(401).json({ error: '토큰이 제공되지 않았습니다.' });
    return;
  }
  const token = h.split(' ')[1];
  try {
    const p = jwt.verify(token, JWT_SECRET) as JwtPayload;
    // 다음 핸들러에서 req.user 사용 가능
    (req as any).user = { id: p.sub, email: p.email };
    next();
  } catch {
    res.status(401).json({ error: '유효하지 않은 토큰입니다.' });
  }
};
