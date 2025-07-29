import { pool } from '../../db'
import bcrypt from 'bcrypt' // bcrypt 해시 비교

/** 개발 모드(true)일 때는 평문 비교, 아닐 땐 bcrypt.compare */
const IS_DEV = process.env.DEV_MODE === 'true'

/** 사용자 상태 코드 상수 */
export const USER_STATUS = {
    /**
     * 정상
     */
    NORMAL: 'N',
    /**
     * 탈퇴
     */
    DELETE: 'D',
    /**
     * 휴면
     */
    SUSPEND: 'S',
    /**
     * 정지
     */
    FORBID: 'F',
}

/**
 * User 상태
 * - `N` : 정상
 * - `S` : 휴면
 * - `D` : 탈퇴
 * - `F` : 정지
 */
export type UserStatus = 'N' | 'S' | 'D' | 'F'

/**
 * User Models
 */
export interface User {
    /**
     * Unique ID (UUID)
     */
    id: string
    /**
     * Email
     */
    email: string
    /**
     * 이름
     */
    name: string
    /**
     * 비밀번호 (암호화)
     */
    password: string
    /**
     * 프로필 Image
     */
    profileImage: string | null
    /**
     * 생년월일
     */
    birth: Date
    /**
     * 성별
     */
    gender: GenderType
    /**
     * 주소
     */
    address: string | null
    /**
     * 상세 주소
     */
    addressDetail: string | null
    /**
     * 생성일
     */
    generateTime: Date
    /**
     * 수정일
     */
    modifiedTime: Date | null
    /**
     * 상태
     */
    status: UserStatus
    /**
     * 마지막 비밀번호 변경
     */
    passwordUpdateTime: string | null
    /**
     * 마지막 로그인
     */
    lastLoginTime: string | null
    /**
     * 전화번호
     */
    tell: string | null
}

export type RegisterUser = Pick<
    User,
    'address' | 'addressDetail' | 'birth' | 'email' | 'gender' | 'name' | 'password' | 'tell'
>

/**
 * - `M` 남자
 * - `F` 여자
 * - `O` 기타
 */
export type GenderType = 'M' | 'F' | 'O'
export const GENDER: Record<'MALE' | 'FEMALE' | 'OTHER', GenderType> = {
    /**
     * 남자
     */
    MALE: 'M',
    /**
     * 여자
     */
    FEMALE: 'F',
    /**
     * 기타
     */
    OTHER: 'O',
}

/**
 * 비밀번호 검증
 * - 운영 모드: bcrypt 해시 비교
 * - 개발 모드(DEV_MODE=true): 평문 === DB에 저장된 값 직접 비교
 */
export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
    if (IS_DEV) {
        // 개발 편의용: DB에 평문을 저장해 두고 바로 비교
        return plain === hash
    }
    // 운영용: bcrypt 해시 비교
    return bcrypt.compare(plain, hash)
}
