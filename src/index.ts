import express from 'express'
import userRouter from "./user/routes/userRoute"

const app = express()

const PORT = 5000

app.get("/", (req, res) => {
    res.send({message: "hello world"})
})

app.use("/user", userRouter)

app.listen(PORT, () => {
    console.log(`[LOG] Server Open ${PORT} `)
})