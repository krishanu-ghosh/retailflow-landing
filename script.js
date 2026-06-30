// Nav scroll border
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 8);
}, { passive: true });

// Mobile nav menu
const navToggle = document.getElementById('nav-toggle');
const navMenu   = document.getElementById('nav-menu');
function closeMenu() {
  nav.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
}
navToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});
// close after tapping a link, or when tapping outside the nav
navMenu.addEventListener('click', (e) => { if (e.target.closest('a')) closeMenu(); });
document.addEventListener('click', (e) => {
  if (nav.classList.contains('open') && !nav.contains(e.target)) closeMenu();
});

// Counter animation — ease-out cubic
function countUp(el, target, duration) {
  const start = performance.now();
  const fmt = (n) => Math.floor(n).toLocaleString('en-IN');
  (function tick(now) {
    const t = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - t, 3);
    el.textContent = fmt(ease * target);
    if (t < 1) requestAnimationFrame(tick);
  })(start);
}

// Fire counters when stats enter view
const statsEl = document.getElementById('stats-ticker');
let counted = false;
new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !counted) {
    counted = true;
    countUp(document.getElementById('s-rev'),   84320, 1800);
    countUp(document.getElementById('s-sales'),  1247,  1600);
    countUp(document.getElementById('s-sku'),     892,  1400);
  }
}, { threshold: 0.4 }).observe(statsEl);

// Contact form submission
const contactForm = document.getElementById('contact-form');
const cfSubmit    = document.getElementById('cf-submit');
const cfStatus    = document.getElementById('cf-status');
const APPS_SCRIPT = 'https://script.google.com/macros/s/AKfycbxkP34rnMkmx9lzefeQh6ngo39kTa_C52g9dzQy0CEyHxdvsRVJB2islV07HJmnV8zs/exec';

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name     = document.getElementById('cf-name').value.trim();
  const phone    = document.getElementById('cf-phone').value.trim();
  const altPhone = document.getElementById('cf-altphone').value.trim();
  const message  = document.getElementById('cf-message').value.trim();

  if (!name || !phone || !message) {
    cfStatus.className = 'form-status form-status--err';
    cfStatus.textContent = 'Please fill in your name, phone, and message.';
    return;
  }

  cfSubmit.disabled = true;
  cfSubmit.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation:spin 0.9s linear infinite"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg> Sending…';
  cfStatus.className = 'form-status';
  cfStatus.textContent = '';

  const body = new URLSearchParams({ Name: name, Phone: phone, AltPhone: altPhone, Message: message });
  try {
    await fetch(APPS_SCRIPT, { method: 'POST', mode: 'no-cors', body });
    cfStatus.className = 'form-status form-status--ok';
    cfStatus.textContent = '✓ Message sent! We\'ll get back to you within one business day.';
    contactForm.reset();
  } catch {
    cfStatus.className = 'form-status form-status--err';
    cfStatus.textContent = 'Something went wrong. Please try again or reach out directly.';
  } finally {
    cfSubmit.disabled = false;
    cfSubmit.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Send Message';
  }
});

// Scroll reveal
new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('on'); });
}, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' })
  .observe && document.querySelectorAll('.rev').forEach(el =>
    new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) entries[0].target.classList.add('on');
    }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }).observe(el)
  );
