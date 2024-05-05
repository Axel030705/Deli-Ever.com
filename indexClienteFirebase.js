import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

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
const analytics = getAnalytics(app);

// Obtiene una referencia a la base de datos
const database = getDatabase();

// Obtener una referencia a la lista de tiendas en la base de datos
const tiendasRef = ref(database, 'Tienda');

// Función para mostrar los datos de los productos en la página
function mostrarDatosProductos(snapshot) {
    const contenedorProductos = document.getElementById('container');
    contenedorProductos.classList.add('container');
    contenedorProductos.innerHTML = ''; // Limpiar el contenedor antes de mostrar nuevos datos

    snapshot.forEach(function (childSnapshot) {
        const tienda = childSnapshot.val();

        // Iterar sobre cada producto de la tienda
        for (const productoId in tienda.productos) {
            const producto = tienda.productos[productoId];

            // Crear un contenedor individual para el producto
            const productoContainer = document.createElement('div');
            // Agregamos el evento de clic
            productoContainer.addEventListener('click', function () {
                // Redireccionar a otra página
                window.location.href = 'detalles_producto.html';
            });
            productoContainer.classList.add('card');

            // Construir el contenido del contenedor
            const contenidoCard = document.createElement('div');
            contenidoCard.classList.add('contentCard');
            const nombre = document.createElement('h3');
            nombre.textContent = producto.nombre;
            const descripcion = document.createElement('p');
            const maxLength = 50;
            descripcion.textContent = producto.descripcion.length > maxLength ? producto.descripcion.substring(0, maxLength) + '...' : producto.descripcion;
            const precio = document.createElement('p');
            precio.textContent = `Precio: $${producto.precio}`;
            const extra = document.createElement('p');
            const maxLengthE = 50;
            extra.textContent = producto.extra.length > maxLengthE ? producto.extra.substring(0, maxLengthE) + '...' : producto.extra;

            contenidoCard.appendChild(nombre);
            contenidoCard.appendChild(descripcion);
            contenidoCard.appendChild(precio);
            contenidoCard.appendChild(extra);

            const imagenContainer = document.createElement('div');
            imagenContainer.classList.add('imgP');
            const imagen = document.createElement('img');
            imagen.src = producto.imagenUrl;
            imagen.alt = 'imagen producto';

            imagenContainer.appendChild(imagen);

            productoContainer.appendChild(contenidoCard);
            productoContainer.appendChild(imagenContainer);

            // Agregar el contenedor del producto al contenedor principal
            contenedorProductos.appendChild(productoContainer);
        }
    });
}

// Escuchar cambios en la lista de tiendas y mostrar los datos de los productos en la página
onValue(tiendasRef, function (snapshot) {
    mostrarDatosProductos(snapshot);
});
