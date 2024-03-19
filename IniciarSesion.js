import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

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
const auth = getAuth();
const database = getDatabase(); // Obtener una instancia de la base de datos

// Variable para controlar el estado de carga
let working = false;

// Resto del código para manejar el inicio de sesión
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
                    // Una vez que el usuario ha iniciado sesión correctamente,
                    // puedes obtener su información adicional y redirigirlo
                    // según su tipo de usuario
                    const user = userCredential.user;
                    const userRef = ref(database, 'Usuarios/' + user.uid);
                    // Obtener los datos del usuario una vez
                    get(userRef)
                        .then((snapshot) => {
                            const userData = snapshot.val();
                            if (userData) {
                                // Aquí puedes acceder a la información adicional del usuario
                                const userType = userData["Tipo de usuario"];
                                // Puedes redirigir al usuario o realizar acciones según su tipo de usuario
                                if (userType === "Admin") {
                                    window.location.href = "MenuAdmin.html";
                                } else if(userType === "Vendedor"){
                                    window.location.href = "index.html"
                                } else if(userType === "Cliente"){
                                    window.location.href = "index.html"
                                } else {
                                   //window.location.href = "index.html";
                                }
                            }
                        })
                        .catch((error) => {
                            console.error('Error al obtener información adicional del usuario:', error);
                        });
                }, 1500);
            }, 1500);
        })
        .catch((error) => {
            // Manejo de errores
            console.error('Error al iniciar sesión:', error);

            // Animacion
            loginForm.classList.add('loading');
            state.innerHTML = 'Validando';
            setTimeout(function() {
                loginForm.classList.add('no', 'incorrect');
                state.innerHTML = 'Correo o contraseña incorrectos';
                setTimeout(function() {
                    state.innerHTML = 'Iniciar sesión';
                    loginForm.classList.remove('no', 'loading', 'incorrect');
                    working = false;
                }, 1500);
            }, 1500);

            working = false;
        });
});