import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

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
const analytics = getAnalytics(app);

// Obtiene una referencia a la base de datos
const database = getDatabase();

// Obtener una referencia a la lista de usuarios en la base de datos
const usuariosRef = ref(database, 'Usuarios');

// Función para mostrar los datos de los usuarios en la página
function mostrarDatosUsuarios(snapshot) {
    const contenedorUsuarios = document.getElementById('contenedor-usuarios');
    contenedorUsuarios.innerHTML = ''; // Limpiar el contenedor antes de mostrar nuevos datos

    snapshot.forEach(function(childSnapshot) {
        const usuario = childSnapshot.val();
        const usuarioHTML = `
            <div class="usuario">
                <p>Nombre: ${usuario.nombre}</p>
                <p>Correo: ${usuario.correo}</p>
                <p>Tipo de usuario: ${usuario['Tipo de usuario']}</p>
                <p>Venderá: ${usuario.Vendera}</p>
                <!-- Agrega más campos según sea necesario -->
            </div>`;
        contenedorUsuarios.innerHTML += usuarioHTML;
    });
}

// Escuchar cambios en la lista de usuarios y mostrar los datos en la página
onValue(usuariosRef, function(snapshot) {
    mostrarDatosUsuarios(snapshot);
});