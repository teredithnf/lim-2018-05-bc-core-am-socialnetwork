contenidoParaNoLogueados = `
<div class="posts">
<div class="col-md-6 mt-5">
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
           <div id="divPost${post.id}">${post.data().post}</div>
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
