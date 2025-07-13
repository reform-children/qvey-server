/**
 * 유저 기능 컨트롤러
 */

import { Request, Response } from "express"
import { registUser } from "../service/userService"
import { RegistUserRequestDTO } from "../dto/userDTO";

/** 회원가입 컨트롤러 */
export const signupUser = async (req: Request, res: Response) => {
    try{
        const userData: RegistUserRequestDTO = req.body;
        const user = await registUser(userData);
        res.status(201).json({
            success: true,
            message: "회원가입이 완료되었습니다.",
            data: user
        });
    }catch(error: any){
        res.status(400).json({
            success: false,
            message: error.message || "회원가입에 실패했습니다."
        });
    }
}