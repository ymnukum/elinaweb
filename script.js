// Menu toggle
const btn = document.querySelector('.menu-btn');
const menu = document.getElementById('menu');
const nav = document.querySelector('.nav');
function setMenu(open) {
  btn.setAttribute('aria-expanded', String(open));
  menu.classList.toggle('open', open);
  nav.classList.toggle('menu-open', open);
}
btn.addEventListener('click', () => setMenu(btn.getAttribute('aria-expanded') !== 'true'));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
document.addEventListener('click', e => { if (!nav.contains(e.target)) setMenu(false); });

// Compact nav after leaving the hero
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 80);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Scroll reveal
const items = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  items.forEach(el => io.observe(el));
} else {
  items.forEach(el => el.classList.add('in'));
}

// Duplicate gallery images for a seamless loop
const track = document.querySelector('.gal-track');
if (track) {
  [...track.children].forEach(img => {
    const c = img.cloneNode(true);
    c.alt = '';
    c.setAttribute('aria-hidden', 'true');
    track.appendChild(c);
  });
}
