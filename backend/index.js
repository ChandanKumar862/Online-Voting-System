import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

const app=express()
dotenv.config()
app.use(express.json())
const data={
    name :"Chadan Dev",
    age : " 22",
    college : "IIIT Pune",
}
app.use(cors())
app.get("/",(req,res)=>{
    res.status("hello")
})
app.get("/profile",(req,res)=>{
    res.json(data)
})


app.listen(process.env.PORT,()=>{
    console.log("Backend is running")
})