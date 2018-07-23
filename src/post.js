// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();
db.settings({timestampsInSnapshots: true});

const listar = () =>{
  //LEER DOCUMENTOS
  let divPosts = document.getElementById('divPosts');
  db.collection("posts").onSnapshot((postSnapshot) => {
    divPosts.innerHTML='';
    postSnapshot.forEach((post) => {
          console.log(`${post.id} => ${post.data().post}`);
          divPosts.innerHTML += `
          <div class="container mt-5">
            <div>${post.data().userProfile.nombre}</div>
            <div>${post.data().post}</div>
            <button class="btn btn-danger" onclick="eliminar('${post.id}')">Eliminar</button>
            <button class="btn btn-warning" onclick="editar('${post.id}','${post.data().post}')">Editar</button>
        </div>`
      });
<<<<<<< HEAD
  });
=======
  });    
>>>>>>> f5b036217bb75d4e93caf88adc0d8d98a48c86b8
}


const guardar  = () => {
    let post = document.getElementById('txtPost').value;
    if(post.trim().length === 0){
      alert('Debe ingresar un mensaje');
      return;
    }else{
      db.collection("posts").add({
        post: post,
        userProfile: userProfile
      })
      .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
          document.getElementById('txtPost').value = '';
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    }
   
}

  ///// BORRAR DOCUMENTOS
  function eliminar(id) {
    var r = confirm("Estas seguro de Editar la publicacion");
    if (r == true) {
        db.collection("posts").doc(id).delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
<<<<<<< HEAD
=======

>>>>>>> f5b036217bb75d4e93caf88adc0d8d98a48c86b8
    } else {
    }
  }

  ///EDITAR DOCUMENTOS//
  function editar(id, post) {
    document.getElementById('txtPost').value = post;
    const btnPublicar = document.getElementById('btnPublicar');
    btnPublicar.innerHTML = 'Modificar';
<<<<<<< HEAD

    btnPublicar.onclick = function() {
      var postReference = db.collection("posts").doc(id);

      let txtPostValue = document.getElementById('txtPost').value;

      // TODO colocar alerta de confirmacion de actuaizar datos

        //var txt;
        var r = confirm("Estas seguro de Editar la publicacion");
        if (r == true) {
=======
  
    btnPublicar.onclick = function() {
      var postReference = db.collection("posts").doc(id);
  
      let txtPostValue = document.getElementById('txtPost').value;
      
      // TODO colocar alerta de confirmacion de actuaizar datos 
      
        //var txt;
        var r = confirm("Estas seguro de Editar la publicacion");
        if (r == true) {
          
>>>>>>> f5b036217bb75d4e93caf88adc0d8d98a48c86b8
        postReference.update({
            post : txtPostValue
          })
          .then(()=> {
              console.log("Document successfully updated!");
          })
          .catch((error)=> {
              // The document probably doesn't exist.
              console.error("Error updating document: ", error);
          });
<<<<<<< HEAD
        } else {
=======
            
        } else {
            
>>>>>>> f5b036217bb75d4e93caf88adc0d8d98a48c86b8
        }
        btnPublicar.innerHTML = "Publicar";
        btnPublicar.onclick = guardar;
        document.getElementById('txtPost').value = '';
<<<<<<< HEAD
=======
  
>>>>>>> f5b036217bb75d4e93caf88adc0d8d98a48c86b8
    }
  }

  listar();
