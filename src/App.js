import express from "express"
import viewRouter from "../routes/view.routes.js"
import productRouter from "../routes/prod.routes.js"
import cartRouter from "../routes/cart.routes.js"
import {__dirname} from "./utils.js"
import handlebars from 'express-handlebars'
import { Server } from "socket.io"
import ProductManager from "../managers/productManager.js"

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

const prodManaSocket = new ProductManager(__dirname + "/files/Prod.json")
const socketServer = new Server(httpServer)

socketServer.on("connection", async (socket) => {
    console.log("CLIENT CONNECTED WHIT ID NUMBER:",socket.id);
    const products = await prodManaSocket.getProducts({})
    socketServer.emit("productos", products)

    
    socket.on("addProduct", async data => {
        await prodManaSocket.addProduct(data)
        const updatedProducts =await prodManaSocket.getProducts({});
        socketServer.emit("updateproducts", updatedProducts)
    })

    socket.on("deleteProduct", async (id) => {
        console.log("DELETED PRODUCT ID :", id);
        const deletedProduct = await prodManaSocket.deleteProduct(id);
        const updatedProducts = await prodManaSocket.getProducts({});
        socketServer.emit("productUpdate", updatedProducts);
      });
})
