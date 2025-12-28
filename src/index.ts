import dotenv from 'dotenv'
import express from 'express'
import noticeRouter from './notice/routes/noticeRouter'
import userRouter from './user/routes/userRoute'
import authRouter from './auth/routes/authRouter'
import boardRouter from './board/router/boardRouter'
import cors from 'cors'
import questionRoutes from './question/routes/questionRoutes'
import { errorHandler } from './core/middleware/errorHandler'
import path from 'path'

const profile = process.env.PROFILE
dotenv.config({ path: path.join(__dirname, '../', 'env', `.env.${profile}`) })

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 3000

app.use(
    cors({
        origin: 'http://localhost:5173',
    })
)

app.use('/api/v1/notice', noticeRouter)
// app.use('/api/v1/book', bookRouter)
app.use('/api/v1/question', questionRoutes)
app.use('/api/v1/user', userRouter)
// Auth API
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/board', boardRouter)

app.get('/', (req, res) => {
    res.send({ message: `Qvey API Server Profile ${process.env.DESCRIPTION}` })
})

app.use(errorHandler)

app.listen(PORT, () => {
    const msg = `[LOG] Server Open ${PORT}! PROFILE -> ${profile}`
    console.log(msg)
})
