// ---------------- Firebase Setup ----------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBHimP5R4zkPlU65ZiC2yYZcOCj06ckmHM",
  authDomain: "poly-tech-fda4d.firebaseapp.com",
  projectId: "poly-tech-fda4d",
  storageBucket: "poly-tech-fda4d.firebasestorage.app",
  messagingSenderId: "327994274289",
  appId: "1:327994274289:web:2021aa0d02dbdb79989450",
  measurementId: "G-B4W12BEGQH"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

// ---------------- Helpers ----------------
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

function escapeHtml(str = '') {
  return String(str).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}

// ---------------- Navbar Elements ----------------
const userNameLi = $('#user-name');
const logoutNavbarBtn = $('#logout-btn');
const loginLinks = $$('.login-link');
const signupLinks = $$('.signup-link');
const adminAddNotice = $('#adminAddNotice');

// ---------------- Hamburger Menu ----------------
const hamburger = $('#hamburger');
const menuOverlay = $('#menuOverlay');
const closeBtn = $('#closeBtn');

function openMenu() { menuOverlay.classList.add('open'); }
function closeMenu() { menuOverlay.classList.remove('open'); }

hamburger?.addEventListener('click', openMenu);
closeBtn?.addEventListener('click', closeMenu);
menuOverlay?.addEventListener('click', e => { if(e.target === menuOverlay) closeMenu(); });

// ---------------- Show / Hide User UI ----------------
function showUserUI(user){
    if(!user) return;
    userNameLi.style.display='block';
    userNameLi.textContent = `Hey, ${user.email.split('@')[0]}`;
    logoutNavbarBtn.style.display='inline-block';
    loginLinks.forEach(a => a.style.display='none');
    signupLinks.forEach(a => a.style.display='none');

    // Admin check
    const adminEmails = ["admin@polytech.com"];
    if(adminEmails.includes(user.email)){
        adminAddNotice.style.display = 'inline-block';
    } else {
        adminAddNotice.style.display = 'none';
    }
}

function hideUserUI(){
    userNameLi.style.display='none';
    logoutNavbarBtn.style.display='none';
    loginLinks.forEach(a => a.style.display='inline-block');
    signupLinks.forEach(a => a.style.display='inline-block');
    adminAddNotice.style.display='none';
}

// ---------------- Logout ----------------
logoutNavbarBtn.addEventListener('click', async ()=>{
    await signOut(auth);
    hideUserUI();
    closeMenu();
    window.location.href = 'index.html';
});

// ---------------- Notices (Firebase) ----------------
const noticeList = $('#noticeList');

async function renderNotices() {
  const q = query(collection(db,'notices'),orderBy('time','desc'));
  const snapshot = await getDocs(q);
  if(snapshot.empty){
    noticeList.innerHTML=`<div class="notice">No notices yet.</div>`;
    return;
  }
  noticeList.innerHTML='';
  snapshot.forEach(doc=>{
    const n = doc.data();
    const div = document.createElement('div');
    div.className='notice';
    div.innerHTML=`<strong>${escapeHtml(n.title)}</strong> <small>${new Date(n.time?.toDate?.()||n.time).toLocaleString()}</small> <div>${escapeHtml(n.body)}</div>`;
    noticeList.appendChild(div);
  });
}

// ---------------- Admin Add Notice ----------------
adminAddNotice?.addEventListener('click', async () => {
  const user = auth.currentUser;

  if(!user){
    alert("⚠️ You must login as Admin first to add a notice.");
    window.location.href = 'admin-reggs.html';
    return;
  }

  const adminEmails = ["admin@polytech.com"];
  if(!adminEmails.includes(user.email)){
    alert("❌ You are not authorized to add notices.");
    return;
  }

  const title = prompt("Enter Notice Title") || "Notice";
  const body = prompt("Enter Notice Body") || "";

  try {
    await addDoc(collection(db,'notices'),{
      title,
      body,
      time: serverTimestamp()
    });
    alert("✅ Notice added successfully!");
    renderNotices();
  } catch(err){
    alert("Error adding notice: " + err.message);
  }
});

// ---------------- Initialize ----------------
document.addEventListener('DOMContentLoaded', ()=>{ renderNotices(); });

// ---------------- Auth State Listener ----------------
onAuthStateChanged(auth, user => {
    if(user){
        showUserUI(user);
    } else {
        hideUserUI();
    }
});

// ---------------- Close menu with ESC ----------------
document.addEventListener('keydown', e=>{
    if(e.key==='Escape' && menuOverlay.classList.contains('open')) closeMenu();
});
