// let email = document.getElementById('email').value;
// let password = document.getElementById('password').value;
 register = () => {
  let email = document.getElementById('email').value;
  console.log(email);
  let password = document.getElementById('password').value;
  console.log(password);
  firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){
    verificar();
  }).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});
}

ingreso = () => {
  let email2 = document.getElementById('email2').value;
  let password2 = document.getElementById('password2').value;
  firebase.auth().signInWithEmailAndPassword(email2, password2).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});
}

const observador = () =>{
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log('no existe usuario');
    aparece();
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
    // ...
  } else {
    // User is signed out.
    console.log('no existe usuario');
    // ...
  }
});
}
observador();

const aparece = (user) => {
  let user = user;
  let contenido = document.getElementById('content');
  if (user.emailVerified) {
    content.innerHTML = `
    <p>Bienvenido</p>
    <button onclick="close()">Cerrar sesión</button>
  `  
  }
}

const close = ()=>{
  firebase.auth().signOut()
  .then(function(){
    console.log('Saliendo...');
  })
  .catch(function(error){
    console.log(error);
  })
}

const verificar = ()=>{
  var user = firebase.auth().currentUser;
  user.sendEmailVerification().then(function(){
    console.log('enviando correo');
  }).catch(function(error){
    console.log(error);
  })
}
