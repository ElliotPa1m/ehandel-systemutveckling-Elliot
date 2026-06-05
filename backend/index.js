import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Ansluten till MongoDB"))
    .catch((err) => console.log(err))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Servern körs på port ${PORT}`)
})