
// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();
db.settings({timestampsInSnapshots: true});

const listar = () =>{
  //LEER DOCUMENTOS
  let divPosts = document.getElementById("divPosts");
  db.collection("posts").onSnapshot((postSnapshot) => {
    divPosts.innerHTML='';
    postSnapshot.forEach((post) => {
          console.log(`${post.id} => ${post.data().post}`);

          divPosts.innerHTML += `
          <div class="form-group col-6">
              <div class="container mt-5">
                <div><b>${post.data().userProfile.nombre}</b></div>
                <div id="divPost${post.id}" style="height:100px; width:500px; background-color:#dee9f7" >${post.data().post}</div>
                <textarea id="txtArea${post.id}" cols="60" rows="3" style="height:100px; width:500px; display:none" >${post.data().post}</textarea>
                
                <button id="btnEditar${post.id}" class="btn btn-warning btn-sm" onclick="editarPost('${post.id}', '${post.data().post}')" >Editar</button>
                <button id="btnGuardar${post.id}" class="btn btn-warning btn-sm" onclick="guardarPost('${post.id}', '${post.data().post}')" style="display:none">Guardar</button>
                <button id="btnEliminar${post.id}" class="btn btn-danger btn-sm" onclick="eliminarPost('${post.id}')">Eliminar</button>            
                
                <button type="button" class="btn btn-light" style="width:150px" onclick="countLikes('${post.id}')"><img class="w-80" src="../src/image/like.png"/>LIKE <b id="count${post.id}">0</b> </button>
              </div>
            </div>
          </div>`

      });
  });    
}

const editarPost = (id, post) => {
  document.getElementById("divPost"+id).style.display = "none";
  document.getElementById("txtArea"+id).style.display = "block";

  document.getElementById("btnEditar"+id).style.display = "none";
  document.getElementById("btnGuardar"+id).style.display = "inline";
}

const guardarPost = (id, post) => {
  document.getElementById("divPost"+id).style.display = "block";
  document.getElementById("txtArea"+id).style.display = "none";

  document.getElementById("btnEditar"+id).style.display = "inline";
  document.getElementById("btnGuardar"+id).style.display = "none";

  const postMessage = document.getElementById("txtArea"+id).value;
  const postReference = db.collection("posts").doc(id);

  const confirmado = confirm("Estas seguro de Editar la publicación");
  if (confirmado == true) {
      postReference.update({
        post : postMessage
      }).then(()=> {
          console.log("Document successfully updated!");
      }).catch((error)=> {
          console.error("Error updating document: ", error);
      });
  } 

}

const eliminarPost = (id) => {
  var r = confirm("Estas seguro de Eliminar la publicación");
  if (r == true) {
      db.collection("posts").doc(id).delete().then(function() {
          console.log("Document successfully deleted!");
      }).catch(function(error) {
          console.error("Error removing document: ", error);
      });

  } 
}

const countLikes = (id) =>{
  let count = parseInt(document.getElementById("count"+id).innerHTML);
  document.getElementById("count"+id).innerHTML = count+1;
}

// GUARDAR POST
const guardar  = () => {
    let post = document.getElementById("txtAreaPost").value;
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
          document.getElementById("txtAreaPost").value = '';
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    }
}

const btnPublicar = document.getElementById("btnPublicar");
btnPublicar.addEventListener("click", guardar);

listar();
