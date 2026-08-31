/* AI Research Group — rendering & interaction */
(function () {
  'use strict';

  const $  = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = (s) => String(s).replace(/&(?![a-z]+;|#\d+;)/gi, '&amp;').replace(/</g, '&lt;');

  const MAIL_ICON = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></svg>';
  const STAR_ICON = '<svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor"><path d="M8 .25l2.4 4.87 5.35.78-3.87 3.78.91 5.32L8 12.5l-4.79 2.5.91-5.32L.25 5.9l5.35-.78z"/></svg>';
  const LINK_ICON = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M10 13a5 5 0 0 0 7.07 0l3-3A5 5 0 0 0 13 3l-1.5 1.5"/><path d="M14 11a5 5 0 0 0-7.07 0l-3 3A5 5 0 0 0 11 21l1.5-1.5"/></svg>';

  /* ── theme ─────────────────────────────────────────────── */
  const root = document.documentElement;
  const saved = localStorage.getItem('arg-theme');
  if (saved) root.setAttribute('data-theme', saved);

  $('#theme-toggle').addEventListener('click', () => {
    const dark = root.getAttribute('data-theme') === 'dark' ||
      (!root.hasAttribute('data-theme') && matchMedia('(prefers-color-scheme: dark)').matches);
    const next = dark ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('arg-theme', next);
  });

  /* ── mobile menu ───────────────────────────────────────── */
  const menuBtn = $('#menu-toggle');
  const links = $('.nav-links');
  menuBtn.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  links.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      links.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  });

  /* ── sticky nav shadow ─────────────────────────────────── */
  const nav = $('#nav');
  const onScroll = () => nav.classList.toggle('stuck', window.scrollY > 8);
  onScroll();
  addEventListener('scroll', onScroll, { passive: true });

  /* ── research themes ───────────────────────────────────── */
  $('#theme-grid').innerHTML = THEMES.map((t) => `
    <article class="theme reveal" id="theme-${t.id}">
      <span class="theme-n">${t.n}</span>
      <h3>${t.title}</h3>
      <p>${t.body}</p>
      <div class="tags">${t.tags.map((g) => `<span class="tag">${g}</span>`).join('')}</div>
    </article>`).join('');

  /* ── people ────────────────────────────────────────────── */
  // Identifier links are generated from the orcid/scopus ids so the two are
  // never out of step with each other across cards.
  const idLinks = (p) => {
    const out = [];
    if (p.orcid) out.push({ label: 'ORCID', url: 'https://orcid.org/' + p.orcid, cls: ' id-orcid' });
    if (p.scopus) out.push({ label: 'Scopus', url: 'https://www.scopus.com/authid/detail.uri?authorId=' + p.scopus, cls: ' id-scopus' });
    if (p.rg) out.push({ label: 'ResearchGate', url: 'https://www.researchgate.net/profile/' + p.rg, cls: ' id-rg' });
    return out;
  };

  const linkPills = (arr, p) => arr.concat(p ? idLinks(p) : []).map((l) =>
    `<a class="pill${l.cls || ''}" href="${l.url}" target="_blank" rel="noopener">${l.label}</a>`).join('');

  const mailRow = (email) => email
    ? `<a class="p-mail" href="mailto:${email}">${MAIL_ICON}${email}</a>` : '';

  // Initials fallback so a missing portrait still renders cleanly.
  const initials = (name) => name
    .replace(/^(Assoc\.|Asst\.)?\s*Prof\.\s*|^Dr\.?\s*/g, '')
    .trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase();

  const avatar = (p, cls) => p.photo
    ? `<div class="${cls}"><img src="${p.photo}" alt="${p.name}" loading="lazy" width="400" height="600"
         onerror="this.parentNode.innerHTML='<span class=\'ava-txt\'>${initials(p.name)}</span>'"></div>`
    : `<div class="${cls}"><span class="ava-txt">${initials(p.name)}</span></div>`;

  $('#people-lead').innerHTML = `
    ${avatar(LEAD, 'ava ava-lead')}
    <div>
      <p class="pl-role">${LEAD.role}</p>
      <h3 class="pl-name">${LEAD.name}</h3>
      <p class="pl-div">${LEAD.division}</p>
      <p class="pl-bio">${LEAD.bio}</p>
    </div>
    <div>
      <div class="pl-metrics">
        ${LEAD.metrics.map((m) => `<div><span>${m.k}</span><strong>${m.v}</strong></div>`).join('')}
      </div>
      <div class="p-foot" style="border-top:0;padding-top:0">
        ${mailRow(LEAD.email)}
        <div class="p-links">${linkPills(LEAD.links, LEAD)}</div>
      </div>
    </div>`;

  $('#people-grid').innerHTML = PEOPLE.map((p) => `
    <article class="person reveal">
      <div class="p-top">
        ${avatar(p, 'ava')}
        <div>
          <p class="p-role">${p.role}</p>
          <h3 class="p-name">${p.name}</h3>
        </div>
      </div>
      <p class="p-div">${p.division}</p>
      ${p.note ? `<p class="p-note">${p.note}</p>` : '<div style="height:.7rem"></div>'}
      <p class="p-bio">${p.bio}</p>
      <div><span class="p-metric">${p.metric}</span></div>
      <div class="p-foot">
        ${mailRow(p.email)}
        <div class="p-links">${linkPills(p.links, p)}</div>
      </div>
    </article>`).join('');

  /* ── projects ──────────────────────────────────────────── */
  $('#proj-grid').innerHTML = PROJECTS.map((p) => `
    <article class="proj reveal">
      <div class="proj-top">
        <h3>${p.title}</h3>
        <span class="pill-live">${p.status}</span>
      </div>
      <p>${p.body}</p>
      <div class="proj-links">
        ${p.links.map((l) => `<a href="${l.url}" target="_blank" rel="noopener">${LINK_ICON} ${l.label}</a>`).join('')}
      </div>
    </article>`).join('');

  /* ── publications ──────────────────────────────────────── */
  const THEME_NAMES = {};
  THEMES.forEach((t) => { THEME_NAMES[t.id] = t.short || t.title; });
  THEME_NAMES.legacy = 'Foundational';

  const FILTERS = [{ id: 'all', label: 'All' }].concat(
    Object.keys(THEME_NAMES)
      .filter((id) => PUBS.some((p) => p.theme === id))
      .map((id) => ({ id, label: THEME_NAMES[id] }))
  );

  $('#pub-filters').innerHTML = FILTERS.map((f, i) =>
    `<button class="filter" type="button" data-f="${f.id}" aria-pressed="${i === 0}">${f.label}</button>`
  ).join('');

  const boldNames = (authors) =>
    authors.replace(/([A-Z]\.\s(?:[A-Z]\.\s)?(?:Youwai|Jongpradist|Kongkitkul|Leelataviwat|Tangchirapat|Phutthananon|Petpongpan|Kitkobsin|Jariyatatsakorn|Athisakul|Mahasuwanchai|Se)\b)/g, '<b>$1</b>');

  function renderPubs(filter) {
    // Newest first. Ties keep their order in data.js, so related papers stay together.
    const rows = PUBS.filter((p) => filter === 'all' || p.theme === filter)
      .map((p, i) => [p, i])
      .sort((a, b) => (b[0].y - a[0].y) || (a[1] - b[1]))
      .map(([p]) => p);
    $('#pub-list').innerHTML = rows.map((p, i) => {
      const title = p.url
        ? `<a href="${p.url}" target="_blank" rel="noopener">${p.title}</a>`
        : p.title;
      return `<li class="pub" style="animation-delay:${Math.min(i, 12) * 35}ms">
        <span class="pub-y">${p.y}</span>
        <div>
          <p class="pub-t">${title}</p>
          <p class="pub-a">${boldNames(p.authors)}</p>
          <p class="pub-v">${p.venue}</p>
        </div>
        <span class="pub-type" data-t="${p.type}">${p.type}</span>
      </li>`;
    }).join('');
  }
  renderPubs('all');

  $('#pub-filters').addEventListener('click', (e) => {
    const btn = e.target.closest('.filter');
    if (!btn) return;
    $$('.filter').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
    renderPubs(btn.dataset.f);
  });

  /* ── featured software ─────────────────────────────────── */
  $('#sw-features').innerHTML = FEATURED.map((f) => `
    <a class="sw-feature" href="${f.url}" target="_blank" rel="noopener">
      <img class="plate-${f.plate}" src="${f.logo}" alt="${f.name}" height="96" loading="lazy">
      <div class="sw-feature-body">
        <p>${f.desc}</p>
        <div class="sw-feature-meta">
          ${f.meta.map((m) => `<span class="sw-badge">${m}</span>`).join('')}
          <span class="sw-feature-link">${f.site} &rarr;</span>
        </div>
      </div>
    </a>`).join('');

  /* ── software ──────────────────────────────────────────── */
  $('#repo-list').innerHTML = REPOS.map((r) => `
    <a class="sw-card" href="https://github.com/Sompote/${r.name}" target="_blank" rel="noopener">
      <div class="sw-head">
        <span class="sw-name">${r.name}</span>
        ${r.stars > 0 ? `<span class="sw-stars">${STAR_ICON}${r.stars}</span>` : ''}
        <span class="sw-lang"><span class="sw-dot" data-l="${r.lang}"></span>${r.lang}</span>
      </div>
      <p class="sw-desc">${esc(r.desc)}</p>
    </a>`).join('');

  $('#space-list').innerHTML = SPACES.map((s) => `
    <a class="sw-card" href="https://huggingface.co/spaces/${s.id}" target="_blank" rel="noopener">
      <div class="sw-head">
        <span class="sw-name">${s.name}</span>
      </div>
      <p class="sw-desc">${esc(s.desc)}</p>
    </a>`).join('');

  /* ── scroll spy ────────────────────────────────────────── */
  const navLinks = $$('.nav-links a');
  const sections = navLinks
    .map((a) => document.getElementById(a.getAttribute('href').slice(1)))
    .filter(Boolean);

  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      navLinks.forEach((a) =>
        a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach((s) => spy.observe(s));

  /* ── reveal ────────────────────────────────────────────── */
  const rev = new IntersectionObserver((entries, obs) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('in'); obs.unobserve(en.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  $$('.reveal').forEach((el, i) => { el.style.transitionDelay = (i % 6) * 45 + 'ms'; rev.observe(el); });

  /* ── reading progress ──────────────────────────────────── */
  const bar = document.createElement('div');
  bar.className = 'progress';
  document.body.appendChild(bar);

  let ticking = false;
  const drawProgress = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = (max > 0 ? (scrollY / max) * 100 : 0) + '%';
    ticking = false;
  };
  addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(drawProgress); }
  }, { passive: true });
  drawProgress();

  /* ── stat counters ─────────────────────────────────────── */
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fmt = (n) => n.toLocaleString('en-US');

  function countUp(el) {
    const target = Number(el.dataset.count);
    if (!Number.isFinite(target)) return;
    const suffix = /\+$/.test(el.textContent.trim()) ? '+' : '';
    if (reduced) { el.textContent = fmt(target) + suffix; return; }

    const dur = 1100;
    const t0 = performance.now();
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    const step = (now) => {
      const t = Math.min((now - t0) / dur, 1);
      el.textContent = fmt(Math.round(target * ease(t))) + suffix;
      if (t < 1) requestAnimationFrame(step);
    };
    el.textContent = '0' + suffix;
    requestAnimationFrame(step);
  }

  const counters = new IntersectionObserver((entries, obs) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      countUp(en.target);
      obs.unobserve(en.target);
    });
  }, { rootMargin: '0px 0px -15% 0px' });
  $$('.stats dd[data-count]').forEach((el) => counters.observe(el));

  /* ── footer year ───────────────────────────────────────── */
  $('#year').textContent = new Date().getFullYear();
})();
