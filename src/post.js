
// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();
db.settings({timestampsInSnapshots: true});

const listar = (user) =>{
  //LEER DOCUMENTOS
  let divPosts1 = document.getElementById("divPosts1");

  db.collection("posts").onSnapshot((postSnapshot) => {
    divPosts1.innerHTML='';

    postSnapshot.forEach((post) => {
          console.log(`${post.id} => ${post.data().post}`);
          console.log(`${post.data().userProfile.uid}`);
          console.log(user);

        if(`${post.data().userProfile.uid}` == user){

            divPosts1.innerHTML += `<div class= "posts">
            <div>
                <div class="card mt-5">
                    <div class="card-block">
                       <section class="post-heading">
                            <div class="row">
                                <div class="col-md-11">
                                    <div class="media">
                                      <div class="media-left" style="max-width:100%;width:auto;height:auto;">
                                        <a href="#">
                                          <img class="media-object photo-profile" alt="fotoUsuario" style="width:40px; height:auto; border-radius:50px" src="${post.data().userProfile.foto}">
                                        </a>
                                      </div>
                                      <div class="media-body">
                                        <a href="#" class="anchor-username"><h4 class="media-heading">${post.data().userProfile.nombre}</h4></a>
                                      </div>
                                    </div>
                                </div>
                            </div>
                       </section>
                       <section class="post-body">
                       <div id="divPost${post.id}"  >${post.data().post}</div>
                       <textarea id="txtArea${post.id}" style="display:none; width:355px; heigth:30px">${post.data().post}</textarea>
                       </section>
                       <section class="post-footer">
                           <hr>
                           <div class="post-footer-option container">
                                    <a href="#"><i style="heigth:5px" id="clickLikes${post.id}" class="fa fa-heart-o" onclick="countLikes('${post.id}', event)"></i></a></li><b id="count${post.id}">0</b>
                                    <button id="btnEditar${post.id}" type="button" class="btn btn-primary btn-sm" onClick="editarPost('${post.id}', '${post.data().post}')">Editar</button>
                                    <button id="btnGuardar${post.id}" type="button" class="btn btn-primary btn-sm hiden" onClick="guardarPost('${post.id}', '${post.data().post}')" >Guardar</button>
                                    <button id="btnEliminar${post.id}"type="button" class="btn btn-primary btn-sm" onClick="eliminarPost('${post.id}')">Eliminar</button>
                           </div>
                       </section>
                    </div>
                </div>
            </div>
        </div>
            `
        } else {
            divPosts1.innerHTML += `<div class="posts">
            <div >
                <div class="card mt-5">
                    <div class="card-block">
                       <section class="post-heading">
                            <div class="row">
                                <div class="col-md-11">
                                    <div class="media">
                                      <div class="media-left" style="max-width:100%;width:auto;height:auto;">
                                        <a href="#">
                                          <img class="media-object photo-profile" alt="fotoUsuario" style="width:40px; height:auto; border-radius:50px" src="${post.data().userProfile.foto}">
                                        </a>
                                      </div>
                                      <div class="media-body">
                                        <a class="anchor-username"><h4 class="media-heading">${post.data().userProfile.nombre}</h4></a>
                                      </div>
                                    </div>
                                </div>
                            </div>
                       </section>
                       <section class="post-body">
                        <div id="divPost${post.id}"  >${post.data().post}</div>
                        <textarea id="txtArea${post.id}" style="display:none; width:355px; heigth:30px">${post.data().post}</textarea>
                        </section>
                       <section class="post-footer">
                           <hr>
                           <div class="post-footer-option container">
                                    <a><i style="heigth:5px" id="clickLikes${post.id}" class="fa fa-heart-o" onclick="countLikes('${post.id}', event)"></i></a></li><b id="count${post.id}">0</b>
                                    <button id="btnEditar${post.id}" type="button" class="btn btn-primary btn-sm hiden" onClick="editarPost('${post.id}', '${post.data().post}')" >Editar</button>
                                    <button id="btnGuardar${post.id}" type="button" class="btn btn-primary btn-sm hiden" onClick="guardarPost('${post.id}', '${post.data().post}')" >Guardar</button>
                              <button id="btnEliminar${post.id}"type="button" class="btn btn-primary btn-sm hiden" onClick="eliminarPost('${post.id}')">Eliminar</button>
                           </div>

                       </section>
                    </div>
                </div>
            </div>
        </div>
            `

        }
        });
    });
}


const listarSinRegistro = () => {
  //LEER DOCUMENTOS
  let divPosts = document.getElementById("divPosts");

  db.collection("posts").onSnapshot((postSnapshot) => {
    divPosts.innerHTML='';
    postSnapshot.forEach((post) => {
          console.log(`${post.id} => ${post.data().post}`);

          divPosts.innerHTML += `<div class="posts">
          <div class="col-md-6 mt-5" >
              <div class="card">
                  <div class="card-block">
                     <section class="post-heading">
                          <div class="row">
                              <div class="col-md-11">
                                  <div class="media">
                                    <div class="media-left" style="max-width:100%;width:auto;height:auto;">
                                      <a href="#">
                                        <img class="media-object photo-profile" alt="fotoUsuario" style="width:40px; height:auto; border-radius:50px" src="${post.data().userProfile.foto}">
                                      </a>
                                    </div>
                                    <div class="media-body">
                                      <a href="#" class="anchor-username"><h4 class="media-heading">${post.data().userProfile.nombre}</h4></a>
                                    </div>
                                  </div>
                              </div>
                          </div>
                     </section>
                     <section class="post-body">
                     <div id="divPost${post.id}"  >${post.data().post}</div>
                     <textarea id="txtAreaDes${post.id}" style="display:none; width:355px; heigth:30px">${post.data().post}</textarea>
                     </section>
                     <section class="post-footer">
                         <hr>
                         <div class="post-footer-option container">

                                  <a href="#"><i style="heigth:5px" id="clickLikesDes${post.id}" class="fa fa-heart-o" onclick="countLikes('${post.id}', event)"></i></a></li><b id="count${post.id}">0</b>


                         </div>
                     </section>
                  </div>
              </div>
          </div>
      </div>
          `


      });
  });
}
// esto es de la linea 143
// <button id="btnEditar${post.id}" type="button" class="btn btn-primary btn-sm" onClick="editarPost('${post.id}', '${post.data().post}')">Editar</button>
// <button id="btnGuardar${post.id}" type="button" style="display:none" class="btn btn-primary btn-sm" onClick="guardarPost('${post.id}', '${post.data().post}')">Guardar</button>
// <button id="btnEliminar${post.id}"type="button" class="btn btn-primary btn-sm" onClick="eliminarPost('${post.id}')">Eliminar</button>

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

const countLikes = (id, event) =>{
    event.preventDefault();
    let count = parseInt(document.getElementById("count"+id).innerHTML);
  document.getElementById("count"+id).innerHTML = count+1;
}

//GUARDAR POST
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

listarSinRegistro();
