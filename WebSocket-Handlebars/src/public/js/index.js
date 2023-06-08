const socket = io();
const nameAdd = document.getElementById('nameAdd');
const nameDelete = document.getElementById('nameDelete');
const productList = document.getElementById('productList');
const agregar = document.getElementById('agregar');
const eliminar = document.getElementById('eliminar')

agregar.addEventListener('click', (nameAdd) =>{
  socket.emit("productAdd", {name: nameAdd.value});
  nameAdd === "";
})

eliminar.addEventListener('click', (nameDelete)=>{
  socket.emit("productDelete",{name: nameDelete.value});
  nameDelete == "";
})

socket.on('list', (lista)=>{
  let productos = '';
  lista.forEach(item => {
    productos += item;
  });
  productList.innerHTML = productos;
})

