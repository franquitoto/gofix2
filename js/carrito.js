const cartDetalles = document.querySelector('.cart__detalle');
const crearCarrito = (producto, cantidad) => {
  const detalle = document.createElement("div");
  const detalleImg = document.createElement("img");
  const detalleDiv = document.createElement("div");
  const titulo = document.createElement("p");
  const precio = document.createElement("p");
  const precioFinal = document.createElement("span");
  const borrar = document.createElement("img");

  // Seteamos los atributos
  detalle.setAttribute("class", "cart__detalles");
  detalleImg.setAttribute("class", "cart__img");
  detalleImg.setAttribute("src", `${producto.imagen.urlImg}`);
  titulo.setAttribute("class", "cart__product");
  precio.setAttribute("class", "cart__price");
  borrar.setAttribute("class", "cart__delete");
  borrar.setAttribute("src", "./img/borrar.png");
  borrar.setAttribute("id", producto._id);
  

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

  cartDetalles.append(detalle);
};

// Obtenemos el producto
const carro = JSON.parse(sessionStorage.getItem("carrito"))
carro.forEach(e => {
  fetch(`http://localhost:3000/api/productos/${e.id}`)
  .then((res) => res.json())
  .then((data) => {
    // Le pasamos los datos para mostrarlo
    crearCarrito(data, e.cantidad);
  });
});

