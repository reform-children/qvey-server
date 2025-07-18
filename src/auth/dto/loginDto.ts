/**
 * 로그인 요청 모델
 */
export interface LoginDto {
  /** 사용자 이메일 */
  email: string;
  /** 사용자 비밀번호 */
  password: string;
}