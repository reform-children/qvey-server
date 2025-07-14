import { RequestHandler } from 'express';
import { LoginDto } from '../dto/login.dto';
import { TokenDto } from '../dto/token.dto';
import { authenticate, createToken } from '../services/authService';

/**
 * POST /api/v1/auth/login
 * - RequestBody: LoginDto
 * - ResponseBody: TokenDto 또는 { error: string }
 */
export const login: RequestHandler<{}, TokenDto | { error: string }, LoginDto> =
  async (req, res) => {
    const { email, password } = req.body;
    // 필수 입력 체크
    if (!email || !password) {
      res.status(400).json({ error: '이메일과 비밀번호를 모두 입력하세요.' });
      return;
    }
    try {
      // 인증 및 토큰 생성
      const user = await authenticate(email, password);
      const accessToken = createToken(user);
      res.json({ accessToken });
    } catch (err: any) {
      // 인증 실패 시 401 응답
      res.status(401).json({ error: err.message });
    }
};
