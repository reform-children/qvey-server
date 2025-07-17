import jwt, { SignOptions } from 'jsonwebtoken';
import ms, { StringValue } from 'ms';
import dotenv from 'dotenv';
import { findUserByEmail, verifyPassword, User } from '../models/userModel';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;

/**
 * 환경변수로 받은 만료시간 문자열을 ms.StringValue 타입으로 변환
 * 예: '1h', '30m', '2d' 등 ms가 지원하는 포맷
 */
const JWT_EXPIRES: StringValue = process.env.JWT_EXPIRES_IN as StringValue;

/**
 * 사용자 인증 처리
 */
export async function authenticate(email: string, password: string): Promise<User> {
  const user = await findUserByEmail(email);
  if (!user) throw new Error('등록된 사용자가 아닙니다.');
  if (user.user_status !== 'N') throw new Error('사용할 수 없는 사용자입니다.');
  const ok = await verifyPassword(password, user.user_password);
  if (!ok) throw new Error('비밀번호가 일치하지 않습니다.');
  return user;
}

/**
 * JWT Access Token 생성
 * - expiresIn에 ms가 지원하는 문자열(StringValue) 사용
 * - 내부적으로 ms('1h') → 3600000ms 로 처리되어 jwt-sign에 전달됨
 */
export function createToken(user: User): string {
  const payload = {
    sub:   user.user_id,
    email: user.user_email,
  };

  // SignOptions 에 expiresIn 을 ms.StringValue 로 명시
  const options: SignOptions = {
    expiresIn: JWT_EXPIRES,
  };

  return jwt.sign(payload, JWT_SECRET, options);
}
