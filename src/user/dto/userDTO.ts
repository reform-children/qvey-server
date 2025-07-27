/**
 * 유저 DTO
 */

import { GenderType } from '../type/user'

/** 회원가입 요청 모델*/
export interface RegistUserRequestDTO {
    /**
     * Email
     */
    email?: string
    /**
     * 비밀번호
     */
    password?: string
    /**
     * 이름
     */
    name?: string
    /**
     * 전화번호
     */
    tell?: string
    /**
     * 생년월일
     */
    birth?: Date
    /**
     * 성별
     */
    gender?: string
    /**
     * 주소
     */
    address?: string
    /**
     * 상세 주소
     */
    addressDetail?: string
}

/** 회원가입 응답 모델 */
export interface RegisterUserResponseDTO {
    /** 응답 결과 */
    success: boolean
    /** 응답 메세지 */
    message: string
    data: {
        /** 회원 고유번호 */
        id: string
        /** 이메일 */
        email: string
        /** 이름 */
        name: string
        /** 가입 날짜 */
        created_at: Date
    }
}
