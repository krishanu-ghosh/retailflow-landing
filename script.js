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

// Fire counters when stats enter view (stats-ticker only exists on index.html)
const statsEl = document.getElementById('stats-ticker');
if (statsEl) {
  let counted = false;
  new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !counted) {
      counted = true;
      countUp(document.getElementById('s-rev'),   84320, 1800);
      countUp(document.getElementById('s-sales'),  1247,  1600);
      countUp(document.getElementById('s-sku'),     892,  1400);
    }
  }, { threshold: 0.4 }).observe(statsEl);
}

// Contact form submission (contact-form only exists on index.html)
const contactForm = document.getElementById('contact-form');
const cfSubmit    = document.getElementById('cf-submit');
const cfStatus    = document.getElementById('cf-status');
const APPS_SCRIPT = 'https://script.google.com/macros/s/AKfycbxkP34rnMkmx9lzefeQh6ngo39kTa_C52g9dzQy0CEyHxdvsRVJB2islV07HJmnV8zs/exec';

if (contactForm) {
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
}

// Pricing: billing-cycle toggle (billing-toggle only exists on pricing.html)
const billingToggle = document.querySelector('.billing-toggle');
if (billingToggle) {
  const TIER_PRICING = {
    starter:   { monthly: 149, quarterly: 399,  half_yearly: 749,  annual: 1299 },
    essential: { monthly: 229, quarterly: 599,  half_yearly: 1149, annual: 1999 },
    pro:       { monthly: 399, quarterly: 1049, half_yearly: 1999, annual: 2999 },
    premium:   { monthly: 649, quarterly: 1699, half_yearly: 2999, annual: 4999 },
  };
  const PERIOD_MONTHS = { monthly: 1, quarterly: 3, half_yearly: 6, annual: 12 };
  const PERIOD_BILLED_LABEL = {
    quarterly: '/ quarter',
    half_yearly: '/ half-year',
    annual: '/ year',
  };
  const inr = (n) => `₹${n.toLocaleString('en-IN')}`;
  const tierCards = document.querySelectorAll('.tier-card[data-tier]');

  function renderPeriod(period) {
    tierCards.forEach((card) => {
      const pricing = TIER_PRICING[card.dataset.tier];
      if (!pricing) return; // Enterprise: static "Custom" pricing, nothing to compute

      const price = pricing[period];
      const months = PERIOD_MONTHS[period];
      const effectiveMonthly = Math.round(price / months);

      card.querySelector('.tier-price').textContent = inr(effectiveMonthly);
      card.querySelector('.tier-billed-note').textContent =
        period === 'monthly' ? 'billed monthly' : `${inr(price)} ${PERIOD_BILLED_LABEL[period]}`;

      const saveEl = card.querySelector('.tier-save');
      if (period === 'monthly') {
        saveEl.classList.remove('show');
      } else {
        const pct = Math.round((1 - price / (pricing.monthly * months)) * 100);
        saveEl.textContent = `Save ${pct}%`;
        saveEl.classList.toggle('show', pct > 0);
      }
    });
  }

  billingToggle.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-period]');
    if (!btn) return;
    billingToggle.querySelectorAll('button').forEach((b) => b.classList.toggle('on', b === btn));
    renderPeriod(btn.dataset.period);
  });
}

// Scroll reveal
new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('on'); });
}, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' })
  .observe && document.querySelectorAll('.rev').forEach(el =>
    new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) entries[0].target.classList.add('on');
    }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }).observe(el)
  );
