const facebook = document.getElementById('facebook');
const gmail = document.getElementById('gmail');
//REGISTRO DE USUARIOS
const name = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const register = document.getElementById('register');

//LOGUEO DE USUARIOS
const email1 = document.getElementById('email2');
const password1 = document.getElementById('password2');
const ingreso = document.getElementById('ingreso');

const closeSesion = document.getElementById('close');

const editar = document.getElementById('buttons');
const divPosts1 = document.getElementById('divPosts1');
const divPosts = document.getElementById('divPosts');
const modal = document.getElementById('exampleModal');
const divPostsArea = document.getElementById('divPostsArea');

window.onload = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log('existe usuario');
      if (user.emailVerified) {
        content.innerHTML = ` bienvenid@  ${user.displayName || document.getElementById('name').value} `;
        content.innerHTML += `<button  type="button" class="btn btn-primary" >Publicar</button>`

        // content.innerHTML = ` <img src="${{user.photoURL}}" class="avatar">`;
        // ingreso.remove("hiden");
        // register.classList.remove("hiden");
        // close.classList.add("hiden");
        //editar.classList.add('visible');
        closeSesion.classList.remove('hiden');
        closeSesion.classList.add('show');
        editar.classList.remove('show');
        editar.classList.add('hiden');
        editar.classList.remove('show');
        editar.classList.add('hiden');
        divPosts1.classList.remove('hiden');
        divPosts1.classList.add('show');
        divPosts.classList.remove('show');
        divPosts.classList.add('hiden');
        divPostsArea.classList.remove('hiden');
        divPostsArea.classList.add('show');
        listar(`${user.uid}`);
      }

    } else {
      alert('no existe usuario');
      content.innerHTML = ``
      closeSesion.classList.add('hiden');
      closeSesion.classList.remove('show');
      editar.classList.add('show');
      editar.classList.remove('hiden');
      // divPosts1.classList.add('hiden');
      // divPosts1.classList.remove('show');
      // divPosts.classList.add('show');
      // divPosts.classList.remove('hiden');
    }
  });
}

register.addEventListener('click', () => {
  if(validadorNombre(name.value) === false) {
    alert('nombre incorrecto');
  } else if (validadorEmail(email.value) === false) {
    alert('email incorrecta');
  } else if (validadorPassword(password.value) === false) {
    alert('tiene que tener como minimo 6 caracteres y letras')
  } else {
    registerVal(email.value, password.value);
    alert('Has sido registrado exitosamente')
  }
})

ingreso.addEventListener('click', () => {
  ingresoVal(email1.value, password1.value);
});

gmail.addEventListener('click', () => {
  gmailLogin()
});

facebook.addEventListener('click', () => {
  facebookLogin();
});

closeSesion.addEventListener('click', () => {
  close();
  // ingreso.classList.add("hiden");
  // register.classList.add("hiden");
  // close.classList.remove("hiden");
  closeSesion.classList.remove('show');
  closeSesion.classList.add('hiden');
  editar.classList.add('show');
  editar.classList.remove('hiden');
  divPosts1.classList.remove('show');
  divPosts1.classList.add('hiden');
  divPosts.classList.remove('hiden');
  divPosts.classList.add('show');
  

})
