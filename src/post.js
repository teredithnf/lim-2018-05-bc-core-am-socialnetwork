// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();
db.settings({timestampsInSnapshots: true});

const listarPrivados = () => {
    let query = db.collection("posts")
                    .where("type", "==", "Privado")
                    .where("userProfile.uid","==",`${userProfile.uid}`)
                    .orderBy("createdAt","desc");
    query.onSnapshot((postSnapshot) => {
        createPost(postSnapshot);
    });
};

const listarPublicos = () => {
    let query = db.collection("posts")
                    .where("type", "==", "Público")
                    .orderBy("createdAt","desc");
    query.onSnapshot((postSnapshot) => {
        createPost(postSnapshot);
    }); 
};

const createPost = (postSnapshot) => {
    let divPosts = document.getElementById("divPosts");
    if(divPosts){

        if(postSnapshot.empty) {
            divPosts.innerHTML = '<h3>No hay Posts :(</h3>';
        }else {
            divPosts.innerHTML = '';
            postSnapshot.forEach((post) => {
                divPosts.innerHTML += `
                <div class="posts">
                  <div>
                      <div class="card mt-5">
                          <div class="card-block">
                             <section class="post-heading">
                                  <div class="row">
                                      <div class="col-md-12">
                                          <div class="media">
                                            <div class="media-left divPhoto">
                                              <a href="#">
                                                <img class="media-object photo-profile" alt="fotoUsuario"git checkout g src="${post.data().userProfile.foto}">
                                              </a>
                                            </div>
                                            <div class="media-body">
                                              <a href="#" class="anchor-username"><h4 class="media-heading">${post.data().userProfile.nombre}</h4></a>
                                            </div>
                                          </div>
                                        </div>
                                    </div>
                                </div>
                           </section>
                           <section class="post-body">
                           <div id="divPost${post.id}" class="post-message" >${post.data().post}</div>
                           <textarea id="txtArea${post.id}" style="display:none; width:355px; heigth:30px">${post.data().post}</textarea>
                           </section>
                           <section class="post-footer">
                               <hr>
                               <div class="post-footer-option container">
      
                                        <a href="#"><i style="heigth:5px" id="clickLikes${post.id}" class="fa fa-heart-o" onclick="countLikes('${post.id}',${post.data().like}, event)"></i></a></li><b id="count${post.id}">${post.data().like}</b>
      
                                        ${ (isUserAuthenticate &&  post.data().userProfile.uid === userProfile.uid )  ? `
                                        <button id="btnEditar${post.id}" type="button" class="btn btn-primary btn-sm" onClick="editarPost('${post.id}', '${post.data().post}')" >Editar</button>
                                        <button id="btnGuardar${post.id}" type="button" style="display:none" class="btn btn-primary btn-sm" onClick="guardarPost('${post.id}', '${post.data().post}')" >Guardar</button>
                                        <button id="btnEliminar${post.id}"type="button" class="btn btn-primary btn-sm" onClick="eliminarPost('${post.id}')">Eliminar</button>
                                        `: '' }
                               </div>
                           </section>
                        </div>
                    </div>
                </div>
            </div>
                `;
            });
        }
    }
};

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
  };
}

const eliminarPost = (id) => {
  var r = confirm("Estas seguro de Eliminar la publicación");
  if (r == true) {
      db.collection("posts").doc(id).delete().then(function() {
          console.log("Document successfully deleted!");
      }).catch(function(error) {
          console.error("Error removing document: ", error);
      });
  };
};

const countLikes = (id, like, event) => {
    event.preventDefault();
    let likeUpdate = like + 1;
    firebase.firestore().collection('posts').doc(id).update({
        like: likeUpdate
    });
    document.getElementById("count"+id).innerHTML = likeUpdate;
}

//GUARDAR POST
const guardar  = () => {
  console.log(userProfile);
   //json
    let post = document.getElementById("txtAreaPost").value;
    if(post.trim().length === 0){
      alert('Debe ingresar un mensaje');
      return;
    }else{

      db.collection("posts").add({
        post: post,
        userProfile: userProfile,
        like: 0,
        type: document.getElementById('sltPostType').value,
        createdAt: new Date(),
      })
      .then((docRef) => {
        document.getElementById("txtAreaPost").value = '';
/*         setTimeout(()=>{
          console.log("Document written with ID: ", docRef.id);
        },2000)

          console.log(docRef); */
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    };
}

const btnPublicar = document.getElementById("btnPublicar");
btnPublicar.addEventListener("click", guardar);
