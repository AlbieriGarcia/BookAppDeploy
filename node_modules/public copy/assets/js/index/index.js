$(document).ready(function(){

  // Alertas de eliminación de elementos usando sweetalert2

  $(".form-delete-pokemon").on('submit', function(e){
    e.preventDefault();

    const pokemonName = $(this).data("pokemon-name");
    const form = this;

    Swal.fire({
      title: '¿Estás seguro de borrar a ' + pokemonName + '?',
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
              'El pokemon ha sido borrado.',
              'success'
            ).then(() => {
              window.location.reload();
            });
          },
          error: function(err) {
            console.log(err);
            Swal.fire(
              '¡Error!',
              'Ha ocurrido un error al borrar el pokemon.',
              'error'
            );
          }
        });
      }
    });
  });

  $(".form-delete-region").on('submit', function(e){
    e.preventDefault();

    const regionName = $(this).data("region-name");
    const form = this;

    Swal.fire({
      title: '¿Estás seguro de borrar la región ' + regionName + '?',
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
              'La región ha sido borrado.',
              'success'
            ).then(() => {
              window.location.reload();
            });
          },
          error: function(err) {
            console.log(err);
            Swal.fire(
              '¡Error!',
              'Ha ocurrido un error al borrar la región.',
              'error'
            );
          }
        });
      }
    });
  });

  $(".form-delete-tipo").on('submit', function(e){
    e.preventDefault();

    const tipoName = $(this).data("tipo-name");
    const form = this;

    Swal.fire({
      title: '¿Estás seguro de borrar el tipo ' + tipoName + '?',
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
              'El tipo ha sido borrado.',
              'success'
            ).then(() => {
              window.location.reload();
            });
          },
          error: function(err) {
            console.log(err);
            Swal.fire(
              '¡Error!',
              'Ha ocurrido un error al borrar el tipo.',
              'error'
            );
          }
        });
      }
    });
  });

    // validaciones para el formulario usando boostrap
  
    $("#btn-crear-pokemon").on("click",function(){
        
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