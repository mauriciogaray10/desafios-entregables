import express from 'express';
import routerProducts from './routes/products.router.js';
import routerCarts from './routes/cart.router.js';
import __dirname from './utils.js';
import {Server} from 'socket.io';
import handlebars from 'express-handlebars';
import routerRealTime from './routes/realTime.router.js'


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const httpServer = app.listen(8080, ()=>{
    console.log('server is listening...');
});
const socketServer = new Server(httpServer); 


app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));



app.use('/products/', routerProducts);
app.use('/carts/', routerCarts);
app.use('/realTimeProducts', routerRealTime)

let lista = [];

socketServer.on("connection", (socket) => {
    console.log("connected " + socket.id);

    socket.on('productAdd', (product)=>{
        lista.push(product).value;
    });
    socket.emit('list', lista);
    socket.on('productDelete', (product)=>{
        let productFiltered = lista.find(producto => producto.name !== product.name);
        lista = productFiltered;
    })
    socket.emit('list', lista);
    

});

