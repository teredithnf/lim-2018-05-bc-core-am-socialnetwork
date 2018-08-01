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

const guardaDatos = (user) => {
  let usuario = {
    uid: user.uid,
    nombre: user.displayName,
    email: user.email,
    foto: user.photoURL,
  }
  firebase.database().ref('Users/' + user.uid)
  .set(usuario)
  userProfile = getUserProfile(user); //json
}

const registerVal = (email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((result) => {
      alert('confirma tu correo electronico')
      const user = {
        uid: result.user.uid,
        displayName: document.getElementById('name').value,
        email: result.user.email,
        photoURL: 'http://subirimagen.me/uploads/20180725011911.png',
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
};

const close = () => {
    firebase.auth().signOut()
    .then(()=>{
      alert('Saliendo...');
      login.classList.remove("hiden");
      register.classList.remove("hiden");
      close.classList.add("hiden");
      content.innerHTML = '';
    }).catch((error) => {
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
      // $('#content').append("<img src=${result.user.photoURL}/>")
  }).catch((error)=> {
    console.log(error.code);
    console.log(error.message);
    console.log(error.email);
    console.log(error.credential);
});
}

const gmailLogin = () => {
  let provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
  .then((result)=> {
    var token = result.credential.accessToken;
    var user = result.user;
    console.log(user)
    guardaDatos(result.user)
    // $('#content').append("<img src=${{result.user.photoURL}}/>")
  }).catch((error) => {
    console.log(error.code);
    console.log(error.message);
    console.log(error.email);
    console.log(error.credential);
});
};

const getUserProfile = (user) => {
  return {
    uid: user.uid,
    nombre: user.displayName,
    foto: user.photoURL
  };
};

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
const validadorEmail = (email) => {
    if (/^([a-zA-Z0-9._-]{3,})+@([a-zA-Z0-9.-]{5,})+\.([a-zA-Z]{2,})+$/.test(email)) {
        return true;
    } else {
        return false;
    }
}
const validadorPassword = (password) => {
    if (/^([A-Za-z0-9]{8,})+$/g.test(password)) {
        return true;
    } else {
        return false;
    }
}

window.validadorNombre = validadorNombre;
window.validadorEmail = validadorEmail;
window.validadorPassword = validadorPassword;
