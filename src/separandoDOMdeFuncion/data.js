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

window.onload = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log('existe usuario');
      // aparece();
      // let displayName = user.displayName;
      let email = user.email;
      let emailVerified = user.emailVerified;
      let photoURL = user.photoURL;
      let isAnonymous = user.isAnonymous;
      let uid = user.uid;
      let providerData = user.providerData;
      content.innerHTML = `<p>Bienvenido  ${user.displayName}</p>`
      guardaDatos(user)
    } else {
      console.log('no existe usuario');
      content.innerHTML = ``
    }
  });
}

const registerVal = (email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((result) => {
      console.log(result.user);
    verificar();
    guardaDatos(result.user);
  }).catch((error) => {
  // Handle Errors here.
  let errorCode = error.code;
  let errorMessage = error.message;
  console.log(errorCode);
  console.log(errorMessage);
  });
}

const ingresoVal = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(()=>{
    alert('Usuario con login exitoso');
  })
  .catch((error) => {
  let errorCode = error.code;
  let errorMessage = error.message;
  alert('Error en firebase >'+ errorCode);
  alert('Error en firebase >'+ errorMessage);
  });
}

// const aparece = (user) => {
//     let user = user;
//     // let contenido = document.getElementById('content');
//     if (user.emailVerified) {
//       let contenido = document.getElementById('content1')
//       contenido.innerHTML = `
//       <div class="container mt-5">
//       <div class="alert alert-success" role="alert">
//       <h4 class="alert-heading">Bienvenido! ${user.email}</h4>
//       <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
//       <hr>
//       <p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
//       </div>
//       <button onclick="close()" id="close" class="btn btn-danger">Cerrar sesión</button>
//       </div>
//     `
//     }
//   }

// const observador = () => {
//   firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//       console.log('existe usuario');
//       // aparece();
//       let displayName = user.displayName;
//       let email = user.email;
//       let emailVerified = user.emailVerified;
//       let photoURL = user.photoURL;
//       let isAnonymous = user.isAnonymous;
//       let uid = user.uid;
//       let providerData = user.providerData;
//       content.innerHTML = ` bienvenido ${user.displayName}`
//       guardaDatos(user)
//     } else {
//       console.log('no existe usuario');
//       content.innerHTML = ``
//     }
//   });
//   }
//   observador();


const close = () => {
    firebase.auth().signOut()
    .then(()=>{
      alert('Saliendo...');
    })
    .catch((error) => {
      console.log(error);
    })
  }

const verificar = () => {
  let user = firebase.auth().currentUser;
  user.sendEmailVerification().then(function(){
    alert('enviando correo');
  }).catch((error) => {
    console.log(error);
  })
}

const facebookLogin = () => {
  let provider = new firebase.auth.FacebookAuthProvider();
  provider.setCustomParameters({
  'display': 'popup'
  });
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      console.log(result);
      guardaDatos(result.user)
      // $('#content').append("<img src='"+result.user.photoURL+ "'/>")
  }).catch((error)=> {
    console.log(error.code);
    console.log(error.message);
    console.log(error.email);
    console.log(error.credential);
})
}

const gmailLogin = () => {
  let provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
  .then((result)=> {
    var token = result.credential.accessToken;
    var user = result.user;
    console.log(user)
    guardaDatos(result.user)
    // $('#content').append("<img src='"+result.user.photoURL+ "'/>")
  }).catch((error) => {
    console.log(error.code);
    console.log(error.message);
    console.log(error.email);
    console.log(error.credential);
});
}

const guardaDatos = (user) => {
  let usuario = {
    uid: user.uid,
    nombre: user.displayName,
    email: user.email,
    foto: user.photoURL,
    emailVerified: user.emailVerified
  }
  firebase.database().ref('angie/' + user.uid)
  .set(usuario)

  // userProfile = getUserProfile(user); //json
}

// const getUserProfile = (user) => {
//   return {
//     uid: user.uid,
//     nombre: user.displayName,
//     foto: user.photoURL
//   };
// };
