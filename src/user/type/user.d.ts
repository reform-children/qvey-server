import { RegistUserRequestDTO } from '../dto/userDTO'

/**
 * - `M` 남자
 * - `F` 여자
 * - `O` 기타
 */
export type GenderType = 'M' | 'F' | 'O'
/**
 * User 상태
 * - `N` : 일반
 * - `S` : 정지
 */
export type UserState = 'N' | 'S'

export interface User {
    uuid: string
    email: string
    name: string
    password: string
    profileImage: string | null
    birth: Date
    gender: GenderType
    address: string
    addressDetail: string | null
    tell: string | null
    generateTime: Date
    modifiedTime: Date | null
    status: UserState
    passwordUpdateTime: string
}
// 회원가입 시 필수 입력 필드들
type RequiredUserFields = Pick<User, 'email' | 'name' | 'password' | 'birth' | 'gender' | 'address'>

// 회원가입 시 선택적으로 입력할 수 있는 필드들
type OptionalUserFields = Pick<User, 'tell' | 'profileImage' | 'addressDetail'>

// 회원가입 시 시스템에서 자동 생성되는 필드들 (사용자 입력 불가)
type SystemGeneratedFields = 'uuid' | 'generateTime' | 'modifiedTime' | 'status' | 'passwordUpdateTime'

type ExcludeNull<T> = T extends null ? never : T
// 회원가입용 인터페이스: 필수 필드 + 선택적 필드
export interface RegistUser
    extends RequiredUserFields,
        Partial<{ [K in keyof OptionalUserFields]: ExcludeNull<OptionalUserFields[K]> }> {}
