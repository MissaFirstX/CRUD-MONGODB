

function eliminar(id) {
  const url = 'http://localhost:3000/api/deleteTarea/' + id.toString();
  fetch(url, {
    method: 'DELETE'
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al eliminar tarea');
      }
      return response.json();
    })
    .then(data => {
      if (data.message) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Completada',
          text: data.message,
          showConfirmButton: false,
          timer: 2000
        });
        get();
      } else {
        throw new Error('Error en la respuesta de la API');
      }
    })
    .catch((error) => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Error',
        text: error,
        showConfirmButton: false,
        timer: 2000
      });
    });
}

function get() {
  fetch('http://localhost:3000/api/getTareas')
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al obtener tareas');
      }
      return response.json();
    })
    .then(data => {
      const tbody = document.querySelector('table tbody');
      let contenido = '';
      data.forEach((tarea, index) => {
        contenido +=
          '<tr>' +
          '<th>' + (index + 1) + '</th>' +
          '<th>' + tarea.nombre + '</th>' +
          '<th>' + tarea.descripcion + '</th>' +
          '<th><a href="#" onclick="eliminar(\'' + tarea._id + '\');" class="float-end"><i class="fas fa-check"></i></a></th>' +
          '</tr>';
      });
      tbody.innerHTML = contenido;
    })
    .catch(error => {
      console.log(error);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Error',
        text: error,
        showConfirmButton: false,
        timer: 2000
      });
    });
}

function nuevo(){
  document.getElementById('txtNombre').value = '';
  document.getElementById('txtDescripcion').value = '';
}

const guardarBtn = document.querySelector('.btn-primary');

guardarBtn.addEventListener('click', () => {
  const titulo = document.getElementById('txtNombre').value;
  const descripcion = document.getElementById('txtDescripcion').value;

  // Creamos un objeto con los datos de la tarea
  const tarea = {
    nombre: titulo,
    descripcion: descripcion,
    fecha: new Date().toISOString() // La fecha la generamos automáticamente
  };

  // Enviamos los datos al servidor utilizando fetch
  fetch('http://localhost:3000/api/crearTarea', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(tarea)
  })
    .then(response => response.json())
    .then(data => {
      if (data._id) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Guardado',
          showConfirmButton: false,
          timer: 2000
        });
      } else if (data.message) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error',
          text: data.message.message,
          showConfirmButton: false,
          timer: 2000
        });
      }
    })
    .catch(error => console.log(error));
  get();
});

get();