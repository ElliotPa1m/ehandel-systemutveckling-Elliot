import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient, Db } from "mongodb";
import dns from "node:dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

console.log(process.env.MONGO_URI)

const client = new MongoClient(process.env.MONGO_URI) 

async function startServer() {
// let connection =  await client.connect()
  console.log("Ansluten till MongoDB")
// connection.db("mystore").collection("orders").insertOne({email:""})
  app.listen(PORT, () => {
    console.log(`Servern körs på port ${PORT}`)
  })
}

startServer()
