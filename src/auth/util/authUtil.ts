import { sign } from 'jsonwebtoken'
import { AccessTokenPayload } from '../model/authModel'
export const createAccessToken = (user: AccessTokenPayload): string => {
    const secret = process.env.JWT_SECRET
    if (!secret) throw new Error('JWT environment error')

    // TODO : env File 활용
    const tokkenTime = 1000 * 60 * 60 // 1 시간
    return sign({ id: user.id, email: user.email }, secret, { expiresIn: tokkenTime })
}
