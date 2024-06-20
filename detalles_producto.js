import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, ref, update, get, onValue } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBPUzD4vFqqtCWQ3Pxf-x9eSWZKT3x2UHY",
    authDomain: "deli-ever-ee94d.firebaseapp.com",
    databaseURL: "https://deli-ever-ee94d-default-rtdb.firebaseio.com",
    projectId: "deli-ever-ee94d",
    storageBucket: "deli-ever-ee94d.appspot.com",
    messagingSenderId: "867324946309",
    appId: "1:867324946309:web:f9c132a70d7f29138a06ec",
    measurementId: "G-HGHQV4M9KR"
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
        if(cantidad < 1){    
            alert('La cantidad debe ser al menos 1');
        }else{
        // Verificar si la cantidad está dentro del inventario disponible
        if (cantidad <= productoSeleccionado.cantidad) {
            const nuevoInventario = productoSeleccionado.cantidad - cantidad;
            
            // Actualizar la cantidad en la base de datos
            await update(productoRef, { cantidad: nuevoInventario });
            window.location.href = 'confirmacion_compra.html';
        } else {
            alert('La cantidad seleccionada excede el inventario disponible');
        }
    }
    } catch (error) {
        alert('Error al procesar la compra. Inténtalo de nuevo más tarde.');
    }
});

