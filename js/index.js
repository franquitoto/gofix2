// Funciones para mostrar o cerrar el modal (ventana emergente para loguearse)
const mostrarModal = () => {
  var modal = document.getElementById("myModal");
  modal.style.display = "flex";
}
const cerrarModal = () => {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
}

// Chequeamos en sesionstorage si hay un token
const token = sessionStorage.getItem("token");
const configuracionAdmin = document.getElementById('configuracionAdmin')
const editarImg = document.getElementsByClassName('editar-imgn');

// Si no hay token mostramos el modal
if(token===null){
  console.log("ENTRO ACA")
  mostrarModal()
}else{
  console.log("No existe el token", token)
  // Si hay chequeamos el token corresponde a un admin
  fetch('http://localhost:3000/api/auth/isadmin', {
    method: 'POST',
    headers: {"token": JSON.parse(token)}
  })
    .then((res) => res.json())
    .then((data) => {
      if(data.mensaje === 'admin'){
        // Si es un admin habilitamos el html de config
        configuracionAdmin.style.display = "block"
        for(let i = 0; i < editarImg.length; i++){
          editarImg[i].classList.add('editar-imgb')
        }
      }
    })
}
// Funcion para resetear los inputs de los form
const resetForm = () =>{
  let inputFields = document.getElementsByClassName('modal-login__form-input-fiel');
  for (let i = 0; i < inputFields.length; i++) {
    inputFields[i].value = '';
  }
}

// Creamos la logica para logearse mediante la api
const formModal = document.getElementById('formModal');
const span2 = document.getElementById('spanLogin');
formModal.addEventListener('submit', (e) =>{
  e.preventDefault()
  const formData = new FormData(e.target);
  fetch('http://localhost:3000/api/auth//signin', {
    method: 'POST',
    body: formData
  })
    .then((res) => res.json())
    .then((data) =>{
      if(data.token === null){
        span2.style.display = "block"
        span2.textContent = data.mensaje
        console.log(data.mensaje)
      }else{
        location.reload()
        cerrarModal()
        console.log(data.token)
        sessionStorage.setItem("token", JSON.stringify(data.token))
      }
      
    })
})
const baner1 = document.getElementById('baner1');
const baner2 = document.getElementById('baner2');

function mostrarBannerAnterior() {
  baner1.classList.remove('show');
  baner1.classList.add('hide');
  baner2.classList.remove('hide');
  baner2.classList.add('show');

  setTimeout(() => {
    baner1.style.display = 'none';
    baner2.style.display = 'flex';
  }, 500); // Tiempo de espera para ocultar el banner anterior
}

function mostrarSiguienteBanner() {
  baner2.classList.remove('show');
  baner2.classList.add('hide');
  baner1.classList.remove('hide');
  baner1.classList.add('show');

  setTimeout(() => {
    baner2.style.display = 'none';
    baner1.style.display = 'flex';
  }, 500); // Tiempo de espera para ocultar el banner anterior
}



