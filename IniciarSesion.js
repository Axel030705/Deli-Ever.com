import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

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

// Obtiene una referencia al servicio de autenticación
const auth = getAuth();

// Variable para controlar el estado de carga
let working = false;

// Maneja el evento de envío del formulario de inicio de sesión
document.querySelector('#loginForm').addEventListener('submit', (e) => {
    e.preventDefault();

    // Evita múltiples envíos mientras está en progreso uno
    if (working) return;
    working = true;

    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const loginForm = document.querySelector('#loginForm');
    const state = loginForm.querySelector('button > .state');

    // Iniciar sesión con correo electrónico y contraseña
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Acceso exitoso, redirigir a index.html
            loginForm.classList.add('loading');
            state.innerHTML = 'Validando';
            setTimeout(function() {
                loginForm.classList.add('ok');
                state.innerHTML = 'Bienvenido!';
                setTimeout(function() {
                    state.innerHTML = 'Iniciar sesión';
                    loginForm.classList.remove('ok', 'loading');
                    working = false;
                    window.location.href = "Solicitudes.html";
                }, 1500);
            }, 1500);
        })
        .catch((error) => {
            // Manejo de errores
            console.error('Error al iniciar sesión:', error);

            //Animacion
            loginForm.classList.add('loading');
            state.innerHTML = 'Validando';
            setTimeout(function() {
                loginForm.classList.add('no');
                state.innerHTML = 'Correo o contraseña incorrectos';
                setTimeout(function() {
                    state.innerHTML = 'Iniciar sesión';
                    loginForm.classList.remove('no', 'loading');
                    working = false;
                }, 1500);
            }, 1500);

            working = false;
        });
});