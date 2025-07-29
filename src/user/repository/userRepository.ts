/**
 * 유저 기능 리포지토리
 */

import { getPool, pool } from '../../db'
import { UserEntity } from '../entity/userEntity'
import { RegisterUser, User } from '../model/userModel'
import { registUser } from '../service/userService'

function toUser(entity: UserEntity): User {
    return {
        id: entity.user_id,
        email: entity.user_email,
        name: entity.user_name,
        birth: entity.user_birth,
        gender: entity.user_gender,
        address: entity.user_address,
        addressDetail: entity.user_address_detail,
        tell: entity.user_tell,
        status: entity.user_status,
        password: entity.user_password,
        passwordUpdateTime: entity.password_update_time,
        profileImage: entity.user_profile_image,
        lastLoginTime: entity.last_login_time,
        generateTime: entity.generate_time,
        modifiedTime: entity.modified_time,
    }
}

/** 이메일로 사용자 이메일을 조회한다(이메일 중복 체크) */
export const getUserEmailByEmail = async (email: string) => {
    const query = `SELECT email FROM users WHERE email = $1`
    const result = await pool.query(query, [email])
    return result.rows[0]
}

/** 사용자 정보를 삽입한다(회원가입) */
export const save = async (data: RegisterUser): Promise<void> => {
    const { name, email, password, tell, address, addressDetail, birth, gender } = data
    const pool = getPool()
    const query = `
    INSERT INTO users (
        user_email,
        user_name,
        user_password,
        user_birth,
        user_gender,
        user_address,
        user_address_detail,
        user_status,
        user_tell
        ) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9 );
    `
    await pool.query(query, [email, name, password, birth, gender, address, addressDetail, 'N', tell])
}

export const findUserByEmail = async (email: string): Promise<User | undefined> => {
    const query = `
        SELECT
            user_id,
            user_email,
            user_name,
            user_password,
            user_profile_image,
            user_birth,
            user_gender,
            user_address,
            user_address_detail,
            user_tell,
            user_status,
            password_update_time,
            last_login_time,
            generate_time,
            modified_time
        FROM users
        WHERE user_email = $1
    `
    const pool = getPool()
    const result = await pool.query<UserEntity>(query, [email])
    return result.rows[0] ? toUser(result.rows[0]) : undefined
}

export default { getUserEmailByEmail, findUserByEmail, save }
