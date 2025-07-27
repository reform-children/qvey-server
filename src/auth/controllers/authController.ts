import { Request, Response } from 'express'
import { LoginRequestDTO, LoginResponseDTO } from '../dto/loginDTO'
import authService from '../services/authService'

/**
 * POST /api/v1/auth/login
 * - RequestBody: LoginDto
 * - ResponseBody: TokenDto 또는 { error: string }
 */
export async function login(req: Request, res: Response) {
    const { email, password }: LoginRequestDTO = req.body
    if (!email || !password) {
        throw new Error('이메일과 비밀번호를 모두 입력하세요.')
    }
    const { accessToken } = await authService.authenticate(email, password)
    const response: LoginResponseDTO = { accessToken }
    res.json(response)
}
