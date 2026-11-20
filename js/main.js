/* =============================================
   KEVIN HOLANDA — main.js
   ============================================= */

// ---------- Navbar: scroll behavior ----------
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ---------- Navbar: active link on scroll ----------
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar__links a');

const observerLinks = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => observerLinks.observe(section));

// ---------- Menu mobile ----------
const menuToggle = document.getElementById('menuToggle');
const navLinksEl = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('open');
  navLinksEl.classList.toggle('open');
  document.body.style.overflow = navLinksEl.classList.contains('open') ? 'hidden' : '';
});

// Fecha o menu ao clicar em um link
navLinksEl.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('open');
    navLinksEl.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Fecha ao clicar fora
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target) && navLinksEl.classList.contains('open')) {
    menuToggle.classList.remove('open');
    navLinksEl.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// ---------- Reveal on scroll ----------
const revealEls = document.querySelectorAll(
  '.sobre__grid, .musica__card, .video-card, .contato__info, .contato__form, .section-header'
);

revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

// ---------- Stagger cards ----------
document.querySelectorAll('.musica__cards, .videos__grid').forEach(grid => {
  const children = grid.querySelectorAll('.musica__card, .video-card');
  children.forEach((child, i) => {
    child.style.transitionDelay = `${i * 0.1}s`;
  });
});

// ---------- Formulário de contato ----------
const form = document.getElementById('contatoForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nome     = form.nome.value.trim();
  const email    = form.email.value.trim();
  const assunto  = form.assunto.value;
  const mensagem = form.mensagem.value.trim();

  if (!nome || !email || !mensagem) {
    showToast('Preencha nome, e-mail e mensagem antes de enviar.', 'error');
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showToast('Informe um e-mail válido.', 'error');
    return;
  }

  const subject = encodeURIComponent(`[Site Kevin Holanda] ${assunto || 'Contato'} — ${nome}`);
  const body    = encodeURIComponent(
    `Olá Kevin,\n\nMeu nome é ${nome} (${email}).\n\nAssunto: ${assunto || 'Não informado'}\n\n${mensagem}\n\nAté logo!`
  );

  window.location.href = `mailto:kevindebrito.holanda@gmail.com?subject=${subject}&body=${body}`;
  showToast('Abrindo seu app de e-mail...', 'success');
  form.reset();
});

// ---------- Toast notification ----------
function showToast(message, type = 'success') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.textContent = message;

  Object.assign(toast.style, {
    position:   'fixed',
    bottom:     '2rem',
    right:      '1.5rem',
    background: type === 'success' ? '#c9a84c' : '#c0392b',
    color:      type === 'success' ? '#0d0d0d' : '#fff',
    padding:    '.8rem 1.4rem',
    borderRadius: '8px',
    fontFamily: 'Inter, sans-serif',
    fontSize:   '.88rem',
    fontWeight: '600',
    boxShadow:  '0 8px 24px rgba(0,0,0,.4)',
    zIndex:     '9999',
    opacity:    '0',
    transform:  'translateY(12px)',
    transition: 'all 0.3s ease',
  });

  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity  = '1';
    toast.style.transform = 'translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity   = '0';
    toast.style.transform = 'translateY(12px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
