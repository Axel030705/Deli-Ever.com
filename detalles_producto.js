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

// Agregar un evento click al botón de comprar
document.getElementById('Btn_comprar').addEventListener('click', function () {
    // Obtener la cantidad ingresada por el usuario
    const cantidad = parseInt(document.getElementById('cantidad').value);
    // Verificar si la cantidad está dentro del inventario disponible
    if (cantidad <= productoSeleccionado.cantidad) {
        // Aquí puedes agregar la lógica para procesar la compra
        console.log('Procesando compra de', cantidad, 'productos');
        // Redirigir al usuario a una página de confirmación de compra, por ejemplo:
        window.location.href = 'confirmacion_compra.html';
    } else {
        // Mostrar un mensaje de error si la cantidad excede el inventario disponible
        alert('La cantidad seleccionada excede el inventario disponible');
    }
});