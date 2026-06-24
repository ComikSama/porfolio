/* ============================================================
   COMIK SAMA PORTFOLIO — main.js
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     THEME TOGGLE
  ---------------------------------------------------------- */
  const html = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const STORAGE_KEY = 'comik-theme';

  function getPreferred() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }

  applyTheme(getPreferred());

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  /* ----------------------------------------------------------
     NAV — sticky shadow + active link + hamburger
  ---------------------------------------------------------- */
  const nav = document.getElementById('nav');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  // Sticky shadow on scroll
  window.addEventListener(
    'scroll',
    () => {
      if (nav) {
        nav.style.boxShadow =
          window.scrollY > 10 ? '0 2px 20px rgba(0,0,0,0.15)' : 'none';
      }
    },
    { passive: true },
  );

  // Hamburger toggle
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', open);
    });
  }

  // Close nav on link click (mobile)
  if (navLinks) {
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id], div[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  function updateActiveLink() {
    let current = '';
    sections.forEach((sec) => {
      const top = sec.getBoundingClientRect().top;
      if (top <= 80) current = sec.id;
    });
    navAnchors.forEach((a) => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });

  /* ----------------------------------------------------------
     PROJECT TABS — web cards / diseño mosaico
  ---------------------------------------------------------- */
  const tabs = document.querySelectorAll('.ftab');
  const projWeb = document.getElementById('proj-web');
  const projDis = document.getElementById('proj-diseno');

  function switchTab(filter) {
    tabs.forEach((t) =>
      t.classList.toggle('active', t.dataset.filter === filter),
    );
    const pagerWeb = document.getElementById('pager-web');
    const pagerDis = document.getElementById('pager-diseno');
    if (filter === 'web') {
      projWeb.style.display = 'grid';
      projDis.style.display = 'none';
      if (pagerWeb) pagerWeb.style.display = 'flex';
      if (pagerDis) pagerDis.style.display = 'none';
    } else {
      projWeb.style.display = 'none';
      projDis.style.display = 'flex';
      if (pagerWeb) pagerWeb.style.display = 'none';
      if (pagerDis) pagerDis.style.display = 'flex';
    }
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => switchTab(tab.dataset.filter));
  });

  /* ----------------------------------------------------------
     RENDER — SVG arrow reutilizable
  ---------------------------------------------------------- */
  const SVG_ARROW = `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;
  const SVG_ZOOM = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>`;

  /* ----------------------------------------------------------
     RENDER — web card
  ---------------------------------------------------------- */
  function renderWebCard(p) {
    const tagsHTML = p.tags
      .map((t) => `<span class="tag">${t}</span>`)
      .join('');
    return `
      <article class="proj-card">
        <div class="proj-thumb proj-thumb--web">
          <img src="${p.img}" alt="${p.name}" loading="lazy">
        </div>
        <div class="proj-body">
          <div class="proj-top">
            <h3 class="proj-name">${p.name}</h3>
            <span class="badge badge-web">web</span>
          </div>
          <p class="proj-desc">${p.desc}</p>
          <div class="proj-tags">${tagsHTML}</div>
          <a href="${p.url}" target="_blank" rel="noopener" class="proj-link">
            ver proyecto ${SVG_ARROW}
          </a>
        </div>
      </article>`;
  }

  /* ----------------------------------------------------------
     RENDER — design mosaic group
  ---------------------------------------------------------- */
  function renderDesignGroup(group, groupIndex) {
    /*
      Bloques del patrón cíclico. Cada bloque define:
        cols  → columnas del grid en esa fila
        count → cuántas fotos consume
        spans → array de grid-column spans para cada foto ('' = normal)

      Patrón completo: A B C D E → 2+3+2+3+2 = 12 fotos por ciclo
      Se repite infinito, sin importar cuántas fotos haya.
    */
    const BLOCKS = [
      { cols: 3, count: 2, spans: ['span 2', 'span 1'] }, // A: [2col] [1col]
      { cols: 3, count: 3, spans: ['', '', ''] }, // B: [1] [1] [1]
      { cols: 3, count: 2, spans: ['span 1', 'span 2'] }, // C: [1col] [2col]
      { cols: 4, count: 4, spans: ['', '', '', ''] }, // D: [1][1][1][1]
      {
        cols: 3,
        count: 3,
        spans: ['span 1', 'span 2', 'span 3']
          .slice(0, 3)
          .map((_, i) => (i === 1 ? 'span 2' : '')),
      }, // E: [1][2][?] → recalc below
    ];

    // Bloque E redefinido limpio: [1col] [2col] pero en grid de 3
    BLOCKS[4] = { cols: 3, count: 2, spans: ['span 1', 'span 2'] }; // igual a C pero distinto contexto visual por alturas

    // Reconstruir con alturas variadas por bloque
    const BLOCK_SEQ = [
      { cols: 3, count: 2, spans: ['span 2', 'span 1'], h: [200, 200] }, // A
      { cols: 3, count: 3, spans: ['', '', ''], h: [150, 150, 150] }, // B
      { cols: 3, count: 2, spans: ['span 1', 'span 2'], h: [180, 180] }, // C
      { cols: 4, count: 4, spans: ['', '', '', ''], h: [160, 160, 160, 160] }, // D
      {
        cols: 3,
        count: 3,
        spans: ['span 2', '', 'span 1'],
        h: [170, 220, 170],
      }, // E: [2col][1col+tall]
    ];

    const images = group.images;
    let idx = 0; // índice en images
    let blockIdx = 0; // índice en BLOCK_SEQ
    let rows = '';

    while (idx < images.length) {
      const block = BLOCK_SEQ[blockIdx % BLOCK_SEQ.length];
      const slice = images.slice(idx, idx + block.count);
      if (slice.length === 0) break;

      // Si quedan menos fotos que el bloque, usar grid uniforme para el resto
      if (slice.length < block.count) {
        const rem = slice.length;
        const itemsHTML = slice
          .map((img, i) => {
            const absIdx = idx + i;
            return `<div class="mosaic-item" style="grid-column:span 1"
               data-project="group-${groupIndex}" data-index="${absIdx}"
               data-title="${img.title}" data-caption="${img.caption}">
            <img src="${img.src}" alt="${img.title}" loading="lazy" style="height:170px">
            <div class="mosaic-overlay"><span class="mosaic-zoom">${SVG_ZOOM}</span></div>
          </div>`;
          })
          .join('');
        rows += `<div style="display:grid;grid-template-columns:repeat(${rem},1fr);gap:6px;margin-bottom:6px">${itemsHTML}</div>`;
        break;
      }

      const itemsHTML = slice
        .map((img, i) => {
          const absIdx = idx + i;
          const span = block.spans[i] ? `grid-column:${block.spans[i]}` : '';
          const h = block.h[i] || 170;
          return `<div class="mosaic-item" style="${span}"
             data-project="group-${groupIndex}" data-index="${absIdx}"
             data-title="${img.title}" data-caption="${img.caption}">
          <img src="${img.src}" alt="${img.title}" loading="lazy" style="height:${h}px">
          <div class="mosaic-overlay"><span class="mosaic-zoom">${SVG_ZOOM}</span></div>
        </div>`;
        })
        .join('');

      rows += `<div style="display:grid;grid-template-columns:repeat(${block.cols},1fr);gap:6px;margin-bottom:6px">${itemsHTML}</div>`;

      idx += block.count;
      blockIdx += 1;
    }

    return `
      <div class="mosaic-group">
        <p class="mosaic-group-label">${group.label}</p>
        <div class="mosaic-inner">${rows}</div>
      </div>`;
  }

  /* ----------------------------------------------------------
     PAGINATION — generic factory
  ---------------------------------------------------------- */
  function makePager({
    container,
    items,
    renderFn,
    perPage,
    prevBtn,
    nextBtn,
    countEl,
  }) {
    let page = 0;
    const total = Math.ceil(items.length / perPage);

    function render() {
      const start = page * perPage;
      const slice = items.slice(start, start + perPage);
      container.innerHTML = slice.map(renderFn).join('');
      // Trigger reveal
      Array.from(container.children).forEach((el, i) => {
        el.classList.add('reveal');
        setTimeout(() => el.classList.add('visible'), i * 60);
      });
      prevBtn.disabled = page === 0;
      nextBtn.disabled = page >= total - 1;
      if (countEl)
        countEl.textContent = total > 1 ? `${page + 1} / ${total}` : '';
    }

    prevBtn.addEventListener('click', () => {
      if (page > 0) {
        page--;
        render();
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
    nextBtn.addEventListener('click', () => {
      if (page < total - 1) {
        page++;
        render();
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });

    render();
  }

  /* ----------------------------------------------------------
     INIT — web
  ---------------------------------------------------------- */
  makePager({
    container: projWeb,
    items: WEB_PROJECTS,
    renderFn: renderWebCard,
    perPage: 4,
    prevBtn: document.getElementById('pager-web-prev'),
    nextBtn: document.getElementById('pager-web-next'),
    countEl: document.getElementById('pager-web-count'),
  });

  /* ----------------------------------------------------------
     INIT — diseño
  ---------------------------------------------------------- */
  makePager({
    container: projDis,
    items: DESIGN_GROUPS,
    renderFn: (g, i) => renderDesignGroup(g, i),
    perPage: 2,
    prevBtn: document.getElementById('pager-dis-prev'),
    nextBtn: document.getElementById('pager-dis-next'),
    countEl: document.getElementById('pager-dis-count'),
  });

  /* ----------------------------------------------------------
     LIGHTBOX
  ---------------------------------------------------------- */
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');
  const lbCaption = document.getElementById('lb-caption');
  const lbCounter = document.getElementById('lb-counter');
  const lbClose = document.getElementById('lb-close');
  const lbPrev = document.getElementById('lb-prev');
  const lbNext = document.getElementById('lb-next');

  let currentProject = [];
  let currentIndex = 0;

  function openLightbox(items, index) {
    currentProject = items;
    currentIndex = index;
    showSlide(currentIndex);
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function showSlide(index) {
    const item = currentProject[index];
    lbImg.classList.add('fading');
    setTimeout(() => {
      lbImg.src = item.querySelector('img').src;
      lbImg.alt = item.dataset.title || '';
      lbCaption.textContent = item.dataset.caption || item.dataset.title || '';
      lbCounter.textContent = `${index + 1} / ${currentProject.length}`;
      lbImg.classList.remove('fading');
    }, 160);
  }

  function prevSlide() {
    currentIndex =
      (currentIndex - 1 + currentProject.length) % currentProject.length;
    showSlide(currentIndex);
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % currentProject.length;
    showSlide(currentIndex);
  }

  // Click on mosaic item
  document.addEventListener('click', (e) => {
    const item = e.target.closest('.mosaic-item');
    if (!item) return;
    const projectKey = item.dataset.project;
    const index = parseInt(item.dataset.index, 10);
    const siblings = Array.from(
      document.querySelectorAll(`.mosaic-item[data-project="${projectKey}"]`),
    );
    openLightbox(siblings, index);
  });

  // Controls
  lbClose.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click', prevSlide);
  lbNext.addEventListener('click', nextSlide);

  // Click outside image to close
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });

  /* ----------------------------------------------------------
     SCROLL REVEAL
  ---------------------------------------------------------- */
  function initReveal() {
    const targets = document.querySelectorAll(
      '.hero > .container > *, .proj-card, .stack-cat, .tl-item, .about-wrap, .contact-wrap, .brands, .brand-pill',
    );

    targets.forEach((el) => el.classList.add('reveal'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            // Stagger sibling elements
            const siblings = Array.from(entry.target.parentElement.children);
            const index = siblings.indexOf(entry.target);
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, index * 60);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );

    targets.forEach((el) => observer.observe(el));
  }

  // Run after paint
  if ('IntersectionObserver' in window) {
    initReveal();
  } else {
    // Fallback: show everything
    document
      .querySelectorAll('.reveal')
      .forEach((el) => el.classList.add('visible'));
  }

  /* ----------------------------------------------------------
     CONTACT FORM — basic validation + Formspree
  ---------------------------------------------------------- */
  const form = document.getElementById('contact-form');

  if (form) {
    const btn = form.querySelector('.form-btn');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const action = form.getAttribute('action');

      // If Formspree not configured yet, show a friendly message
      if (!action || action.includes('XXXXXXXX')) {
        showFormMsg(
          form,
          'Para activar el formulario, reemplazá XXXXXXXX en el HTML por tu ID de Formspree.',
          'info',
        );
        return;
      }

      if (btn) {
        btn.textContent = 'enviando...';
        btn.disabled = true;
      }

      try {
        const data = new FormData(form);
        const res = await fetch(action, {
          method: 'POST',
          body: data,
          headers: { Accept: 'application/json' },
        });

        if (res.ok) {
          showFormMsg(
            form,
            '¡Mensaje enviado! Te respondo a la brevedad.',
            'success',
          );
          form.reset();
        } else {
          throw new Error('Error en el servidor');
        }
      } catch (err) {
        showFormMsg(
          form,
          'Algo salió mal. Escríbeme directamente a christian.tapia.dev@gmail.com',
          'error',
        );
      } finally {
        if (btn) {
          btn.textContent = 'enviar mensaje';
          btn.disabled = false;
        }
      }
    });
  }

  function showFormMsg(form, text, type) {
    let msg = form.querySelector('.form-msg');
    if (!msg) {
      msg = document.createElement('p');
      msg.className = 'form-msg';
      form.appendChild(msg);
    }
    msg.textContent = text;
    msg.style.cssText = `
      font-size: 12px;
      padding: 10px 14px;
      border-radius: 8px;
      margin-top: 4px;
      background: ${type === 'success' ? 'rgba(16,185,129,0.12)' : type === 'error' ? 'rgba(239,68,68,0.1)' : 'rgba(108,99,255,0.1)'};
      color: ${type === 'success' ? '#34d399' : type === 'error' ? '#f87171' : '#a78bfa'};
      border: 0.5px solid ${type === 'success' ? 'rgba(16,185,129,0.3)' : type === 'error' ? 'rgba(239,68,68,0.2)' : 'rgba(108,99,255,0.2)'};
    `;
  }

  /* ----------------------------------------------------------
     LAZY LOAD IMAGES
  ---------------------------------------------------------- */
  if ('loading' in HTMLImageElement.prototype) {
    // Native lazy load supported — attribute already set in HTML
  } else {
    // Polyfill for older browsers
    const lazyImgs = document.querySelectorAll('img[loading="lazy"]');
    const imgObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) img.src = img.dataset.src;
          imgObserver.unobserve(img);
        }
      });
    });
    lazyImgs.forEach((img) => imgObserver.observe(img));
  }
})();
