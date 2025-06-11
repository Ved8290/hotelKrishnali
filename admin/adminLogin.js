import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDyNZf3zSCUTEDZoLAoCQUPqa788rZjFq4",
  authDomain: "krushnali-hotel-savda.firebaseapp.com",
  databaseURL: "https://krushnali-hotel-savda-default-rtdb.firebaseio.com/",
  projectId: "krushnali-hotel-savda",
  storageBucket: "krushnali-hotel-savda.firebasestorage.app",
  messagingSenderId: "826945573813",
  appId: "1:826945573813:web:adb7a4cc400e9277907ffc",
  measurementId: "G-SELXS1GL11"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Listen for auth state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in:", user);
    
     window.location.href = "/hotelKrishnali/admin/home.html";
  } else {
    console.log("No user is signed in.");
  }
});

// Login logic
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const message = document.getElementById("message");

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      message.style.color = "green";
      message.textContent = "Login successful!";
      console.log(userCredential);
      setTimeout(() => {
        window.location.href = "/hotelKrishnali/admin/home.html";
      }, 1000);
    })
    .catch((error) => {
      message.style.color = "red";
      message.textContent = "Error: " + error.message;
    });
});
