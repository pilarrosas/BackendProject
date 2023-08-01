import express from 'express'; 
import productManager from './productManager.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
  res.send('¡WELCOME!');
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await usersManager.findProd()
    res.status(200).json({ message: 'PRODUCTS', products })
  } catch (error) {
    res.status(500).json({ error })
  }
})

app.get('/api/products/:pid', async (req, res) => {
  const { pid } = req.params
  try {
    const product = await productManager.getProductsById(+pid)
    res.status(200).json({ message: 'PRODUCT', product })
  } catch (error) {
    res.status(500).json({ error })
  }
})

app.post('/api/products',async(req,res)=>{
  console.log(req.body);
  try {
      const newProd = await productManager.createProd(req.body)
      res.status(200).json({ message: 'PRODUCT CREATED', product: newProd })
  } catch (error) {
      res.status(500).json({ error })
  }
})

app.delete('/api/products/:pid',async(req,res)=>{
  const {pid} = req.params
try {
  const response = await productManager.delProd(+pid)
  res.status(200).json({message:'PRODUCT DELETED'})
} catch (error) {
  res.status(500).json({ error })
}
})

app.put('/api/products/:pid',async(req,res)=>{
  const {pid} = req.params
  try {
      const prodUpdated = await productManager.updateProduct(+pid,req.body)
      res.status(200).json({message: 'PRODUCT UPDATE'})
  } catch (error) {
      res.status(500).json({ error })
  }
})

app.listen(8080, () => {
  console.log('LISTENING PORT 8080')
})