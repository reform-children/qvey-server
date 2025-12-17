/**
 * 로그인 요청 모델
 */
export interface LoginRequestDTO {
    email?: string
    password?: string
}

/**
 * 로그인 응답 모델
 */
export interface LoginResponseDTO {
    accessToken: string
}
