/**
 * 유저 기능 라우터
 */

import { Router } from 'express'

import { register } from '../controller/userController'

const router = Router()

/** 회원가입 컨트롤러 */
router.post('/register', register)

export default router
