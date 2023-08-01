import { Router } from "express";
import productManager  from "../productManager.js";

const router = Router()
const Manager = new productManager('../Prod.json');

router.get('/', async (req, res) => {
    try {
        const products = await Manager.findProd();
        const limit = req.query.limit ? parseInt(req.query.limit) : null;
        const response = limit ? products.slice(0, limit) : products;
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: 'ERROR' });
    }
})

router.get('/:id', async (req, res) => {
    try {
      const productId = parseInt(req.params.pid);
      const product = await Manager.getProductsById(productId);
  
      if (!product) {
        return res.status(404).json({ error: 'PRODUCT NOT FOUND' });
      }
  
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: 'REQUEST ERROR' });
    }
  })

  router.post('/', (req, res) => {
    const { name, description, code, price, stock, } = req.body;
    const product = {
      name,
      description,
      code,
      price,
      imagen,
      status: true,
      stock: stock,
    };
  
    const newProduct = Manager.addProduct(product);
    if (newProduct) {
      res.status(201).json(newProduct);
    } else {
      res.status(400).json({ error: 'UNABLE TO ADD TO CART' });
    }
  });

  router.put('/:id', async (req, res) => {
    const productId = parseInt(req.params.pid);
    const updatedProd = req.body; 
    await Manager.updateProduct(productId, updatedProd);
    res.json({ message: 'SUCCESS' });
  });

  router.delete('/:id', async (req, res) => {
    const productId = parseInt(req.params.pid);
    await Manager.deleteProduct(productId);
    res.json({ message: 'PRODUCT DELETED' });
  });

export default router