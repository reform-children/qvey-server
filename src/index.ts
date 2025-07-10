import express from 'express'
import bookRoutes from './routes/book.routes';

const app = express()

// 클라이언트가 보낸 JSON 데이터를 자동으로 파싱해서 req.body에 넣어줌
app.use(express.json());

app.use('/api/v1/book', bookRoutes);

const PORT = 3000

app.listen(PORT, () => {
    console.log(`[LOG] Server Open ${PORT} `)
})