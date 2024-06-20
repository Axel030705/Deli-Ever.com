import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

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
const auth = getAuth();
const database = getDatabase(); // Obtener una instancia de la base de datos

// Variable para controlar el estado de carga
let working = false;

// Comprobar si hay información de inicio de sesión almacenada localmente
document.addEventListener('DOMContentLoaded', () => {
    const savedUser = localStorage.getItem('savedUser');
    if (savedUser) {
        const { email, password } = JSON.parse(savedUser);
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
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
                            } else if (userType === "Vendedor") {
                                window.location.href = "index.html"
                            } else if (userType === "Cliente") {
                                window.location.href = "indexCliente.html"
                            } else {
                                //window.location.href = "index.html";
                            }
                        }
                    })
                    .catch((error) => {
                        console.error('Error al obtener información adicional del usuario:', error);
                    });


            })
            .catch((error) => {
                console.error('Error al iniciar sesión automáticamente:', error);
                localStorage.removeItem('savedUser'); // Eliminar información de inicio de sesión guardada si falla el inicio de sesión automático
            });
    }
});

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
            // Acceso exitoso
            loginForm.classList.add('loading');
            state.innerHTML = 'Validando';

            // Guardar la información de inicio de sesión en el almacenamiento local
            localStorage.setItem('savedUser', JSON.stringify({ email, password }));

            setTimeout(function () {
                loginForm.classList.add('ok');
                state.innerHTML = 'Bienvenido!';
                setTimeout(function () {
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
                                } else if (userType === "Vendedor") {
                                    window.location.href = "index.html"
                                } else if (userType === "Cliente") {
                                    window.location.href = "indexCliente.html"
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
            setTimeout(function () {
                loginForm.classList.add('no', 'incorrect');
                state.innerHTML = 'Correo o contraseña incorrectos';
                setTimeout(function () {
                    state.innerHTML = 'Iniciar sesión';
                    loginForm.classList.remove('no', 'loading', 'incorrect');
                    working = false;
                }, 1500);
            }, 1500);


            working = false;
        });
});
