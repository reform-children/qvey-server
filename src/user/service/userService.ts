/**
 * 유저 기능 서비스
 */

import { RegisterUser } from '../model/userModel'
import userRepository from '../repository/userRepository'
import { passwordToHash, validEmail } from '../utils/utils'

/** 회원가입 서비스 */
export const registUser = async (data: RegisterUser): Promise<void> => {
    const { email, password } = data
    /**
     * 이메일 검사
     */
    await validEmail(email)

    /**
     * 중복 검사
     */
    const _user = await userRepository.findUserByEmail(email)
    if (_user) throw new Error('사용 할 수 없는 Email 입니다.')

    const hashedPassword = await passwordToHash(password)

    await userRepository.save({ ...data, password: hashedPassword })
}

export default {
    registUser,
}
