import ProductManager from "../dao/managers/productManager.js";
const Pm = new ProductManager()

const socketProducts = (socketServer) => {
    socketServer.on("connection",async(socket)=>{
        console.log("client connected con ID:",socket.id)
         const listadeproductos=await pm.getProductsView()
        socketServer.emit("enviodeproducts",listadeproductos)
    
        socket.on("addProduct",async(obj)=>{
        await Pm.addProduct(obj)
        const listadeproductos=await Pm.getProductsView()
        socketServer.emit("enviodeproducts",listadeproductos)
        })
    
        socket.on("deleteProduct",async(id)=>{
            console.log(id)
           await Pm.deleteProduct(id)
            const listadeproductos=await Pm.getProductsView()
            socketServer.emit("enviodeproducts",listadeproductos)
            })
    
    
    
            socket.on("nuevousuario",(usuario)=>{
                console.log("usuario" ,usuario)
                socket.broadcast.emit("broadcast",usuario)
               })
               socket.on("disconnect",()=>{
                   console.log(`Usuario con ID : ${socket.id} esta desconectado `)
               })
           
            
    })
};

export default socketProducts