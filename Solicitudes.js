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

    snapshot.forEach(function (childSnapshot) {
        const usuario = childSnapshot.val();
        const usuarioContainer = document.createElement('div'); // Crear un contenedor individual para el usuario
        usuarioContainer.classList.add('usuario');

        // Crear elementos HTML para mostrar los datos del usuario
        
        //Nombre
        const nombreContainer = document.createElement('div'); // Crear un contenedor para el texto "Correo:" y el correo electrónico
        nombreContainer.classList.add('nombre-container'); // Agregar clase CSS al contenedor
        const nombreTituloSpan = document.createElement('span');
        nombreTituloSpan.textContent = 'Nombre: ';
        nombreTituloSpan.classList.add('nombre-titulo'); // Agregar clase CSS al elemento
        const nombreP = document.createElement('p');
        nombreP.textContent = usuario.nombre;

        //Correo
        const correoContainer = document.createElement('div'); // Crear un contenedor para el texto "Correo:" y el correo electrónico
        correoContainer.classList.add('correo-container'); // Agregar clase CSS al contenedor
        const correoTituloSpan = document.createElement('span');
        correoTituloSpan.textContent = 'Correo: ';
        correoTituloSpan.classList.add('correo-titulo'); // Agregar clase CSS al elemento
        const correoP = document.createElement('p');
        correoP.textContent = usuario.correo;

        const tipoUsuarioP = document.createElement('p');
        tipoUsuarioP.textContent = `Tipo de usuario: ${usuario['Tipo de usuario']}`;

        const venderaP = document.createElement('p');
        venderaP.textContent = `Venderá: ${usuario.Vendera}`;

        const Btn_rechazar = document.createElement('button');


        // Agregar los elementos al contenedor del usuario

        //Nombre
        nombreContainer.appendChild(nombreTituloSpan);
        nombreContainer.appendChild(nombreP);
        usuarioContainer.appendChild(nombreContainer);

        //Correo
        correoContainer.appendChild(correoTituloSpan);
        correoContainer.appendChild(correoP);
        usuarioContainer.appendChild(correoContainer);

        usuarioContainer.appendChild(tipoUsuarioP);
        usuarioContainer.appendChild(venderaP);
        //usuarioContainer.appendChild(Btn_rechazar);

        contenedorUsuarios.appendChild(usuarioContainer); // Agregar el contenedor del usuario al contenedor principal
    });
}

// Escuchar cambios en la lista de usuarios y mostrar los datos en la página
onValue(usuariosRef, function (snapshot) {
    mostrarDatosUsuarios(snapshot);
});