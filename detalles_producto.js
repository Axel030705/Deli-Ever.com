// Obtener los datos del producto almacenados en localStorage
const productoSeleccionado = JSON.parse(localStorage.getItem('productoSeleccionado'));

// Haz lo que necesites con los datos del producto, por ejemplo:
const imagenProducto = document.getElementById('imagenProducto');
imagenProducto.src = productoSeleccionado.imagenUrl;
document.getElementById('nombreProducto').textContent = productoSeleccionado.nombre;
document.getElementById('descripcionProducto').textContent = productoSeleccionado.descripcion;
document.getElementById('precioProducto').textContent = `Precio: $${productoSeleccionado.precio}`;
document.getElementById('extraProducto').textContent = productoSeleccionado.extra;
document.getElementById('cantidadProducto').textContent = `Cantidad disponible: ${productoSeleccionado.cantidad}`;