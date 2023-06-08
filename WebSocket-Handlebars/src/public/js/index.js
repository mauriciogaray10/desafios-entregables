const socket = io();
let agregar = document.getElementById('agregar');
let eliminar = document.getElementById('eliminar');
let texto = document.getElementById('texto');
let item = document.getElementById('item');


agregar.addEventListener('click', (event)=>{
  socket.emit('addProduct', texto.value)
});

eliminar.addEventListener('click', (event)=>{
  socket.emit('deleteProduct', texto.value);
});

socket.on('lista', (data)=>{
  let productos = '';
  data.forEach((producto)=> {
    productos += `${producto} </br>`;
  });
  item.innerHTML = productos;
});


