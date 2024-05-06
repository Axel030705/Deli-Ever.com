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


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, ref, update, get } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

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

// Agregar un evento click al botón de comprar
document.getElementById('Btn_comprar').addEventListener('click', async function () {
    try {
        // Obtener la cantidad ingresada por el usuario
        const cantidad = parseInt(document.getElementById('cantidad').value);
        // Verificar si la cantidad está dentro del inventario disponible
        if (cantidad <= productoSeleccionado.cantidad) {
            const nuevoInventario = productoSeleccionado.cantidad - cantidad;

        }

    } catch (error) {
        alert('Error al procesar la compra. Inténtalo de nuevo más tarde.');
    }
});
