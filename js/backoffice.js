// Funcion para mostrar el form de nuevo producto o nuevo usuario
const mostrarForm = (formId) =>{
  let forms = document.getElementsByClassName('container-principal__forms-backoffice');
  for(let i = 0; i<forms.length; i++){
    if (forms[i].id === formId) {
      forms[i].style.display = 'flex';
    } else {
      forms[i].style.display = 'none';
    }
  }
  const formOpcion = document.getElementsByClassName('container-principal__forms-opcion')
  for(let i = 0; i<formOpcion.length; i++){
    formOpcion[i].style.display = 'none'
  }
}

// Funcion para colocarle el nombre de la img que vamos a subir
const updateFileName = () =>{
  let input = document.getElementById('file');
  let fileName = document.getElementById('file-name')
  fileName.innerHTML = `<i class="bi bi-file-earmark-arrow-up-fill"></i>${input.files[0].name}<i class="bi bi-file-earmark-arrow-up-fill"></i>`
}
// Funcion para que una vez cargado el producto dejar el form de la manera original
const resetFileName = () =>{
  let fileName = document.getElementById('file-name')
  fileName.innerHTML = `<i class="bi bi-file-earmark-arrow-up-fill"></i>Seleccionar archivo<i class="bi bi-file-earmark-arrow-up-fill"></i>`
}
// Funcion para resetear los valores del form
const resetForm = () =>{
  let inputFields = document.getElementsByClassName('modal-login__form-input-field');
  for (let i = 0; i < inputFields.length; i++) {
    inputFields[i].value = '';
  }
}
// agregamos un nuevo producto mediante la api con fetch
const form = document.getElementById("formProductos");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  console.log(formData)
  resetForm()
  resetFileName()
  let id;
  fetch("http://localhost:3000/api/productos", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {

      id = data._id;
      console.log(id)
    })
    .catch((error) => {
      console.log(error);
    });
});

// Funcion para detectar usuarios duplicados desde el cliente con el evento onchange
let acceso = false
const compararValorUsername = (valor) =>{
  const username = document.getElementById('username');
  const spanDuplicados = document.getElementById('spanDuplicados')
  fetch('http://localhost:3000/api/usuarios',{
    method: 'GET',
  })
    .then((res) => res.json())
    .then((data) =>{
      data.forEach(e => {
        
        if(valor!== e.username){
          spanDuplicados.style.display = "none"
          username.style.color = "#d3d3d3"
          acceso = true
        }
        else{
          spanDuplicados.style.display = "block"
          username.style.color = 'red'
          acceso = false
        }
      });
    })
}
// Funcion para detectar email duplicados desde el cliente con el evento onchange
const compararValorEmail = (valor) =>{
  const email = document.getElementById('email');
  const spanDuplicados = document.getElementById('spanDuplicados')
  fetch('http://localhost:3000/api/usuarios',{
    method: 'GET',
  })
    .then((res) => res.json())
    .then((data) =>{
      data.forEach(e => {
        
        if(valor!== e.email){
          spanDuplicados.style.display = "none"
          email.style.color = "#d3d3d3"
          acceso = true
        }
        else{
          spanDuplicados.style.display = "block"
          email.style.color = 'red'
          acceso = false
        }
      });
    })
}
// agregamos un nuevo usuario mediante la api con fetch
const userForm = document.getElementById('formUsuarios');
userForm.addEventListener('submit', (e) =>{
  e.preventDefault();
  const formData = new FormData(e.target);
  if(acceso){
    console.log("ok")
    fetch('http://localhost:3000/api/auth/signup',{
      method: 'POST',
      body: formData
    })
      .then((res) => res.json())
      .then((data) =>{
        resetForm()
        console.log(data)
      })
  }else{
    console.log("nombre de usuario ya utilizado")
  }
})


