// src/modules/auth/models/userModel.ts

import { pool } from '../../db/index';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const IS_DEV = process.env.DEV_MODE === 'true';

/**
 * 사용자 레코드 타입 (DB 컬럼과 1:1 매핑)
 */
export interface User {
  user_id:         string;
  user_email:      string;
  user_name:       string;
  user_password:   string;        // 개발 중엔 평문 또는 운영 중엔 bcrypt 해시
  user_profile_image?: string;
  user_birth?:       Date;
  user_gender?:      'M' | 'F';
  generate_time:     Date;
  modified_time:     Date;
  user_status:       'N' | 'D' | 'S' | 'F';
  password_update?:  Date;
  last_login_time?:  Date;
}

/**
 * 이메일로 사용자 조회
 */
export const findUserByEmail = async (
  email: string
): Promise<User|undefined> => {
  const res = await pool.query(
    `SELECT * FROM users WHERE user_email = $1`,
    [email]
  );
  return res.rows[0];
};

/**
 * 비밀번호 검증
 * - DEV_MODE=true 일 때만 평문 비교
 * - 그 외에는 bcrypt 해시 비교
 */
export const verifyPassword = async (
  plain: string,
  hash: string
): Promise<boolean> => {
  if (IS_DEV) {
    // 개발 모드: DB에 평문을 넣어두고 바로 비교
    return plain === hash;
  }
  // 운영 모드: bcrypt 해시 비교
  return bcrypt.compare(plain, hash);
};
