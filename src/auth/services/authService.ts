import { getUserByEmail } from '../../user/service/userService'
import { createToken } from '../../util/JWT'

/**
 *
 * @param email 요청 이메일 주소
 * @param password 요청 페스 워드
 * @returns
 * @throws email 에 맞는 사용자 조회 못 하였을 경우
 */
export const authenticate = async (email: string, password: string): Promise<string> => {
    const user = await getUserByEmail(email)

    if (user.password !== password) {
        throw new Error('비밀번호가 일치 하지 않습니다.')
    }
    const accessToken = createToken(user)
    return accessToken
}

export default { authenticate }
