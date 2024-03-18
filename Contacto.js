import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
import { getDatabase, ref, onValue, push, update } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

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

// Obtener una referencia a la base de datos de Firebase
const database = getDatabase();

// Evento que se dispara cuando el DOM ha sido completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Manejador de eventos para el formulario de contacto
    document.getElementById('formulario-contacto').addEventListener('submit', function(event) {
        event.preventDefault(); // Evita el envío por defecto del formulario
        
        // Obtener los valores de los campos del formulario
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const telefono = document.getElementById('telefono').value;
        const asunto = document.getElementById('asunto').value;
        const mensaje = document.getElementById('mensaje').value;
    
        // Guardar en la base de datos de Firebase
        const mensajesRef = ref(database, 'Mensajes'); // Referencia a la ubicación 'Mensajes' en la base de datos
        const nuevoMensajeRef = push(mensajesRef); // Genera una nueva clave única para el mensaje
        // Guarda el mensaje en la base de datos
        update(nuevoMensajeRef, {
            nombre: nombre,
            email: email,
            telefono: telefono,
            asunto: asunto,
            mensaje: mensaje
        }).then(() => {
            // Limpiar el formulario después de enviar el mensaje
            document.getElementById('formulario-contacto').reset();
            alert('Mensaje enviado correctamente');
        }).catch((error) => {
            console.error('Error al enviar el mensaje:', error);
            alert('Error al enviar el mensaje. Por favor, inténtalo de nuevo.');
        });
    });
});




