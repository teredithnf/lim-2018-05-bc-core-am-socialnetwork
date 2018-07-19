let config = {
  apiKey: "AIzaSyAyU-144GII0BR3pdmRcq70rWM_9-fKthY",
  authDomain: "socialnetwork-proyect.firebaseapp.com",
  databaseURL: "https://socialnetwork-proyect.firebaseio.com",
  projectId: "socialnetwork-proyect",
  storageBucket: "socialnetwork-proyect.appspot.com",
  messagingSenderId: "1041163805568"
};
firebase.initializeApp(config);

function register(){
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(()=> {
    verificar();
  }).catch((error) => {
  // Handle Errors here.
  let errorCode = error.code;
  let errorMessage = error.message;
  console.log(errorCode);
  console.log(errorMessage);
  });
}

function ingreso() {
  let email2 = document.getElementById('email2').value;
  let password2 = document.getElementById('password2').value;
  firebase.auth().signInWithEmailAndPassword(email2, password2)
  .then(()=>{
    console.log('Usuario con login exitoso');
  })
  .catch((error) => {
  // Handle Errors here.
  let errorCode = error.code;
  let errorMessage = error.message;
  console.log('Error en firebase >'+ errorCode);
  console.log('Error en firebase >'+ errorMessage);
  });
}

function observador(){
  firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log('no existe usuario');
    aparece();
    // User is signed in.
    let displayName = user.displayName;
    let email = user.email;
    let emailVerified = user.emailVerified;
    let photoURL = user.photoURL;
    let isAnonymous = user.isAnonymous;
    let uid = user.uid;
    let providerData = user.providerData;
    // ...
  } else {
    // User is signed out.
    console.log('no existe usuario');
    content.innerHTML = `
  `
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
    <button onclick="close()" class="btn btn-danger">Cerrar sesión</button>
    </div>
  `
  }
}

function close (){
  firebase.auth().signOut()
  .then(()=>{
    console.log('Saliendo...');
  })
  .catch(function(error){
    console.log(error);
  })
}

function verificar(){
  let user = firebase.auth().currentUser;
  user.sendEmailVerification().then(function(){
    console.log('enviando correo');
  }).catch(function(error){
    console.log(error);
  })
}

let facebook = document.getElementById('facebook');

facebook.addEventListener('click', () => {
  let provider = new firebase.auth.FacebookAuthProvider();
  provider.setCustomParameters({
  'display': 'popup'
  });
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      console.log('has iniciado sesion');
  }).catch((error)=> {
    console.log(error.code);
    console.log(error.message);
    console.log(error.email);
    console.log(error.credential);
 });
})
// function facebook(){
//   let provider = new firebase.auth.FacebookAuthProvider();
//   provider.setCustomParameters({
//   'display': 'popup'
//   });
//   firebase.auth().signInWithPopup(provider)
//     .then((result) => {
//       console.log('has iniciado sesion');
//   }).catch((error)=> {
//     console.log(error.code);
//     console.log(error.message);
//     console.log(error.email);
//     console.log(error.credential);
//  });
// }

function gmail(){
  let provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then((result)=> {
    var token = result.credential.accessToken;
    var user = result.user;
  }).catch((error) => {
    console.log(error.code);
    console.log(error.message);
    console.log(error.email);
    console.log(error.credential);
});
}
