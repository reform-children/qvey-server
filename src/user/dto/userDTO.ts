/**
 * 유저 DTO
 */

import { RegisterUser, User } from '../model/userModel'

/** 회원가입 요청 모델*/
export interface RegisterUserRequestDTO extends RegisterUser {}

/** 회원가입 응답 모델 */
export interface RegisterUserResponseDTO {
    /** 응답 결과 */
    success: boolean
}
