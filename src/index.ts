import express from 'express'

import bookRoutes from './routes/bookRoutes';

import dotenv from 'dotenv'
import noticeRouter from './routes/noticeRouter'

dotenv.config()
const app = express()
app.use(express.json())


// 클라이언트가 보낸 JSON 데이터를 자동으로 파싱해서 req.body에 넣어줌
app.use(express.json());

const PORT = 3000
app.use('/api/v1/notice', noticeRouter)

app.use('/api/v1/book', bookRoutes);

app.get("/", (req, res) => {
    res.send({message: "hello world"})
})

app.listen(PORT, () => {
    console.log(`[LOG] Server Open ${PORT} `)
})
