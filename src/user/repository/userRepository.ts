/** 
 * 유저 기능 리포지토리 
 */

import { pool } from "../../db";
import { RegisterUserResponseDTO, RegistUserRequestDTO } from "../dto/userDTO";

/** 이메일로 사용자 이메일을 조회한다(이메일 중복 체크) */
export const getUserEmailByEmail = async (email: string) => {
    const query = `SELECT email FROM users WHERE email = $1`;
    const result =  await pool.query(query, [email]);
    return result.rows[0];
}

/** 사용자 정보를 삽입한다(회원가입) */
export const insertUser = async (reqData: RegistUserRequestDTO): Promise<RegisterUserResponseDTO> => {
    const {name, email, password, phoneNumber} = reqData;
    const query = `INSERT INTO users (name, email, password, phoneNumber)
                    VALUES ($1, $2, $3, $4)
                    RETURNING id, email, name, created_at`;
    
    const result = await pool.query(query, [name, email, password, phoneNumber ?? null]);
    return result.rows[0];
}