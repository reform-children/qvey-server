/**
 * 유저 기능 컨트롤러
 */

import { Request, Response } from "express"
import { registUser } from "../service/userService"

/** 회원가입 컨트롤러 */
export const signupUser = async (req: Request, res: Response) => {
    res.send({message: "회원가입"});

    const user = await registUser({});
}