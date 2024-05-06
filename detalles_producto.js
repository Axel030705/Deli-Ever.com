import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, ref, update, get, onValue } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBtBtN6py9WVmPz7siJ8jBaAwURLdx_mCg",
    authDomain: "student-app-fb310.firebaseapp.com",
    databaseURL: "https://student-app-fb310-default-rtdb.firebaseio.com",
    projectId: "student-app-fb310",
    storageBucket: "student-app-fb310.appspot.com",
    messagingSenderId: "48534996518",
    appId: "1:48534996518:web:12af5240d14ba2c52888e7",
    measurementId: "G-C8HV6YSD6X"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Obtener los datos del producto almacenados en localStorage
let productoSeleccionado = JSON.parse(localStorage.getItem('productoSeleccionado'));

// Función para mostrar los productos en la página
function mostrarProducto(producto) {
    const imagenProducto = document.getElementById('imagenProducto');
    imagenProducto.src = producto.imagenUrl;
    document.getElementById('nombreProducto').textContent = producto.nombre;
    document.getElementById('descripcionProducto').textContent = producto.descripcion;
    document.getElementById('precioProducto').textContent = `Precio: $${producto.precio}`;
    document.getElementById('extraProducto').textContent = producto.extra;
    document.getElementById('cantidadProducto').textContent = `Cantidad disponible: ${producto.cantidad}`;
}

// Función para actualizar el producto en la página y en localStorage
function actualizarProductoEnPagina(producto) {
    mostrarProducto(producto);
    // Actualizar en localStorage si es necesario
    localStorage.setItem('productoSeleccionado', JSON.stringify(producto));
}

// Mostrar el producto en la página
mostrarProducto(productoSeleccionado);

// Establecer un listener en el nodo del producto en la base de datos
const productoRef = ref(database, `Tienda/${productoSeleccionado.idTienda}/productos/${productoSeleccionado.id}`);
onValue(productoRef, (snapshot) => {
    const productoActualizado = snapshot.val();
    // Actualizar el producto en la página si hay cambios en la base de datos
    actualizarProductoEnPagina(productoActualizado);
});

// Agregar un evento click al botón de comprar
document.getElementById('Btn_comprar').addEventListener('click', async function () {
    try {
        // Obtener la cantidad ingresada por el usuario
        const cantidad = parseInt(document.getElementById('cantidad').value);
        
        // Verificar si la cantidad está dentro del inventario disponible
        if (cantidad <= productoSeleccionado.cantidad) {
            const nuevoInventario = productoSeleccionado.cantidad - cantidad;
            
            // Actualizar la cantidad en la base de datos
            await update(productoRef, { cantidad: nuevoInventario });
            window.location.href = 'confirmacion_compra.html';
        } else {
            alert('La cantidad seleccionada excede el inventario disponible');
        }
    } catch (error) {
        alert('Error al procesar la compra. Inténtalo de nuevo más tarde.');
    }
});

