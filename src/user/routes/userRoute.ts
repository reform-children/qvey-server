/**
 * 유저 기능 라우터
 */

import { Router } from 'express';

import { signupUser } from "../controller/userController" //절대경로로 변경예정

const router = Router();

/** 회원가입 라우터 */
router.post("/signup", signupUser)

export default router;