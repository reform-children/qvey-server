import { User } from '../../user/model/userModel'
import { sign } from 'jsonwebtoken'
export function createToken(user: User): string {
    // Json Token Payload
    // 필요시 필드 추가 가능
    const payload = {
        id: user.id,
        email: user.email,
    }

    // jwt 토큰 생성 키
    const secret = process.env.SECRET_KEY

    if (!secret) {
        throw new Error('500 Secret Key null error')
    }

    const token = sign(payload, secret, {
        algorithm: 'HS256',
        expiresIn: 1000 * 60 * 30, // 30분 유효 시간
    })

    return token
}
