import { pool } from '../../../db';
import bcrypt from 'bcrypt';

// 사용자 레코드 타입 (DB 컬럼 매핑)
export interface User {
  user_id: string;
  user_email: string;
  user_name: string;
  user_password: string;        // 해시된 비밀번호
  user_profile_image?: string;
  user_birth?: Date;
  user_gender?: 'M' | 'F';
  generate_time: Date;
  modified_time: Date;
  user_status: 'N' | 'D' | 'S' | 'F'; // 정상, 탈퇴, 휴면, 정지
  password_update?: Date;
  last_login_time?: Date;
}

// 이메일로 사용자 조회
export const findUserByEmail = async (email: string): Promise<User|undefined> => {
  const res = await pool.query(
    'SELECT * FROM users WHERE user_email = $1',
    [email]
  );
  return res.rows[0];
};

// bcrypt를 이용해 비밀번호 검증
export const verifyPassword = (plain: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(plain, hash);
};
