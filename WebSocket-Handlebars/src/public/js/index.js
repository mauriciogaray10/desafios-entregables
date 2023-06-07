const socket = io();
const idAdd = document.getElementById('idAdd');
const idDelete = document.getElementById('idDelete');
const lista = document.getElementById('lista');

idAdd.addEventListener("keyup", (evt) => {
    if (evt.key === "Enter") {
      socket.emit("productAdd", { id: idAdd.value });
      idAdd.value == "";
    }
  });
  idDelete.addEventListener("keyup", (evt) => {
    if (evt.key === "Backspace") {
      socket.emit("productDelete", { id: idDelete.value });
      idDelete.value == "";
    }
  });

  socket.on("show", (data) => {
    let itemLists = "";
    data.forEach((item) => {
      itemLists += `${item.id} <br/>`;
    });
    lista.innerHTML = itemLists;
  });

