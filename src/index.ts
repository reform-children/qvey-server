import express from 'express'

dotenv.config()
import bookRoutes from './routes/bookRoutes';

import dotenv from 'dotenv'
import noticeRouter from './routes/noticeRouter'

dotenv.config()
const app = express()

const PORT = 5000

app.get("/", (req, res) => {
    res.send({message: "hello world"})
})

app.listen(PORT, () => {
    console.log(`[LOG] Server Open ${PORT} `)
})