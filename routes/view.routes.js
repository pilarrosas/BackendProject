import { Router } from "express";
import ProductManager from "../managers/productManager.js";
import { __dirname } from "../utils.js";

const prodManager = new ProductManager("../files/Prod.json")
const router = Router()

router.get("/", async (req,res) => {
    try {
        const listProd = await prodManager.getProducts({})
        res.render("home", {listProd})
        console.log(listProd);
    } catch (error) {
        console.error("CANNOT GET PRODUCT LIST");
    }
})

router.get("/realtimeproducts", async (req,res) => {
    const listProd = await prodManager.getProducts({})
    res.render("realtimeproducts")
})

export default router