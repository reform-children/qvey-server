/**
 * 유틸 관련 파일(기능에 따라 분리 필요)
 */
import bcrypt from 'bcrypt'

/** 암호화 횟수 (성능에 따라 조정할 필요가 있음) */
const SALT_ROUND = 10

/** 비밀번호 암호화 */
export const passwordToHash = async (password: string): Promise<string> => {
    return bcrypt.hash(password, SALT_ROUND)
}

/** 비밀번호와 해시값 비교 */
export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
    return bcrypt.compare(password, hash)
}

export const validEmail = async (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        throw new Error('이메일 형식이 올바르지 않습니다.')
    }
}
