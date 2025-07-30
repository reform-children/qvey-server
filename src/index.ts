import dotenv from 'dotenv'
import express from 'express'
import noticeRouter from './notice/routes/noticeRouter'
import userRouter from './user/routes/userRoute'
import bookRouter from './book/router/bookRouter'
import authRouter from './auth/routes/authRouter'
import boardRouter from './board/router/boardRouter'
import { verifyToken } from './auth/middleware/authMiddleware'
import questionRoutes from "./question/routes/questionRoutes"

dotenv.config()
const app = express()

// 클라이언트가 보낸 JSON 데이터를 자동으로 파싱해서 req.body에 넣어줌
app.use(express.json())

const PORT = 3000

app.use('/api/v1/notice', noticeRouter)
app.use('/api/v1/book', bookRouter)
app.use("/api/v1/question", questionRoutes);
app.use('/api/v1/user', userRouter)
// Auth API
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/board', boardRouter)

app.get('/', (req, res) => {
    res.send({ message: 'hello world' })
})

app.listen(PORT, () => {
    console.log(`[LOG] Server Open ${PORT} `)
})
