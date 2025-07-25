import { UserStatus } from '../model/userModel'
import { GenderType } from '../type/user'

export interface UserEntity {
    /**
     * Unique ID (UUID)
     */
    user_id: string
    /**
     * Email
     */
    user_email: string
    /**
     * 이름
     */
    user_name: string
    /**
     * 비밀번호 (암호화)
     */
    user_password: string
    /**
     * 프로필 Image
     */
    user_profile_image: string | null
    /**
     * 생년월일
     */
    user_birth: Date
    /**
     * 성별
     */
    user_gender: GenderType
    /**
     * 주소
     */
    user_address: string | null
    /**
     * 상세 주소
     */
    user_address_detail: string | null
    /**
     * 생성일
     */
    generate_time: Date
    /**
     * 수정일
     */
    modified_time: Date | null
    /**
     * 상태
     */
    user_status: UserStatus
    /**
     * 마지막 비밀번호 변경
     */
    password_update_time: string | null
    /**
     * 마지막 로그인
     */
    last_login_time: string | null
    /**
     * 전화번호
     */
    user_tell: string
}
