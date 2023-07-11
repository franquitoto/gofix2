// Creamos la logica para manejar la cantidad de productos seleccionados

{
  /* <div class="cart-modal__detalle">
    <img class="cart-modal__img"  src="./img/motoe.png" alt="">
    <div>
      <p class="cart-modal__product">iPhone 13 pro max</p>
      <p class="cart-modal__price">$700 x3 <span>$2100</span></p>
    </div>
    <img class="cart-modal__delete" src="./img/borrar.png" alt="delete">
</div> */
}
// Logica para completar el cart-modal
const numerito = document.querySelector('.header__cart--notification')
  if(sessionStorage.getItem("producto")=== null){
    console.log('hola')
  }else{
    console.log(JSON.parse(sessionStorage.getItem("carrito")).length)
    numerito.textContent = JSON.parse(sessionStorage.getItem("carrito")).length
    numerito.style.display = 'block'
  }
const container = document.querySelector(".cart-modal__detalles");
const agregarAlModal = (producto, cantidad) => {
  const detalle = document.createElement("div");
  const detalleImg = document.createElement("img");
  const detalleDiv = document.createElement("div");
  const titulo = document.createElement("p");
  const precio = document.createElement("p");
  const precioFinal = document.createElement("span");
  const borrar = document.createElement("img");

  // Seteamos los atributos
  detalle.setAttribute("class", "cart-modal__detalle");
  detalleImg.setAttribute("class", "cart-modal__img");
  detalleImg.setAttribute("src", `${producto.imagen.urlImg}`);
  titulo.setAttribute("class", "cart-modal__product");
  precio.setAttribute("class", "cart-modal__price");
  borrar.setAttribute("class", "cart-modal__delete");
  borrar.setAttribute("src", "./img/borrar.png");
  borrar.setAttribute("id", producto._id);
  borrar.setAttribute("onclick", "eliminarDelCarrito(this.id)");

  // Agregamos los valores
  titulo.textContent = producto.nombre;
  precio.textContent = "$" + producto.precio + "  x  " + cantidad + "    ";
  precioFinal.textContent = "$" + producto.precio * cantidad;

  // Creamos el modal
  precio.appendChild(precioFinal);
  detalleDiv.appendChild(titulo);
  detalleDiv.appendChild(precio);
  detalle.appendChild(detalleImg);
  detalle.appendChild(detalleDiv);
  detalle.appendChild(borrar);

  container.append(detalle);
};

// creamos la variable carrito para manipular el sesionstorage
let carrito;

// declaramos el contenedor principal del cart-modal
const cartModal = document.querySelector(".cart-modal");
console.log(sessionStorage.getItem("producto"))
// Creamos la funcion agregar carrito
const spanDetalle = document.querySelector(".detalle__span");
const agregarAlCarrito = (id, cantidad) => {
  // Chequeamos que la cantidad seleccionada sea distinta de 0
  if (cantidad.value <= 1) {
    // Si es 0 le enviamos un mensaje
    // spanDetalle.style.display = "block";
  } else {
    // Si es una cantidad valida seguimos
    // spanDetalle.style.display = "none";
    event.stopPropagation();
    // Chequeamos si el sesion storage tiene productos
    if (sessionStorage.getItem("carrito") === null) {
      // Si no tiene productos creamos la variable y la subimos
      carrito = [{ id: id, cantidad: cantidad }];
      sessionStorage.setItem("carrito", JSON.stringify(carrito));
      numerito.textContent = carrito.length
      numerito.style.display = 'block'
    } else {
      // Si tiene solamente pusheamos el nuevo producto
      let bolean = true;
      carrito = JSON.parse(sessionStorage.getItem("carrito"));
      carrito.forEach((e) => {
        // Chequeamos si el producto a agregar ya existe para solamente aumentarle la cant
        if (e.id === id) {
          e.cantidad =
            parseInt(e.cantidad) + parseInt(cantidad);
          sessionStorage.setItem("carrito", JSON.stringify(carrito));
          numerito.textContent = carrito.length
          numerito.style.display = 'block'
          bolean = false;
        }
      });
      // Si el producto a agregar existe no entra en este if
      if (bolean) {
        carrito.push({ id: id, cantidad: cantidad });
        sessionStorage.setItem("carrito", JSON.stringify(carrito));
        numerito.textContent = carrito.length
        numerito.style.display = 'block'
      }
    }
    mostrarModalCartCart();
  }
};
// Funcion para mostrar el modal
const mostrarModalCartCart = () => {
  // Cheuqeamos el estado del carrito
  let largo = JSON.parse(sessionStorage.getItem("carrito"))
  console.log(largo.length)
  if ( largo.length<1) {
    // Si esta vacio le mandamos un mensaje
    container.innerHTML = `<p class="cart-modal__tittle">Carrito vacio</p>`;
    cartModal.style.display = "block";
    console.log("ESTAS ELIMINANDO BRODEEER")
  } else {
    // Si tiene datos los obtenemos
    carrito = JSON.parse(sessionStorage.getItem("carrito"));
    // Eliminamos todos los HTML que tenga el contenedor del modal para luego agregar todos
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    // Recorremos el array obtenido del sesionstorage
    carrito.forEach((e) => {
      // Obtenemos el producto
      fetch(`http://localhost:3000/api/productos/${e.id}`)
        .then((res) => res.json())
        .then((data) => {
          // Le pasamos los datos para mostrarlo
          agregarAlModal(data, e.cantidad);
        });
    });
    // display block al contenedor del modal
    cartModal.style.display = "block";
  }
};

// Logica para mostrar el carrito desde el icono de bolsa
const cartBolsa = document.getElementById("cartBolsa");
cartBolsa.addEventListener("click", () => {
  mostrarModalCartCart();
});

// Ocultar el modal si se hace clic fuera de él
cartModal.addEventListener("click", function (event) {
  if (event.target === cartModal) {
    cartModal.style.display = "none"; 
  }
});
// Ocultar el modal si se hace clic fuera de él
document.addEventListener("click", function (event) {
  if (!cartModal.contains(event.target) && event.target !== cartBolsa) {
    cartModal.style.display = "none"; 
  }
});

// Logica para eliminar delc arrito
const eliminarDelCarrito = (id) =>{
  event.stopPropagation();
  console.log(id)
  console.log(carrito)
  carrito = JSON.parse(sessionStorage.getItem("carrito"))
  carrito = carrito.filter(e => e.id !== id)
  sessionStorage.setItem("carrito", JSON.stringify(carrito))
  numerito.textContent = carrito.length
  numerito.style.display = 'block'
  mostrarModalCartCart()
}



