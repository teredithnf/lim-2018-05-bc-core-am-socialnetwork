
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

          divPosts.innerHTML += `<div class="container">
          <div class="col-md-5">
              <div class="panel panel-default">
                  <div class="panel-body">
                     <section class="post-heading">
                          <div class="row">
                              <div class="col-md-11">
                                  <div class="media">
                                    <div class="media-left">
                                      <a href="#">
                                        <img class="media-object photo-profile" src="http://0.gravatar.com/avatar/38d618563e55e6082adf4c8f8c13f3e4?s=40&d=mm&r=g" width="40" height="40" alt="...">
                                      </a>
                                    </div>
                                    <div class="media-body">
                                      <a href="#" class="anchor-username"><h4 class="media-heading">${post.data().userProfile.nombre}</h4></a>
                                    </div>
                                  </div>
                              </div>
                               <div class="col-md-1">
                                   <a href="#"><i class="glyphicon glyphicon-chevron-down"></i></a>
                               </div>
                          </div>
                     </section>
                     <section class="post-body">
                     <p id="areaPost${post.id}">${post.data().post}</p>
                     </section>
                     <section class="post-footer">
                         <hr>
                         <div class="post-footer-option container">
                              <ul class="list-unstyled">
                                  <li><a href="#"><i id="clickLikes${post.id}" class="glyphicon glyphicon-thumbs-up" onclick="countLikes('${post.id}')"></i></a></li><b id="count${post.id}">0</b>
                                  <li><a href="#"><i id="clickCommnet${post.id}" class="glyphicon glyphicon-comment" ></i></a></li>
                              </ul>
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

// const editarPost = (id, post) => {
//   document.getElementById("divPost"+id).style.display = "none";
//   document.getElementById("txtArea"+id).style.display = "block";

//   document.getElementById("btnEditar"+id).style.display = "none";
//   document.getElementById("btnGuardar"+id).style.display = "inline";
// }

// const guardarPost = (id, post) => {
//   document.getElementById("divPost"+id).style.display = "block";
//   document.getElementById("txtArea"+id).style.display = "none";

//   document.getElementById("btnEditar"+id).style.display = "inline";
//   document.getElementById("btnGuardar"+id).style.display = "none";

//   const postMessage = document.getElementById("txtArea"+id).value;
//   const postReference = db.collection("posts").doc(id);

//   const confirmado = confirm("Estas seguro de Editar la publicación");
//   if (confirmado == true) {
//       postReference.update({
//         post : postMessage
//       }).then(()=> {
//           console.log("Document successfully updated!");
//       }).catch((error)=> {
//           console.error("Error updating document: ", error);
//       });
//   }

// }

// const eliminarPost = (id) => {
//   var r = confirm("Estas seguro de Eliminar la publicación");
//   if (r == true) {
//       db.collection("posts").doc(id).delete().then(function() {
//           console.log("Document successfully deleted!");
//       }).catch(function(error) {
//           console.error("Error removing document: ", error);
//       });

//   }
// }

const countLikes = (id) =>{
  let count = parseInt(document.getElementById("count"+id).innerHTML);
  document.getElementById("count"+id).innerHTML = count+1;
}

// GUARDAR POST
// const guardar  = () => {
//     let post = document.getElementById("txtAreaPost").value;
//     if(post.trim().length === 0){
//       alert('Debe ingresar un mensaje');
//       return;
//     }else{
//       db.collection("posts").add({
//         post: post,
//         userProfile: userProfile
//       })
//       .then(function(docRef) {
//           console.log("Document written with ID: ", docRef.id);
//           document.getElementById("txtAreaPost").value = '';
//         })
//         .catch(function(error) {
//           console.error("Error adding document: ", error);
//         });
//     }
// }

// const btnPublicar = document.getElementById("btnPublicar");
// btnPublicar.addEventListener("click", guardar);

listar();
