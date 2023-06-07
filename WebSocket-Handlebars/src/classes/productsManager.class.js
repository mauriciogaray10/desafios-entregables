import fs from "fs";
import { v4 as uuidV4 } from "uuid";

const path = "src/classes/files/products.json";

export default class ManagerProducts {
  consultarProductos = async () => {
    if (fs.existsSync(path)) {
      const data = await fs.promises.readFile(path, "utf-8");
      const products = JSON.parse(data);
      return products;
    } else {
     console.log('THERE ARE NOT PRODUCTS');
    }
  };

  crearProducto = async (info) => {
    const productos = await this.consultarProductos();
    info.id = uuidV4();
    productos.push(info);
    await fs.promises.writeFile(path, JSON.stringify(productos, null, "\t"));
    return info;
  };

  consultarProductoPorId = async (id) => {
    const productos = await this.consultarProductos();

    const producto = productos.find((producto) => {
      return producto.id == id;
    });

    return producto ? producto : "producto no encontrado";
  };

  actualizarProducto = async ({name, price, stock, status, description, thumbnails, id}) => {

     let productOld= await this.deleteProductbyId(id);

    let modifiedProduct = [{name, price, stock, status, description, thumbnails, id}, ...productOld];
    await fs.promises.writeFile(path, JSON.stringify(modifiedProduct, '\t') )
   return  modifiedProduct;
 }

 deleteProductbyId = async (id) => {
  let response = await this.consultarProductos();

  let productFiltered = response.filter(products => products.id !== id);
  await fs.promises.writeFile(path, JSON.stringify(productFiltered, '\t') )
  return productFiltered;
};






}