/* ── script_final_v2.js ── */

// ── CURSOR ──
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

(function animCursor() {
  if (cursor) { cursor.style.left = mx + 'px'; cursor.style.top = my + 'px'; }
  rx += (mx - rx) * 0.14;
  ry += (my - ry) * 0.14;
  if (ring)  { ring.style.left  = rx + 'px'; ring.style.top  = ry + 'px'; }
  requestAnimationFrame(animCursor);
})();

document.querySelectorAll('a, button, .skill-card, .tb-item, .cert-row, .exp-card, .skill-pills span, .tech-item, .proj-card, .proj-link, .award-entry, .chatbot-btn').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor?.classList.add('hover'); ring?.classList.add('hover'); });
  el.addEventListener('mouseleave', () => { cursor?.classList.remove('hover'); ring?.classList.remove('hover'); });
});

// ── NAV SCROLL ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 80));

// ── BURGER / DRAWER ──
const burger = document.getElementById('burger');
const drawer = document.getElementById('drawer');
burger.addEventListener('click', () => drawer.classList.toggle('open'));
document.querySelectorAll('.drawer a').forEach(a => a.addEventListener('click', () => drawer.classList.remove('open')));
window.addEventListener('click', e => {
  if (!drawer.contains(e.target) && !burger.contains(e.target)) drawer.classList.remove('open');
});

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (!t) return;
    e.preventDefault();
    t.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ── TYPEWRITER ──
const phrases = [
  'Data Engineer',
  'Software Developer',
  'AWS Certified',
  'Cloud Architect',
  'Pipeline Builder',
];
let pi = 0, ci = 0, deleting = false;
const tw = document.getElementById('typewriter');

function type() {
  if (!tw) return;
  const word = phrases[pi];
  if (!deleting) {
    tw.textContent = word.slice(0, ++ci);
    if (ci === word.length) { deleting = true; setTimeout(type, 1400); return; }
  } else {
    tw.textContent = word.slice(0, --ci);
    if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
  }
  setTimeout(type, deleting ? 55 : 95);
}
type();

// ── REVEAL ON SCROLL ──
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ── CONTACT FORM ──
const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    note.textContent = "✓ Message sent! I'll be in touch soon.";
    form.reset();
    setTimeout(() => { note.textContent = ''; }, 4000);
  });
}
