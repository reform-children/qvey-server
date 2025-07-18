import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import noticeRouter from './notice/routes/noticeRouter'
import bookRoutes from './routes/bookRoutes';
import userRouter from "./user/routes/userRoute"
import { authRouter } from './auth/routes/authRouter';
import { verifyToken } from './auth/middleware/authMiddleware';

// test.js
require('dotenv').config();
console.log(process.env.DB_HOST);

const app = express()

// 클라이언트가 보낸 JSON 데이터를 자동으로 파싱해서 req.body에 넣어줌
app.use(express.json())

const PORT = 3000

app.use('/api/v1/notice', noticeRouter)
app.use('/api/v1/book', bookRoutes)
app.use("/api/v1/user", userRouter)
// Auth API
app.use('/api/v1/auth', authRouter);

app.get("/", (req, res) => {
    res.send({message: "hello world"})
})

app.listen(PORT, () => {
    console.log(`[LOG] Server Open ${PORT} `)
})