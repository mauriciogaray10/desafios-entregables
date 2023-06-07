import express from 'express';
import routerProducts from './routes/products.router.js';
import routerCarts from './routes/cart.router.js';
import __dirname from './utils.js';
import {Server} from 'socket.io';
import handlebars from 'express-handlebars';


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


socketServer.on("connection", (socket) => {
    console.log("connected " + socket.id);
});

