import jwt from 'jsonwebtoken'
import { StringValue } from 'ms'
import { findUserByEmail } from '../repositories/authRepository'
import { verifyPassword, User } from '../../user/model/userModel'
import { Authenticate } from '../model/authModel'
import userService from '../../user/service/userService'
import { createAccessToken } from '../util/authUtil'

const JWT_SECRET = process.env.JWT_SECRET! // string
const RAW_EXPIRES_IN = process.env.JWT_EXPIRES_IN! // string

// ② string → ms.StringValue 로 단언
const JWT_EXPIRES_IN = RAW_EXPIRES_IN as StringValue

// (Optional) 비어 있는 env 체크
// if (!JWT_SECRET) throw new Error('JWT_SECRET 설정 필요');
// if (!RAW_EXPIRES_IN) throw new Error('JWT_EXPIRES_IN 설정 필요');

/**
 * 사용자 인증 처리
 */
export const authenticate = async (email: string, password: string): Promise<Authenticate> => {
    const user = await userService.getUserByEmail(email)

    // 임시 암호 평문 비교
    if (user.password !== password) {
        throw new Error('잘못된 비밀 번호')
    }

    const accessToken = createAccessToken(user)

    return { accessToken }
}

export default { authenticate }
