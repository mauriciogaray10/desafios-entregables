import { Router } from "express";
import ManagerCarts from "../classes/cartsManager.class.js";

const router = Router();
const Carts = new ManagerCarts();

router.post('/', async(req, res)=>{
    let message = await Carts.crearCarrito();
    res.send(message);
});

router.get('/:cid', async (req, res)=>{
    let cid = req.params.cid;
    let message = await Carts.consultarCartPorId(cid);
    res.send(message);
});

router.post('/:cid/product/:pid', async(req, res)=>{
        let cid = req.params.cid;
    
        let  pid = req.params.pid;

        await Carts.agregarProductoEnCarrito(cid, pid);

       return res.send('The product has been added');



})







export default router;