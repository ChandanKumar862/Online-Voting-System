import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import electionRoutes from "./routes/electionRoutes.js";
const app=express()

const corsOptions = {
  origin: 'http://localhost:5173/',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
dotenv.config()
app.use(express.json())
app.use(cors(corsOptions))


const data={
    name :"Chadan Dev",
    age : " 22",
    college : "IIIT Pune",
}
app.use("/api/elections", electionRoutes)

app.get("/",(req,res)=>{
    res.status("hello")
})
app.get("/profile",(req,res)=>{
    res.json(data)
})


app.listen(process.env.PORT,()=>{
    console.log("Backend is running")
})