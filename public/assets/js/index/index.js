$(document).ready(function(){

  // Alertas de eliminación de elementos usando sweetalert2

  $(".form-delete-author").on('submit', function(e){
    e.preventDefault();

    const authorName = $(this).data("author-name");
    const form = this;

    Swal.fire({
      title: '¿Estás seguro de borrar a ' + authorName + '?',
      text: "No podrás volver atrás",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          url: $(form).attr('action'),
          method: $(form).attr('method'),
          data: $(form).serialize(),
          success: function(response) {
            Swal.fire(
              '¡Borrado!',
              'El autor ha sido borrado.',
              'success'
            ).then(() => {
              window.location.reload();
            });
          },
          error: function(err) {
            console.log(err);
            Swal.fire(
              '¡Error!',
              'Ha ocurrido un error al borrar el autor.',
              'error'
            );
          }
        });
      }
    });
  });

  $(".form-delete-book").on('submit', function(e){
    e.preventDefault();

    const bookName = $(this).data("book-name");
    const form = this;

    Swal.fire({
      title: '¿Estás seguro de borrar el libro ' + bookName + '?',
      text: "No podrás volver atrás",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          url: $(form).attr('action'),
          method: $(form).attr('method'),
          data: $(form).serialize(),
          success: function(response) {
            Swal.fire(
              '¡Borrado!',
              'El libro ha sido borrado.',
              'success'
            ).then(() => {
              window.location.reload();
            });
          },
          error: function(err) {
            console.log(err);
            Swal.fire(
              '¡Error!',
              'Ha ocurrido un error al borrar el libro.',
              'error'
            );
          }
        });
      }
    });
  });

  $(".form-delete-category").on('submit', function(e){
    e.preventDefault();

    const categoryName = $(this).data("category-name");
    const form = this;

    Swal.fire({
      title: '¿Estás seguro de borrar la categoria de ' + categoryName + '?',
      text: "No podrás volver atrás",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          url: $(form).attr('action'),
          method: $(form).attr('method'),
          data: $(form).serialize(),
          success: function(response) {
            Swal.fire(
              '¡Borrado!',
              'La categoria ha sido borrada.',
              'success'
            ).then(() => {
              window.location.reload();
            });
          },
          error: function(err) {
            console.log(err);
            Swal.fire(
              '¡Error!',
              'Ha ocurrido un error al borrar la categoria.',
              'error'
            );
          }
        });
      }
    });
  });

  $(".form-delete-editorial").on('submit', function(e){
    e.preventDefault();

    const editorialName = $(this).data("editorial-name");
    const form = this;

    Swal.fire({
      title: '¿Estás seguro de borrar la editorial ' + editorialName + '?',
      text: "No podrás volver atrás",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          url: $(form).attr('action'),
          method: $(form).attr('method'),
          data: $(form).serialize(),
          success: function(response) {
            Swal.fire(
              '¡Borrado!',
              'La editorial ha sido borrada.',
              'success'
            ).then(() => {
              window.location.reload();
            });
          },
          error: function(err) {
            console.log(err);
            Swal.fire(
              '¡Error!',
              'Ha ocurrido un error al borrar la editorial.',
              'error'
            );
          }
        });
      }
    });
  });

    // validaciones para el formulario usando boostrap
  
    $(".btn-crear-validations").on("click",function(){
        
        (function () {
            'use strict'
           
            var forms = document.querySelectorAll('.needs-validation')
        
            Array.prototype.slice.call(forms)
            .forEach(function (form) {
                form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }
        
                form.classList.add('was-validated')
                }, false)
            })
        })()
    });

})

//arreglar esto