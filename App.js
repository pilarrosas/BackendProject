import express from "express"
import productManager from "./productManager.js";
const manager=new productManager("./Prod.json")
const app=express()
const PORT=8080;

app.get("/products",async(req,res)=>{
    const {limit}=req.query
    const products= await manager.findProd()
    if(limit){
     const limitproducts=products.slice(0,limit)
     res.json({status:"SUCCESS",limitproducts})

    }
    else{
        res.json({status:"SUCCES",products})
    }
})

app.get("/products/:pid",async(req,res)=>{
   
    const {pid}=req.params

    const products= await manager.findProd()
    const productfind=products.find(elemento=>elemento.id===parseInt(pid))
    console.log(productfind)
    res.send({status:"SUCCESS",productfind})
})


app.listen(PORT,()=>{
    console.log("SERVER IS WORKING")
})