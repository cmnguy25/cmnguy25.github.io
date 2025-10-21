// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('#nav-menu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navMenu.classList.toggle('show');
  });

  // Close menu on link click (mobile)
  navMenu.addEventListener('click', (e) => {
    if (e.target.matches('a')) {
      navMenu.classList.remove('show');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// Theme toggle with localStorage
const themeBtn = document.getElementById('theme-toggle');
const root = document.documentElement;

function setTheme(mode) {
  // mode: "light" | "dark" | "system"
  root.setAttribute('data-theme', mode);
  localStorage.setItem('theme', mode);
}

function initTheme() {
  const saved = localStorage.getItem('theme') || 'system';
  setTheme(saved);
}
initTheme();

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') || 'system';
    const next = current === 'light' ? 'dark' : current === 'dark' ? 'system' : 'light';
    setTheme(next);
    themeBtn.title = `Theme: ${next}`;
  });
}

// Current year in footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Smooth scrolling for same-page links (native CSS handles most modern browsers,
// this is a tiny enhancement for older ones)
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute('href').slice(1);
  const target = document.getElementById(id);
  if (target) {
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', `#${id}`);
  }
});
