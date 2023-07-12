const contenedorProductos = document.querySelector(".container-principal__products");
const contenedorDestacados = document.querySelector(".container-principal__destacados")
let productos;

const mostrarProducto = (producto, contenedor) =>{
  // Creamos las etiquetas del producto
  const tarjetaProducto = document.createElement("div");
  const headerProducto = document.createElement("div");
  const categoria = document.createElement("p");
  const titulo = document.createElement("p");
  const img = document.createElement("img");
  const footerProducto = document.createElement("div");
  const precio = document.createElement("p");
  const button = document.createElement("button");
  const button2 = document.createElement("button");
  const i = document.createElement("i");
  const i2 = document.createElement("i");

  // Le doy los atributos de class
  tarjetaProducto.classList.add("container-principal__card");
  headerProducto.classList.add("container-principal__card-header");
  categoria.classList.add("container-principal__card-category");
  titulo.classList.add("container-principal__card-tittle");
  img.classList.add("container-principal__card-img");
  footerProducto.classList.add("container-principal__card-footer");
  precio.classList.add("container-principal__card-precio");
  button2.classList.add("container-principal__card-add");
  button2.classList.add("editar-imgn");
  i2.classList.add("bi")
  i2.classList.add("bi-pencil-square")
  button.classList.add("container-principal__card-add");
  i.classList.add("bi")
  i.classList.add("bi-bag-plus-fill")
  // Le doy los atributos de id
  tarjetaProducto.setAttribute("id", producto._id);
  img.setAttribute("id", producto._id);
  button2.setAttribute("id", producto._id)
  button.setAttribute("id", producto._id)
  // Agregamos funciones a los botones
  button.setAttribute("onclick", "agregarAlCarrito(this.id,1,'index')")
  img.setAttribute("onclick", "vistaDetalle(this.id)")
  
  //Le agregamos los atributos
  categoria.textContent = producto.categoria
  titulo.textContent = producto.nombre
  img.setAttribute("src", producto.imagen.urlImg)
  precio.textContent = `$${producto.precio}`
  // Creamos la estructura de la tarjta
  headerProducto.appendChild(categoria);
  headerProducto.appendChild(titulo);
  footerProducto.appendChild(precio);
  button.appendChild(i);
  button2.appendChild(i2);
  footerProducto.appendChild(button);
  footerProducto.appendChild(button2);
  tarjetaProducto.appendChild(headerProducto);
  tarjetaProducto.appendChild(img);
  tarjetaProducto.appendChild(footerProducto);

  if(contenedor === 'destacados'){
    contenedorDestacados.append(tarjetaProducto)
  }else{
    contenedorProductos.append(tarjetaProducto)
  }
  
  

}
const actualizarImg = (e) =>{
  const idImg = e.currentTarget.id
  fetch(`http://localhost:3000/api/productos/${idImg}`)
  .then((response) => response.json())
  .then((data) => {
    producto = data
    console.log(producto)
  });
}
function actualizarBotonesAgregar() {
  botonesAgregar = document.querySelectorAll(".editar-imgn");
  botonesAgregar.forEach(boton => {
    boton.addEventListener("click", actualizarImg);
  });
}
// Mostramos los productos apenas carga la pagina
fetch("http://localhost:3000/api/productos")
  .then((response) => response.json())
  .then((data) => {
    productos = data.productos;
    // Con esto eliminamos todos los html que tenga el contenedor de 
  //productos para que no se dupliquen cada vez que usamos un filtro
  while (contenedorProductos.firstChild) {
    contenedorProductos.removeChild(contenedorProductos.firstChild)
  }
    productos.forEach(e => {
      mostrarProducto(e, 'destacadoss')
    });
    
  });
// Mostramos los productos destacados
fetch("http://localhost:3000/api/productos")
  .then((response) => response.json())
  .then((data) => {
    productos = data.productos;
    // Con esto eliminamos todos los html que tenga el contenedor de 
  //productos para que no se dupliquen cada vez que usamos un filtro
  while (contenedorDestacados.firstChild) {
    contenedorDestacados.removeChild(contenedorDestacados.firstChild)
  }
  const filtro = productos.filter(e => e.destacado === 'SI');
    filtro.forEach(e => {
      mostrarProducto(e, 'destacados')
    });
    
  });

// Funcion que nos deriva a la vista detalle
const vistaDetalle = (id) =>{
  sessionStorage.setItem("producto", id)
  window.location.href = "detalle.html"
}

// Creamos algunos filtros
const filtroMarca = (valor) =>{
  fetch("http://localhost:3000/api/productos")
  .then((response) => response.json())
  .then((data) => {
    productos = data.productos;
    // Con esto eliminamos todos los html que tenga el contenedor de 
  //productos para que no se dupliquen cada vez que usamos un filtro
  while (contenedorProductos.firstChild) {
    contenedorProductos.removeChild(contenedorProductos.firstChild)
  }
    const filtro = productos.filter(e => e.marca === valor);
    console.log(filtro)
    filtro.forEach(e => {
      mostrarProducto(e)
    });
    
  });
}
const filtroCategoria = (valor) =>{
  fetch("http://localhost:3000/api/productos")
  .then((response) => response.json())
  .then((data) => {
    productos = data.productos;
    // Con esto eliminamos todos los html que tenga el contenedor de 
  //productos para que no se dupliquen cada vez que usamos un filtro
  while (contenedorProductos.firstChild) {
    contenedorProductos.removeChild(contenedorProductos.firstChild)
  }
    const filtro = productos.filter(e => e.categoria === valor);
    console.log(filtro)
    filtro.forEach(e => {
      mostrarProducto(e)
    });
    
  });
}