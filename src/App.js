import express from "express"
import productRouter from "../routes/prod.routes.js"
import cartRouter from "../routes/cart.routes.js"
const app=express()
const PORT=8080;

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.Router())
app.use("/api",productRouter)
app.use("/api",cartRouter)



app.listen(PORT,()=>{
    console.log("server is working")
})