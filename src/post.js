
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
            <input id=publicado"">${post.data().post}</input>
            <button id="btnEliminar"class="btn btn-danger" onclick="eliminar('${post.id}')">Eliminar</button>
            <button id="btnEditar"class="btn btn-warning" onclick="editar('${post.id}','${post.data().post}')">Editar</button>
            <p id="contador">0</p>
    <button type="button" class="btn btn-light" onclick="countLikes()"><img class="w-80" src="../src/image/like.png"/>LIKE</button>
        </div>`

      let publicado = document.getElementById('publicado');
        publicado.disabled = true;
      });
  });    
}

let contador = 0;
    let time;
    let on = false;
    let seconds = 0;

    let countLikes = () =>{
      if(seconds >= 10){
        document.getElementById('contador').innerHTML = contador + 0;
      }else{
        document.getElementById('contador').innerHTML = contador += 1;
      }
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
  const eliminar = (id) => {
    var r = confirm("Estas seguro de Editar la publicacion");
    if (r == true) {
        db.collection("posts").doc(id).delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });

    } else {

    }

  }

  ///EDITAR DOCUMENTOS//
  function editar(id, post) {
    document.getElementById('divPosts').value = post;
    const btnEditar = document.getElementById('btnEditar');
    btnEditar.innerHTML = 'Guardar';
  
    btnEditar.onclick = function() {
      var postReference = db.collection("posts").doc(id);
  
      let txtPostValue = document.getElementById('divPosts').value;
      
      // TODO colocar alerta de confirmacion de actuaizar datos 
        //var txt;
        var r = confirm("Estas seguro de Editar la publicacion");
        if (r == true) {
          
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
            
        } else {
            
        }
        btnEditar.innerHTML = "Publicar";
        btnEditar.onclick = guardar;
        //document.getElementById('txtPost').value = '';
  
    }
  }

  listar();
