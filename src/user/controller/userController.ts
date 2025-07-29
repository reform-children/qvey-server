/**
 * 유저 기능 컨트롤러
 */

import { Request, Response } from 'express'
import { RegisterUserRequestDTO, RegisterUserResponseDTO } from '../dto/userDTO'
import { GenderType, RegisterUser } from '../model/userModel'
import userService from '../service/userService'
function checkGender(gender?: string): gender is GenderType {
    return gender === 'M' || gender === 'F' || gender === 'O'
}
/** 회원가입 컨트롤러 */
export const register = async (req: Request, res: Response) => {
    const dto: RegisterUserRequestDTO = req.body
    const { name, email, password, birth, address, gender } = dto

    if (!name) throw new Error('name empty')
    if (!email) throw new Error('email empty')
    if (!password) throw new Error('password empty')
    if (!birth) throw new Error('birth empty')
    if (!address) throw new Error('address empty')
    if (!checkGender(gender)) throw new Error('gender error')

    const validated: RegisterUser = {
        ...dto,
        address,
        birth,
        email,
        gender,
        name,
        password,
    }

    const user = await userService.registUser(validated)

    const response: RegisterUserResponseDTO = {
        success: true,
    }

    res.send(response)
}
