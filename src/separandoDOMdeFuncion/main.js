let facebook = document.getElementById('facebook');
let gmail = document.getElementById('gmail');
const email = document.getElementById('email');
const password = document.getElementById('password');
const email1 = document.getElementById('email2');
const password1 = document.getElementById('password2');
const register = document.getElementById('register');
const ingreso = document.getElementById('ingreso');
const closeSesion = document.getElementById('close');


register.addEventListener('click', () => {
  registerVal(email.value, password.value);
  if(email1.value.length === 0) {
    alert('ingrese un correo');
  }else if (password1.value.length <= 6) {
  alert('ingrese una Contraseña de mas de 6 caracteres');
  } else {
    alert('Has sido registrado exitosamente')
  }

})

ingreso.addEventListener('click', () => {
  ingresoVal(email1.value, password1.value);
  // observador();
  // aparece();
});

gmail.addEventListener('click', () => {
  gmailLogin();
});

facebook.addEventListener('click', () => {
  facebookLogin();
});

// closeSesion.addEventListener('click', () => {
//   close();
// })
