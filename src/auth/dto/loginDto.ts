import { User } from '../../user/model/userModel'

/**
 * 로그인 요청 모델
 */
export interface LoginRequestDTO extends Partial<Pick<User, 'email' | 'password'>> {}

/**
 * 로그인 응답 모델
 */
export interface LoginResponseDTO {
    accessToken: string
}
