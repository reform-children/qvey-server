import express from 'express'
import dotenv from 'dotenv'
import noticeRouter from './routes/noticeRouter'

dotenv.config()
const app = express()
app.use(express.json())

const PORT = 3000
app.use('/api/v1/notice', noticeRouter)

app.get("/", (req, res) => {
    res.send({message: "hello world"})
})

app.listen(PORT, () => {
    console.log(`[LOG] Server Open ${PORT} `)
})
