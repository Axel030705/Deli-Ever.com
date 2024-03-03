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