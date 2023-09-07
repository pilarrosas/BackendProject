import express from "express"
import handlebars from "express-handlebars"
import { Server } from "socket.io";
import connectToDB from "../src/config/dbConfig.js"
import { __dirname } from "./utils.js"
import routerP from "./routes/prod.routes.js"
import routerC from "./routes/cart.routes.js";
import routerV from "./routes/view.routes.js"
import socketProducts from "./listeners/socketProd.js"
import socketChat from "./listeners/socketMsg.js"

const app=express()
const PORT=8080;

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + "/public"))

app.engine("handlebars", handlebars.engine())
app.set("views", __dirname +  "/views")
app.set("view engine", "handlebars")

app.use("/api/products",routerP)
app.use("/api/cart",routerC)
app.use("/",routerV)

connectToDB()

const httpServer = app.listen(PORT,()=>{
    try {
        console.log(`SERVER IS WORKING ${PORT}\nAcceder a:`);
        console.log(`\t1). http://localhost:${PORT}/api/products`)
        console.log(`\t2). http://localhost:${PORT}/api/carts`);
    }
    catch (err) {
        console.log(err);
    }
})

const socketServer = new Server(httpServer)

socketProducts(socketServer)
socketChat(socketServer)
