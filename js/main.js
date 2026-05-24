/* ── Custom Cursor ── */
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
});
document.querySelectorAll('a, button, .project-card, .skill-card').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('big'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('big'));
});

/* ── Navbar Scroll Shadow ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

/* ── Mobile Hamburger Menu ── */
document.getElementById('hamburger').addEventListener('click', () => {
  navbar.classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => navbar.classList.remove('open'));
});

/* ── Skills Data & Rendering ── */
const skills = [
  { name: 'Python',             desc: 'Data processing, scripting & ML pipelines',      icon: '🐍', pct: 0.80, color: '#3b82f6' },
  { name: 'Java',               desc: 'OOP, data structures & desktop applications',     icon: '☕', pct: 0.82, color: '#f97316' },
  { name: 'SQL',                desc: 'Relational databases, queries & stored procs',    icon: '🗄️', pct: 0.78, color: '#22c55e' },
  { name: 'HTML & CSS',         desc: 'Semantic markup, layouts & responsive design',    icon: '🎨', pct: 0.88, color: '#e84b35' },
  { name: 'JavaScript',         desc: 'DOM manipulation, events & async patterns',       icon: '⚡', pct: 0.75, color: '#f7a42a' },
  { name: 'Machine Learning',   desc: 'Classification, regression & model evaluation',   icon: '🤖', pct: 0.70, color: '#a78bfa' },
  { name: 'Prompt Engineering', desc: 'Crafting effective prompts for LLMs & AI tools',  icon: '✍️', pct: 0.85, color: '#34d399' },
  { name: 'Problem Solving',    desc: 'Algorithms, data structures & logical thinking',  icon: '🧩', pct: 0.83, color: '#fb7185' },
];

const grid = document.getElementById('skills-grid');
skills.forEach(s => {
  const card = document.createElement('div');
  card.className = 'skill-card reveal';
  card.innerHTML = `
    <div class="skill-icon" style="background:${s.color}22">${s.icon}</div>
    <div class="skill-name">${s.name}</div>
    <div class="skill-desc">${s.desc}</div>
    <div class="skill-bar-wrap">
      <div class="skill-bar" style="width:${s.pct * 100}%; background: linear-gradient(90deg, ${s.color}, ${s.color}aa)"></div>
    </div>`;
  grid.appendChild(card);
});

/* ── Intersection Observer — reveal animations + skill bars ── */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));
document.querySelectorAll('.skill-card').forEach(el => io.observe(el));

/* ── Contact Form ── */
document.getElementById('sendBtn').addEventListener('click', () => {
  const fields = ['fname', 'email', 'subject', 'msg'];
  const empty = fields.filter(id => !document.getElementById(id).value.trim());
  if (empty.length) {
    document.getElementById(empty[0]).focus();
    return;
  }
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
  fields.forEach(id => document.getElementById(id).value = '');
});

/* ── Active Nav Link Highlight on Scroll ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--ink)' : '';
  });
});
