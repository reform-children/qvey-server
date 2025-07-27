import { Router } from 'express'
import { login } from '../controllers/authController'

const router = Router()

// 로그인 엔드포인트
router.post('/login', login)

export default router
