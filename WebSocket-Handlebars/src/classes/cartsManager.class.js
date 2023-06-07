import fs from "fs";
import { v4 as uuidV4 } from "uuid";

const path = "src/classes/files/carts.json";

export default class ManagerCarts {

    constructor() {
        this.products = [];
    }

    consultarCarrito = async () => {
        if (fs.existsSync(path)) {
          const data = await fs.promises.readFile(path, "utf-8");
          const carritos = JSON.parse(data);
          return carritos;
        } else {
         console.log('THERE ARE NOT CARTS');
        }
      };


    crearCarrito = async () => {
        const cart = await this.consultarCarrito();
        let newCart = {
            id: uuidV4(),
            products: []
        }
        cart.push(newCart);
        await fs.promises.writeFile(path, JSON.stringify(cart, null, "\t"));
        return 'Cart has been created';
      };

      consultarCartPorId = async (id) => {
        const carts = await this.consultarCarrito();
    
        const cart = carts.find((carro) => {
          return carro.id == id;
        });
    
        return cart ? cart : "carrito no encontrado";
      };

      agregarProductoEnCarrito = async (idCart, idProduct) => {
        const cart = await this.consultarCartPorId(idCart);
      
        const index = cart.products.findIndex((product) => {
          return product.id == idProduct;
        });
      
        if (index == -1) {
          cart.products.push({ id: idProduct, quantity: 1 });
        } else {
          cart.products[index].quantity++;
        }
      
        const carts = await this.consultarCarrito()
        const cartIndex = carts.findIndex((cartIterator)=>{
            return cartIterator.id == cart.id
        })
      
        carts[cartIndex] = cart
      
        return await fs.promises.writeFile(path, JSON.stringify(carts, null,"\t" ))
      
      };
      

   






}