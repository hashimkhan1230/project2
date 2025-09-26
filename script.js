// Select elements
const hamburger = document.getElementById("hamburger");
const menuOverlay = document.getElementById("menuOverlay");
const closeBtn = document.getElementById("closeBtn");

// Open overlay when hamburger clicked
hamburger.addEventListener("click", () => {
  menuOverlay.classList.add("open");
});

// Close overlay when × clicked
closeBtn.addEventListener("click", () => {
  menuOverlay.classList.remove("open");
});

// Optional: close overlay if clicked outside the menu links
menuOverlay.addEventListener("click", (e) => {
  if (e.target === menuOverlay) {
    menuOverlay.classList.remove("open");
  }
});
