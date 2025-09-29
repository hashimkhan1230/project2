import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBHimP5R4zkPlU65ZiC2yYZcOCj06ckmHM",
  authDomain: "poly-tech-fda4d.firebaseapp.com",
  projectId: "poly-tech-fda4d",
  storageBucket: "poly-tech-fda4d.appspot.com",
  messagingSenderId: "327994274289",
  appId: "1:327994274289:web:e89432fea4c1936f989450",
  measurementId: "G-2EYRV196G0"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Login
const loginForm = document.querySelector("form");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = loginForm.querySelector('input[type="email"]').value;
  const password = loginForm.querySelector('input[type="password"]').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Login successful ✅ Welcome back!");
      window.location.href = "index.html"; // apni secured page par bhejna
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
});

