// let email = document.getElementById('email').value;
// let password = document.getElementById('password').value;
 function register(){// CREO FUNCION QUE ME PERMITE HACER LE REGISTRO DE USURAIOS 
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

function ingreso() {
  let email2 = document.getElementById('email2').value;
  let password2 = document.getElementById('password2').value;
  firebase.auth().signInWithEmailAndPassword(email2, password2).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});
}

function observador(){
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
    content.innerHTML = `

  `

    // ...
  }
});
}
observador();

function aparece(user){
  let user = user;
  let contenido = document.getElementById('content');
  if (user.emailVerified) {
    content.innerHTML = `
    <div class="container mt-5">
    <div class="alert alert-success" role="alert">
    <h4 class="alert-heading">Bienvenido! ${user.email}</h4>
    <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
    <hr>
    <p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
    </div>
    <button onclick="close()" class="btn-danger">Cerrar sesión</button>
    </div>
  `
  }
}

function close (){
  firebase.auth().signOut()
  .then(function(){
    console.log('Saliendo...');
  })
  .catch(function(error){
    console.log(error);
  })
}

function verificar(){
  var user = firebase.auth().currentUser;
  user.sendEmailVerification().then(function(){
    console.log('enviando correo');
  }).catch(function(error){
    console.log(error);
  })
}
