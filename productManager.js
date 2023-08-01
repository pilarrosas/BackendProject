import fs from 'fs';
const filePath = './Prod.json';

if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]', 'utf-8');
    console.log(`Se ha creado el archivo ${filePath}`);
}


class productManager {
    constructor(path) {
        this.path = path
        this.products = [];
    }

    async findProd() {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8')
                return JSON.parse(data)
            } else {
                return []
            }
        } catch (error) {
            return error
        }
    }

    async createProd(obj) {
        try {
            const users = await this.findProd()
            let id
            if (!users.length) {
                id = 1
            } else {
                id = users[users.length - 1].id + 1
            }
            const newUser = { ...obj, id }
            console.log(newUser);
            users.push(newUser)
            console.log(users);
            await fs.promises.writeFile(this.path, JSON.stringify(users))
            return newUser
        } catch (error) {
            return error
        }
    }

    async getProductsById(id) {
        try {
            const prodPrev = await this.findProd()
            const product = prodPrev.find((u) => u.id === id)
            if (!product) {
                return 'Producto con id no encontrado'
            }
            return product
        } catch (error) {
            return error
        }
    }

    async updateProduct(id, obj) {
        try {
            const prodPrev = await this.findProd()
            const prodIndex = prodPrev.findIndex((u) => u.id === id)
            if (prodIndex === -1) {
                return 'No hay un Producto con ese id'
            }
            const product = prodPrev[prodIndex]
            prodPrev[prodIndex] = { ...product, ...obj }
            await fs.promises.writeFile(this.path, JSON.stringify(prodPrev))
        } catch (error) {
            return error
        }
    }
    async delProd(id) {
        try {
            const prodPrev = await this.findProd()
            const newArray = prodPrev.filter((p) => p.id !== id)
            await fs.promises.writeFile(this.path, JSON.stringify(newArray))
        } catch (error) {
            return error
        }
    }


}

/* ----------------------- PARA RREMPLAZAR UN PRODUCTO ---------------------- */

// obj = {
//     name: "Buzo",
//     descripcion: "Buzo Azul",
//     price: 20,
//     imagen: "https://sporting.vtexassets.com/arquivos/ids/505647-800-800?v=637852816720500000&width=800&height=800&aspect=true",
//     stock: 30,
//     code: 49573
// }


const prueba = async () => {
    /* ----------------------------- CREAR PRODUCTOS ---------------------------- */
    const manager = new productManager('Prod.json')
    // await manager.createProd({name: 'Remera', descripcion: "Remera roja", price: 10, imagen: "https://assets.roguefitness.com/f_auto,q_auto,c_limit,w_1042,b_rgb:f8f8f8/catalog/Apparel/Men%27s%20Apparel/T-Shirts/HW0216/HW0216-web1_mkqeu0.png", stock: 10, code: 845383})
    // await manager.createProd({name: 'Remera', descripcion: "Remera negra", price: 10, imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_995592-MLA46530633561_062021-F.webp", stock: 10, code: 2945858})
    // await manager.createProd({name: 'Musculosa', descripcion: "Musculosa negra", price: 12, imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_767045-MLA69737319613_052023-F.webp", stock: 10, code: 979767})
    // await manager.createProd({name: 'Remera', descripcion: "Remera Gris", price: 15, imagen: "https://sporting.vtexassets.com/arquivos/ids/784810-800-800?v=638186482705530000&width=800&height=800&aspect=true", stock: 10, code: 576545})
    // await manager.createProd({name: 'Buzo', descripcion: "Buzo Rojo", price: 20, imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_928854-MLA50656031726_072022-F.webp", stock: 10, code: 590502})
    //await manager.createProd({name: "Short", descripcion: "Short Blanco", price: 12, imagen: "https://media.solodeportes.com.ar/media/catalog/product/cache/7c4f9b393f0b8cb75f2b74fe5e9e52aa/s/h/short-topper-running-mix-blanco-800020164407001-1.jpg", stock: 5})

    /* ----------------------- CONSULTAR PRODUCTOS POR ID ----------------------- */
    //const product = await manager.getProductsById(10)
    //console.log(product);

    /* -------------------------- ACTUALIZAR PRODUCTOS -------------------------- */
    //await manager.updateProduct(1, obj)

    /* ---------------------------- BORRAR PRODUCTOS ---------------------------- */
    //await manager.delProd(2)
}

prueba()
export default productManager ;