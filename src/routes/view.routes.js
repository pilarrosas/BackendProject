import { Router } from "express";
import ProductManager from "../dao/managers/productManager.js";

const Pm = new ProductManager("../files/Prod.json")
const routerV = Router()

routerV.get("/", async (req,res) => { 
        const listProd = await Pm.getProductsView()
        res.render("home", {listProd})
})

routerV.get("/realtimeproducts", async (req,res) => {
    res.render("realtimeproducts")
})

routerV.get("/chat",(req,res)=>{
    res.render("chat")
})

export default routerV