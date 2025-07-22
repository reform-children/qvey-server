/**
 * 유저 기능 컨트롤러
 */

import { Request, Response } from 'express'
import { registUser } from '../service/userService'
import { RegistUserRequestDTO } from '../dto/userDTO'
import { GenderType, RegistUser } from '../type/user'
function checkGender(gender?: string): gender is GenderType {
    return gender === 'M' || gender === 'F' || gender === 'O'
}
/** 회원가입 컨트롤러 */
export const signupUser = async (req: Request, res: Response) => {
    const dto: RegistUserRequestDTO = req.body
    const { name, email, password, birth, address, gender } = dto

    if (!name) throw new Error('name empty')
    if (!email) throw new Error('email empty')
    if (!password) throw new Error('password empty')
    if (!birth) throw new Error('birth empty')
    if (!address) throw new Error('address empty')
    if (!checkGender(gender)) throw new Error('gender error')

    const validated: RegistUser = {
        ...dto,
        address,
        birth,
        email,
        gender,
        name,
        password,
    }

    const user = await registUser(validated)

    res.status(201).json({
        success: true,
        message: '회원가입이 완료되었습니다.',
        data: user,
    })
}
