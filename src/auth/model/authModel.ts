import { User } from '../../user/model/userModel'

export interface Authenticate {
    accessToken: string
}
export interface AccessTokenPayload extends Pick<User, 'id' | 'email'> {}
