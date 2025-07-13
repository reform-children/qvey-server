/**
 * 유저 모델(entity/ db칼럼과 1대1매칭)
 */

/** 유저 모델 */
export interface User {
    id: string;
    email: string;
    name: string;
    password: string;
    phoneNumber: string;
    created_at: Date;
}