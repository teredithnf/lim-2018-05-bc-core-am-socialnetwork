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

window.onload = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log('existe usuario');
      if (user.emailVerified) {
        content.innerHTML = ` bienvenid@  ${user.displayName || document.getElementById('name').value} `;
        // content.innerHTML = ` <img src="${{user.photoURL}}" class="avatar">`;
        // ingreso.remove("hiden");
        // register.classList.remove("hiden");
        // close.classList.add("hiden");
      }
      // else {
      //   ingreso.classList.add("hiden");
      //   register.classList.add("hiden");
      //   close.classList.remove("hiden");
      // }
    } else {
      alert('no existe usuario');
      content.innerHTML = ``
    }
  });
}

const getId = (id) => {
  return document.getElementById(id);
}
const validadorNombre = (name) => {
    if ((/^([A-Za-z0-9\s]{8,})+$/g.test(name))) {
        return true
    } else {
        return false
    }
}
const validarorEmail = (email) => {
    console.log(email);
    if (/^([a-zA-Z0-9._-]{3,})+@([a-zA-Z0-9.-]{5,})+\.([a-zA-Z]{2,})+$/.test(email)) {
        return true;
    } else {
        return false;
    }
}
const validatorPassword = (password) => {
    console.log('validando contraseña', password);
    if (/^([A-Za-z0-9]{8,})+$/g.test(password)) {
        return true;
    } else {
        return false;
    }
}

register.addEventListener('click', () => {
  if(validadorNombre(name.value)=== false) {
    alert('nombre incorrecto');
    console.log(123);
  }else if (validarorEmail(email.value) === false) {
  alert('email incorrecta');
} else if (validatorPassword(password.value) === false) {
  alert('tiene que tener como minimo 6 caracteres y letras')
}else {
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
})
