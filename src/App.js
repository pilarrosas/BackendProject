import express from "express"
import viewRouter from "../routes/view.routes.js"
import productRouter from "../routes/prod.routes.js"
import cartRouter from "../routes/cart.routes.js"
import {__dirname} from "./utils.js"
import handlebars from 'express-handlebars'
import { Server } from "socket.io"

const app=express()
const PORT=8080;

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + "/public"))

app.engine("handlebars", handlebars.engine())
app.set("views", __dirname +  "/views")
app.set("view engine", "handlebars")

app.use("/api",productRouter)
app.use("/api",cartRouter)
app.use("/",viewRouter)

const httpServer = app.listen(PORT,()=>{
    console.log("SERVER SI WORKING")
})

const socketServer = new Server(httpServer)
socketServer.on("connection", (socket) => {
    console.log("CLIENT CONNECTED WHIT ID NUMBER:",socket.id);
})