import { Router } from "express";
import productsManager from '../classes/productsManager.class.js'

const router = Router();

const Products = new productsManager();

router.get('/', async (req, res)=>{
    let productList = await Products.consultarProductos();
    return res.send({productList});
});

router.get('/:pid', async (req, res) => {
    let pid = req.params.pid;
    let product = await Products.consultarProductoPorId(pid);
    
    res.send (product)
});

router.post('/', async (req, res)=>{
    let newProduct = req.body;
    await Products.crearProducto(newProduct);
   return  res.status(200).send('Product created');

});

router.put('/:pid', async (req, res)=> {
    let pid = req.params.pid;
    let newProduct = req.body;
    let oldProduct = await Products.consultarProductoPorId(pid);
    newProduct.id = await oldProduct.id
    await Products.actualizarProducto(newProduct);
    
    res.status(200).send('Product has been updated')

})

router.delete('/:pid', async(req, res)=>{
    let pid = req.params.pid;
    let message = await Products.deleteProductbyId(pid);
    res.send(message);
})





export default router;