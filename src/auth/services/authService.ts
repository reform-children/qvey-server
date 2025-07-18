import jwt from 'jsonwebtoken'
import { StringValue } from 'ms'
import { findUserByEmail } from '../repositories/authRepository'
import { verifyPassword, User } from '../models/userModel'

const JWT_SECRET     = process.env.JWT_SECRET!;     // string
const RAW_EXPIRES_IN = process.env.JWT_EXPIRES_IN!; // string

// ② string → ms.StringValue 로 단언
const JWT_EXPIRES_IN = RAW_EXPIRES_IN as StringValue;

// (Optional) 비어 있는 env 체크
// if (!JWT_SECRET) throw new Error('JWT_SECRET 설정 필요');
// if (!RAW_EXPIRES_IN) throw new Error('JWT_EXPIRES_IN 설정 필요');

/**
 * 사용자 인증 처리
 */
export async function authenticate(  email: string,
  password: string): Promise<User> {
  const user = await findUserByEmail(email)
  if (!user) throw Object.assign(new Error('등록된 사용자가 아닙니다.'), {status: 401})
  if (user.user_status !== 'N') throw new Error('사용할 수 없는 사용자입니다.')
  const ok = await verifyPassword(password, user.user_password)
  if (!ok) throw Object.assign(new Error('비밀번호가 일치하지 않습니다.'), {status: 403})
  return user
}

/**
 * JWT Access Token 생성
 * - expiresIn에 ms가 지원하는 문자열(StringValue) 사용
 * - 내부적으로 ms('1h') → 3600000ms 로 처리되어 jwt-sign에 전달됨
 */
export function createToken(user: User): string {
  return jwt.sign(
    { sub: user.user_id, email: user.user_email },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}
