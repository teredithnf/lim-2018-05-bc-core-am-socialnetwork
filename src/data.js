let config = {
  apiKey: "AIzaSyAyU-144GII0BR3pdmRcq70rWM_9-fKthY",
  authDomain: "socialnetwork-proyect.firebaseapp.com",
  databaseURL: "https://socialnetwork-proyect.firebaseio.com",
  projectId: "socialnetwork-proyect",
  storageBucket: "socialnetwork-proyect.appspot.com",
  messagingSenderId: "1041163805568"
};

firebase.initializeApp(config);

let userProfile = {};

const register = document.getElementById('register');


register.addEventListener('click', ()=> {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function (result){
      const user = {
          uid: result.user.uid,
          displayName: document.getElementById('name').value,
          email: result.user.email,
          photoURL: '',//urlavatar,
          emailVerified: null,
      }
    guardaDatos(user)
    verificar();

  }).catch((error) => {
  // Handle Errors here.
  let errorCode = error.code;
  let errorMessage = error.message;
  console.log(errorCode);
  console.log(errorMessage);
  });
})

const ingreso = document.getElementById('ingreso');

ingreso.addEventListener('click', ()=>{
  let email2 = document.getElementById('email2').value;
  let password2 = document.getElementById('password2').value;
  firebase.auth().signInWithEmailAndPassword(email2, password2)
  .then((result)=>{
    alert('Usuario con login exitoso');
  })
  .catch((error) => {
  // Handle Errors here.
  let errorCode = error.code;
  let errorMessage = error.message;
  alert('Error en firebase >'+ errorCode);
  alert('Error en firebase >'+ errorMessage);
  });
})


function observador(){
  firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log('existe usuario');
    // aparece();
    // User is signed in.
    let displayName = user.displayName;
    let email = user.email;
    let emailVerified = user.emailVerified;
    let photoURL = user.photoURL;
    let isAnonymous = user.isAnonymous;
    let uid = user.uid;
    let providerData = user.providerData;
    content.innerHTML = ` bienvenido ${user.displayName || document.getElementById('name').value}`
    // guardaDatos(user)
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

// let contenido = document.getElementById('content');

// function aparece(user){
//   let user = user;
//   // let contenido = document.getElementById('content');
//   if (user.emailVerified) {
//     content.innerHTML = `
//     <div class="container mt-5">
//     <div class="alert alert-success" role="alert">
//     <h4 class="alert-heading">Bienvenido! ${user.email}</h4>
//     <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
//     <hr>
//     <p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
//     </div>
//     <button onclick="close()" class="btn btn-danger">Cerrar sesión</button>
//     </div>
//   `
//   }
// }

const close = () => {
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
let content = document.getElementById('content');

facebook.addEventListener('click', () => {
  let provider = new firebase.auth.FacebookAuthProvider();
  provider.setCustomParameters({
  'display': 'popup'
  });
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      console.log(result);
      guardaDatos(result.user)
      // content.innerHTML = ` <img src="${{result.user.photoURL}}" class="avatar">`
      $('#content').append("<img src='"+result.user.photoURL+ "'/>")
  }).catch((error)=> {
    console.log(error.code);
    console.log(error.message);
    console.log(error.email);
    console.log(error.credential);
 });
})

let gmail = document.getElementById('gmail');
gmail.addEventListener('click', ()=> {
  let provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
  .then((result)=> {
    var token = result.credential.accessToken;
    var user = result.user;
    console.log(user)
    guardaDatos(result.user)
    $('#content').append("<img src='"+result.user.photoURL+ "'/>")
  }).catch((error) => {
    console.log(error.code);
    console.log(error.message);
    console.log(error.email);
    console.log(error.credential);
});
})
//funcion para guardar a los usuarios autenticados en la base de datos
function guardaDatos(user){
  let usuario = {
    uid: user.uid,
    nombre: user.displayName,
    email: user.email,
    foto: user.photoURL,
    emailVerified: user.emailVerified
  }
  firebase.database().ref('User/' + user.uid)
  .set(usuario)

  userProfile = getUserProfile(user); //json
}

const getUserProfile = (user) => {
  return {
    uid: user.uid,
    nombre: user.displayName,
    foto: user.photoURL
  };
}
