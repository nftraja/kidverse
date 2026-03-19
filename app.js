/* =====================================
   KIDVERSE – FINAL APP.JS ENGINE
   Drawer + Category + Platform Render
===================================== */


/* ===== DRAWER CONTROL ===== */
function toggleDrawer(){
  document.getElementById("drawer").classList.toggle("active");
  document.getElementById("overlay").classList.toggle("active");
  document.body.classList.toggle("drawer-open");
}

function closeDrawer(){
  document.getElementById("drawer").classList.remove("active");
  document.getElementById("overlay").classList.remove("active");
  document.body.classList.remove("drawer-open");
}

/* ===== GET URL PARAM ===== */
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}


/* ===== CATEGORY TITLES ===== */
const categoryMap = {
  "early-learning": "🧩 Early Learning",
  "school-learning": "📘 School Learning",
  "coding-logic": "💻 Coding & Logic",
  "creative-zone": "🎨 Creative Zone",
  "learning-games": "🎮 Learning Games",
  "reading-stories": "📖 Reading & Stories",
  "safe-entertainment": "📺 Safe Entertainment",
  "sports-physical": "⚽ Sports & Physical",
  "skills-development": "🧠 Skills Development",
  "competitions-olympiads": "🏆 Competitions",
  "parent-tools": "👨‍👩‍👧 Parent Tools",
  "teacher-resources": "👩‍🏫 Teacher Resources"
};


/* ===== LOAD CATEGORY PAGE ===== */
async function loadCategoryPage() {

  const type = getQueryParam("type");

  if (!type) return;

  /* Title update */
  const titleText = categoryMap[type] || "Category";

  const pageTitle = document.getElementById("pageTitle");
  const categoryTitle = document.getElementById("categoryTitle");

  if (pageTitle) pageTitle.innerText = titleText;
  if (categoryTitle) categoryTitle.innerText = titleText;


  /* Fetch JSON */
  let data = [];
  try {
    const res = await fetch("platforms.json");
    data = await res.json();
  } catch (e) {
    console.error("JSON load error:", e);
    return;
  }


  /* Filter platforms */
  const filtered = data.filter(item => item.category === type);


  /* Render platforms */
  const container = document.getElementById("platformContainer");

  if (!container) return;

  if (filtered.length === 0) {
    container.innerHTML = "<p>No platforms found.</p>";
    return;
  }

  container.innerHTML = filtered.map(item => `
    <div class="card">
      <h3>${item.name}</h3>

      <div class="meta-row">
        <span class="badge">${item.age}</span>
        <span class="badge">${item.type}</span>
      </div>

      <p>${item.description}</p>

      <a href="${item.url}" target="_blank" class="btn">Open</a>
    </div>
  `).join("");
}


/* ===== INIT ===== */
document.addEventListener("DOMContentLoaded", () => {

  /* Detect category page */
  if (window.location.pathname.includes("category.html")) {
    loadCategoryPage();
  }

});