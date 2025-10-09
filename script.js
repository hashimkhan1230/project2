import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

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

document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const menuOverlay = document.getElementById('menuOverlay');
  const closeBtn = document.getElementById('closeBtn');
  const userNameEl = document.getElementById('user-name');
  const logoutBtn = document.getElementById('logout-btn');
  const signupLink = document.querySelector('.signup-link');
  const loginLink = document.querySelector('.login-link');

  hamburger.addEventListener('click', () => menuOverlay.classList.add('open'));
  closeBtn.addEventListener('click', () => menuOverlay.classList.remove('open'));
  document.addEventListener('click', (e) => {
    if (!menuOverlay.contains(e.target) && !hamburger.contains(e.target)) {
      menuOverlay.classList.remove('open');
    }
  });

  // --- Auth state ---
  onAuthStateChanged(auth, user => {
    if (user) {
      const name = user.email.split('@')[0]; // get name only
      userNameEl.innerText = `Welcome, ${name}`;
      userNameEl.style.display = "inline";
      logoutBtn.style.display = "inline";
      if (signupLink) signupLink.style.display = "none";
      if (loginLink) loginLink.style.display = "none";
    } else {
      userNameEl.style.display = "none";
      logoutBtn.style.display = "none";
      if (signupLink) signupLink.style.display = "inline";
      if (loginLink) loginLink.style.display = "inline";
    }
  });

  logoutBtn.addEventListener('click', () => {
    signOut(auth).then(() => window.location.href="login.html");
  });
});

* ---------- Simple "notice board" with admin add (demo) ---------- */
const noticeList = $('#noticeList');
const adminAddNotice = $('#adminAddNotice');

function renderNotices(){
  const notices = JSON.parse(localStorage.getItem('poly_notices') || '[]');
  if(notices.length === 0){
    noticeList.innerHTML = `<div class="notice">No notices yet.</div>`;
    return;
  }
  noticeList.innerHTML = notices.map(n => `
    <div class="notice" role="article">
      <strong>${escapeHtml(n.title)}</strong>
      <small>${new Date(n.time).toLocaleString()}</small>
      <div>${escapeHtml(n.body)}</div>
    </div>
  `).join('');
}
