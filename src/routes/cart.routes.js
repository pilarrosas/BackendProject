import { Router } from "express"
import CartManager from "../dao/managers/cartManager.js"
import ProductManager from "../dao/managers/productManager.js"
const routerC = Router()

const Cm = new CartManager
const Pm = new ProductManager

routerC.get("/", async (req, res) => {
    const cart = await Cm.getCarts()
    res.json({ cart })

})

routerC.get("/:cid", async (req, res) => {
    const { cid } = req.params
    const cartFound = await Cm.getCartById(cid)
    res.send({ status: "success", cartFound })
})

routerC.post('/', async (req, res) => {
    try {
        const { obj } = req.body;
        if (!Array.isArray(obj)) {
            return res.status(400).send('INVALID REQUEST: PRODUCT MUST BE AN ARRAY');
        }
        const validProducts = [];
        for (const product of obj) {
            const checkId = await Pm.getProductById(product._id);
            if (checkId === null) {
                return res.status(404).send(`PRODUCT WITH ID ${product._id} NOT FOUND`);
            }
            validProducts.push(checkId);
        }
        const cart = await Cm.addCart(validProducts);
        res.status(200).send(cart);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

routerC.post("/:cid/products/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
        const checkIdProduct = await Pm.getProductById(pid);
        if (!checkIdProduct) {
            return res.status(404).send({ message: `PRODUCT WITH ID: ${pid} NOT FOUND` });
        }

        const checkIdCart = await Cm.getCartById(cid);
        if (!checkIdCart) {
            return res.status(404).send({ message: `CART WITH ID: ${cid} NOT FOND` });
        }

        const result = await Cm.addProductInCart(cid, { _id: pid, quantity: quantity });
        console.log(result);
        return res.status(200).send({
            message: `PRODUCT ID: ${pid} ADDED TO CART ID: ${cid}`,
            cart: result,
        });
    } catch (error) {
        console.error("error:", error);
        return res.status(500).send({ message: "OOOPS ... FAIL WHILE PROCCESING REQUEST" });
    }
});

routerC.put('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const { products } = req.body;

        for (const product of products) {
            const checkId = await Pm.getProductById(product._id);
  
            if (!checkId) {
                return res.status(404).send({ status: 'error', message: `ID PRODUCTO NOT FOUND: ${product._id}` });
            }
        }
  
        const checkIdCart = await Cm.getCartById(cid);
        if (!checkIdCart) {
            return res.status(404).send({ status: 'error', message: `ID CART NOT FOUND ${cid}` });
        }

        const cart = await Cm.updateProductsInCart(cid, products);
        return res.status(200).send({ status: 'success', payload: cart });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: 'error', message: 'OOOPS ... FAIL WHILE PROCCESING REQUEST' });
    }
  });

  routerC.delete('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const checkIdProduct = await Pm.getProductById(pid);
        if (!checkIdProduct) {
            return res.status(404).send({ status: 'error', message: `PRODUCT WITH ID: ${pid} NOT FOUND` });
        }

        const checkIdCart = await Cm.getCartById(cid);
        if (!checkIdCart) {
            return res.status(404).send({ status: 'error', message: `CART WITH ID: ${cid} NOT FOUND` });
        }
  
        const findProductIndex = checkIdCart.products.findIndex((product) => product._id.toString() === pid);
        if (findProductIndex === -1) {
            return res.status(404).send({ status: 'error', message: `COULDNT FIND ID PRODUCT IN CART: ${pid}` });
        }
  
        checkIdCart.products.splice(findProductIndex, 1);
        const updatedCart = await Cm.deleteProductInCart(cid, checkIdCart.products);
  
        return res.status(200).send({ status: 'success', message: `DELETED PRODUCT ID: ${pid}`, cart: updatedCart });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: 'error', message: 'OOOPS ... FAIL WHILE PROCCESING REQUEST' });
    }
  });

  routerC.delete('/:cid', async (req, res) => {
    try {
      const { cid } = req.params;
      const cart = await Cm.getCartById(cid);
  
      if (!cart) {
        return res.status(404).send({ message: `CART WITH ID: ${cid} NOT FOUND` });
      }
      if (cart.products.length === 0) {
        return res.status(404).send({ message: 'CART IS EMPTY' });
      }
  
      cart.products = [];
  
      await Cm.updateOneProduct(cid, cart.products);
  
      return res.status(200).send({
        status: 'success',
        message: `CART WITH ID: ${cid} IS EMPTY!`,
        cart: cart,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: 'OOOPS ... FAIL WHILE PROCCESING REQUEST' });
    }
  });




export default routerC