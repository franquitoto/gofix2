// Funcion que se ejecuta cuando todos los elementos del dom estan cargados
document.addEventListener("DOMContentLoaded", function () {
  
  // Obtenemos del dom todas las etiquetas correspondientes a la vista de detalle
  const titulo = document.querySelector(".detalle__tittle");
  const descripcion = document.querySelector(".detalle__descripcion");
  const precio = document.querySelector(".detalle__detalles-precio");
  const img = document.querySelector(".content__img");
  const color = document.querySelector(".detalle__detalles-color");
  const memoria = document.querySelector(".detalle__detalles-memoria");
  const button = document.querySelector(".detalle__button");

  // Obtenemos del sesiostorage el ID del producto a mostrar el detalle
  const id = sessionStorage.getItem("producto");

  // Obtenemos todos los datos correspondientes al producto
  fetch(`http://localhost:3000/api/productos/${id}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      // Le agregamos los parametro
      titulo.textContent = data.nombre;
      descripcion.textContent = data.descripcion;
      precio.textContent = "$" + data.precio;
      color.textContent = data.color;
      memoria.textContent = data.capacidad;
      img.setAttribute("src", data.imagen.urlImg);
      
    });
});
let inputNumber = 1;
cantidadSeleccionada = document.querySelector(".input__number");
cantidadSeleccionada.value = inputNumber;
const aumentarCantidad = (id) => {
  if (id === "mas") {
    inputNumber++;
    cantidadSeleccionada.value = inputNumber;
  } else {
    if (inputNumber <= 1) {
      cantidadSeleccionada.value = 1;
    } else {
      inputNumber--;
      cantidadSeleccionada.value = inputNumber;
    }
  }
};
const id = sessionStorage.getItem("producto")
const addCart = document.getElementById('aversifunciona');

addCart.addEventListener('click', () =>{
  agregarAlCarrito(id, cantidadSeleccionada.value)
})



