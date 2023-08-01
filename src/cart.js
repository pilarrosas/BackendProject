import fs from 'fs';

const filePath = 'productCart.json';

if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]', 'utf-8');
}

class cartManager {
    constructor(filePath) {
      this.path = filePath;
      this.cart = [];
      this.prodCartId = 0;
      this.loadCart();
    }
  
    async loadCart() {
      try {
        const data = await fs.promises.readFile(this.path, 'utf-8');
        this.cart = JSON.parse(data);
        this.updateProdCartId();
      } catch (error) {
        throw new Error('FAIL TO UPLOAD CART: ' + error.message);
      }
    }
 
    async saveCartProducts(data) {
      try {
        const newData = JSON.stringify(data, null, 2);
        await fs.promises.writeFile(this.path, newData, 'utf-8');
        console.log('CART PRODUCT SUCCESS', this.path);
      } catch (error) {
        throw new Error('FAIL TO SAVE CART ' + error.message);
      }
    }

    updateProdCartId() {
      if (this.cart.length > 0) {
        const prodCart = this.cart[this.cart.length - 1];
        this.prodCartId = prodCart.id;
      }
    }

    createNewCart() {
      const newCart = {
        id: this.prodCartId + 1,
        products: [],
      };
  
      this.prodCartId++;
      this.cart.push(newCart);
  
      this.saveCart(this.cart)
        .then(() => {
          console.log(`SUCCESS, NEW CART ID: ${newCart.id}`);
        })
        .catch((error) => {
          console.log('FAIL TO SAVE NEW CART', error.message);
        });
  
      return newCart;
    }
  
    getCartById(id) {
      const cart = this.carts.find((c) => c.id === id);
      if (cart) {
        return cart;
      } else {
        throw new Error('FAIL TO FIND CART');
      }
    }
  
    addProductToCart(cartId, productId, quantity = 1) {
      const cart = this.getCartById(cartId);
      const ifExistProduct = cart.products.find((p) => p.product === productId);
  
      if (ifExistProduct) {
        ifExistProduct.quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }
  
      this.saveCart(this.cart)
        .then(() => {
          console.log(`PRODUCT ADDED TO CART ${cartId}`);
        })
        .catch((error) => {
          throw new Error('FAIL TO SAVE CART: ' + error.message);
        });
  
      return cart;
    }
  }

export { cartManager }