import { StringValue } from 'ms'
import { Authenticate } from '../model/authModel'
import userService from '../../user/service/userService'
import { createAccessToken } from '../util/authUtil'
import { comparePassword } from '../../user/utils/utils'

/**
 * 사용자 인증 처리
 */
export const authenticate = async (email: string, password: string): Promise<Authenticate> => {
    return new Promise((resolve, reject) => {
        userService
            .getUserByEmail(email)
            .then(async (user) => {
                const status = await comparePassword(password, user.password)
                if (!status) {
                    reject(new Error('비밀번호가 잘못 되었습니다.'))
                }
                const accessToken = createAccessToken(user)
                resolve({ accessToken })
            })
            .catch((error) => {
                console.warn(error)
                reject(new Error('invalid Email'))
            })
    })
}

export default { authenticate }
