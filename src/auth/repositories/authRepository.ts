import { pool } from '../../db';
import { User } from '../models/userModel';

/**
 * 이메일로 사용자 조회
 */
export async function findUserByEmail(email: string): Promise<User | null> {
  const { rows } = await pool.query<User>(
    `SELECT
       user_id, user_email, user_name, user_password,
       user_profile_image, user_birth, user_gender,
       generate_time, modified_time, user_status,
       password_update, last_login_time
     FROM users
     WHERE user_email = $1
    `,
    [email],
  );
  return rows[0] ?? null;
}