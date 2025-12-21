import { Request, Response } from 'express'
import authService from '../services/authService'
import { LoginRequestDTO, LoginResponseDTO } from '../dto/loginDto'

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

    try {
        const accessToken = await authService.authenticate(email, password)
        const response: LoginResponseDTO = { accessToken }
        res.json(response)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'internal server error', error: true })
    }
}
