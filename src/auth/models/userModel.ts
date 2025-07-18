import { pool } from '../../db'
import bcrypt from 'bcrypt'; // bcrypt 해시 비교


/** 개발 모드(true)일 때는 평문 비교, 아닐 땐 bcrypt.compare */
const IS_DEV = process.env.DEV_MODE === 'true';

/** 사용자 상태 코드 상수 */
export const USER_STATUS = {
  NORMAL:  'N',  // 정상
  DELETE:  'D',  // 탈퇴
  SUSPEND: 'S',  // 휴면
  FORBID:  'F',  // 정지
} as const;

/** USER_STATUS 값의 유니언 타입 */
export type UserStatus = typeof USER_STATUS[keyof typeof USER_STATUS];

/** users 테이블 컬럼과 1:1 매핑되는 인터페이스 */
export interface User {
  user_id:        string;
  user_email:     string;
  user_name?:     string;
  user_password:  string;        // 평문 or 해시
  user_profile_image?: string;
  user_birth?:    Date;
  user_gender?:   'M' | 'F';
  generate_time:  Date;
  modified_time:  Date;
  user_status:    UserStatus;
  password_update?: Date;
  last_login_time?: Date;
}

/**
 * 비밀번호 검증
 * - 운영 모드: bcrypt 해시 비교
 * - 개발 모드(DEV_MODE=true): 평문 === DB에 저장된 값 직접 비교
 */
export async function verifyPassword(
  plain: string,
  hash: string
): Promise<boolean> {
  if (IS_DEV) {
    // 개발 편의용: DB에 평문을 저장해 두고 바로 비교
    return plain === hash;
  }
  // 운영용: bcrypt 해시 비교
  return bcrypt.compare(plain, hash);
}
