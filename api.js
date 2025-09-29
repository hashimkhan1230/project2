import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBHimP5R4zkPlU65ZiC2yYZcOCj06ckmHM",
  authDomain: "poly-tech-fda4d.firebaseapp.com",
  projectId: "poly-tech-fda4d",
  storageBucket: "poly-tech-fda4d.firebasestorage.app",
  messagingSenderId: "327994274289",
  appId: "1:327994274289:web:e89432fea4c1936f989450",
  measurementId: "G-2EYRV196G0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const signupForm = document.querySelector("form");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault(); // must have

  const email = signupForm.querySelector('input[type="email"]').value;
  const password = signupForm.querySelector('input[type="password"]').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      alert("✅ Signup successful: " + userCredential.user.email);
    })
    .catch(error => {
      alert("❌ Signup error: " + error.message);
    });
});
