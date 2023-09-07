import { cartModel } from "../models/cart.model.js"

class CartManager {


  getCarts = async () => {
    try {
      const carts = await cartModel.find().lean();
      return carts;
    } catch (err) {
      console.error('FAIL TO LOAD CART:', err.message);
      return [];
    }
  };

  getCartById = async (cartId) => {

    try {
      const cart = await cartModel.findById(cartId)

      return cart;
    } catch (err) {
      console.error('FAIL TO GET CART BY ID:', err.message);
      return err;
    }
  };

  createCartId = async () => {
    if (fs.existsSync(this.path)) {
      const listadecarts = await this.getCarts()
      const counter = listadecarts.length
      if (counter == 0) {
        return 1
      }
      else {
        return (listadecarts[counter - 1].id) + 1
      }
    }
  }

  addCart = async (products) => {
    try {
      let cartData = {};
      if (products && products.length > 0) {
        cartData.products = products;
      }

      const cart = await cartModel.create(cartData);
      return cart;
    } catch (err) {
      console.error('FAIL TO CREATE CART', err.message);
      return err;
    }
  };

  addProductInCart = async (cid, obj) => {
    try {
      const filter = { _id: cid, "products._id": obj._id };
      const cart = await cartModel.findById(cid);
      const findProduct = cart.products.some((product) => product._id.toString() === obj._id);

      if (findProduct) {
        const update = { $inc: { "products.$.quantity": obj.quantity } };
        await cartModel.updateOne(filter, update);
      } else {
        const update = { $push: { products: { _id: obj._id, quantity: obj.quantity } } };
        await cartModel.updateOne({ _id: cid }, update);
      }

      return await cartModel.findById(cid);
    } catch (err) {
      console.error('FAIL TO ADD PRODUCT TO CART', err.message);
      return err;
    }
  };

  deleteProductInCart = async (cid, products) => {
    try {
      return await cartModel.findOneAndUpdate(
        { _id: cid },
        { products },
        { new: true })

    } catch (err) {
      return err
    }

  }

  updateOneProduct = async (cid, products) => {

    await cartModel.updateOne(
      { _id: cid },
      { products })
    return await cartModel.findOne({ _id: cid })
  }
}

export default CartManager