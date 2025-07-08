import express from 'express'

const app = express()

const PORT = 5000

app.get("/", (req, res) => {
    res.send({message: "hello world"})
})

app.listen(PORT, () => {
    console.log(`[LOG] Server Open ${PORT} `)
})