/**
 * 유저 기능 서비스
 */

import { RegistUserRequestDTO, RegisterUserResponseDTO } from "../dto/userDTO";
import { getUserEmailByEmail, insertUser } from "../repository/userRepository";
import { passwordToHash } from "../utils/utils";

/** 회원가입 서비스 */
export const registUser = async (data: RegistUserRequestDTO): Promise<RegisterUserResponseDTO> => {
    const {email, password, name} = data;

    if(!name){
        throw new Error("이름은 필수입니다.")
    }

    if(!password){
        throw new Error("비밀번호는 필수입니다.");
    }

    await validEmail(email);

    const hashedPassword = await passwordToHash(data.password);

    const reqData: RegistUserRequestDTO = {
        ...data,
        password: hashedPassword
    }

    return await insertUser(reqData);
}

const validEmail = async (email: string) => {
    if(!email){
        throw new Error("이메일은 필수입니다.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
        throw new Error("이메일 형식이 올바르지 않습니다.");
    }

    const existEmailChk: string = await getUserEmailByEmail(email);
    if(existEmailChk){
        throw new Error("이미 사용중인 이메일입니다.");
    }
}