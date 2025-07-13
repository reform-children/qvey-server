/**
 * 유틸 관련 파일(기능에 따라 분리 필요)
 */

import bcrypt from "bcrypt"

/** 비밀번호 암호화 */
export const passwordToHash = async (password: string) => {
    /** 암호화 횟수 (성능에 따라 조정할 필요가 있음) */
    const SALT_ROUND = 10;

    return await bcrypt.hash(password, SALT_ROUND);
}