// app.js - render dinámico de tours, carrusel y acciones
(function () {
  const TOURS_BASE = 'img/toures';
  const SERVICES_BASE = 'img/Otros servicios';
  // Mapear carpetas conocidas a nombres amigables por clave i18n
  const TOURS = [
  { folder: 'Atardecer sibarita master', key: 'tours.atardecer_sibarita', descKey: 'desc.tours.atardecer_sibarita' },
  { folder: 'chiva rumbera', key: 'tours.chiva_rumbera', descKey: 'desc.tours.chiva_rumbera' },
  { folder: 'City tour', key: 'tours.city_tour', descKey: 'desc.tours.city_tour' },
  { folder: 'Eteka beach resort', key: 'tours.eteka_beach', descKey: 'desc.tours.eteka_beach' },
  { folder: 'Pao Pao', key: 'tours.pao_pao', descKey: 'desc.tours.pao_pao' },
  { folder: 'Playa blanca', key: 'tours.playa_blanca', descKey: 'desc.tours.playa_blanca' },
  { folder: 'playa tranquila', key: 'tours.playa_tranquila', descKey: 'desc.tours.playa_tranquila' },
  { folder: 'Tour 5 islas', key: 'tours.tour_cinco_islas', descKey: 'desc.tours.tour_cinco_islas' },
  ];

  // Servicios: nombre de archivo exacto según estructura
  const SERVICES = [
  { file: 'Alquiler de caballos.webp', key: 'services.alquiler_caballos', descKey: 'desc.services.alquiler_caballos' },
  { file: 'Alquiler de cuatrimoto.webp', key: 'services.alquiler_cuatrimoto', descKey: 'desc.services.alquiler_cuatrimoto' },
  { file: 'Alquiler de yates.webp', key: 'services.alquiler_yates', descKey: 'desc.services.alquiler_yates' }
  ];

  // Conteos estáticos de imágenes basados en la estructura provista del proyecto
  const IMAGE_COUNTS = {
    'Atardecer sibarita master': 2,
    'chiva rumbera': 3,
    'City tour': 3,
    'Eteka beach resort': 4,
    'Pao Pao': 5,
    'Playa blanca': 3,
    'playa tranquila': 2,
    'Tour 5 islas': 4
  };

  function listImagesFor(folder) {
    const n = IMAGE_COUNTS[folder] || 0;
    const arr = [];
    for (let i = 1; i <= n; i++) {
      arr.push(`${TOURS_BASE}/${folder}/${i}.webp`);
    }
    return arr;
  }

  function t(dict, path, fallback) {
    const v = path.split('.').reduce((acc, k) => (acc && acc[k] != null ? acc[k] : null), dict);
    return v ?? fallback ?? path;
  }

  function getWhatsAppURL(text) {
    const number = document.body.getAttribute('data-whatsapp-number') || '';
    const msg = encodeURIComponent(text || 'Hola, estoy interesado en este tour');
    const base = number ? `https://wa.me/${number}` : 'https://wa.me/';
    return `${base}?text=${msg}`;
  }

  function createCarousel(images, alt, auto = true, intervalMs = 3500, transitionMs = 600) {
    const container = document.createElement('div');
    container.className = 'carousel';

    const track = document.createElement('div');
    track.className = 'carousel-track';
    track.style.setProperty('--carousel-duration', `${transitionMs}ms`);

    images.forEach((src) => {
      const slide = document.createElement('div');
      slide.className = 'carousel-slide';
      const img = document.createElement('img');
      img.src = src;
      img.alt = alt;
      img.loading = 'lazy';
      img.decoding = 'async';
      slide.appendChild(img);
      track.appendChild(slide);
    });

    const prev = document.createElement('button');
    prev.className = 'carousel-btn prev';
    prev.setAttribute('aria-label', 'Anterior');
    prev.innerHTML = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.5 15L7.5 10L12.5 5" stroke="#0f172a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

    const next = document.createElement('button');
    next.className = 'carousel-btn next';
    next.setAttribute('aria-label', 'Siguiente');
    next.innerHTML = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 5L12.5 10L7.5 15" stroke="#0f172a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

    container.appendChild(track);
    container.appendChild(prev);
    container.appendChild(next);

    let index = 0;
    function update() {
      // requestAnimationFrame para suavizar y evitar stutter
      requestAnimationFrame(() => {
        track.style.transform = `translateX(-${index * 100}%)`;
      });
    }
    function go(delta) {
      index = (index + delta + images.length) % images.length;
      update();
    }
  prev.addEventListener('click', () => go(-1));
  next.addEventListener('click', () => go(1));

    // Swipe soporte móvil
    let startX = 0;
    container.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });
    container.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) go(dx > 0 ? -1 : 1);
    });

    let timer = null;
    function start() {
      if (!auto || images.length <= 1) return;
      stop();
      timer = setInterval(() => go(1), intervalMs);
    }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
  container.addEventListener('mouseenter', stop);
  container.addEventListener('mouseleave', start);
    container.addEventListener('touchstart', stop, { passive: true });
    container.addEventListener('touchend', start, { passive: true });
    start();
    return { el: container, go, update, start, stop };
  }

  function createTourCard(dict, tour, images) {
    const card = document.createElement('article');
    card.className = 'card';
    card.tabIndex = 0;

    const alt = `${t(dict, tour.key, tour.folder)} - Cartagena con Neys`;
    const carousel = createCarousel(images, alt);
    card.appendChild(carousel.el);

    const overlay = document.createElement('div');
    overlay.className = 'card-overlay';

    const title = document.createElement('h3');
    title.className = 'card-title';
    title.textContent = t(dict, tour.key, tour.folder);

    const actions = document.createElement('div');
    actions.className = 'card-actions';

    const btnChat = document.createElement('a');
    btnChat.href = getWhatsAppURL(t(dict, 'cta.whatsapp_message', 'Hola, estoy interesado en este tour'));
    btnChat.target = '_blank';
    btnChat.rel = 'noopener';
    btnChat.className = 'inline-flex items-center gap-2 rounded-md bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-3 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500';
    btnChat.textContent = t(dict, 'cta.chat', 'Conversemos');

    const btnMore = document.createElement('button');
    btnMore.type = 'button';
    btnMore.className = 'inline-flex items-center gap-2 rounded-md border border-white/80 bg-white/90 hover:bg-white text-slate-900 text-sm font-semibold px-3 py-2';
    btnMore.textContent = t(dict, 'cta.more', 'Conocer más');
  btnMore.addEventListener('click', () => openModal({
      title: t(dict, tour.key, tour.folder),
      body: t(dict, tour.descKey, ''),
      actionHref: getWhatsAppURL(t(dict, 'cta.whatsapp_message', 'Hola, estoy interesado en este tour'))
    }));

    actions.appendChild(btnChat);
    actions.appendChild(btnMore);
    overlay.appendChild(title);
    overlay.appendChild(actions);
    card.appendChild(overlay);

    // Hover/touch handling para móvil
    card.addEventListener('touchstart', () => {
      card.classList.add('touch-active');
      setTimeout(() => card.classList.remove('touch-active'), 3000);
    });

    return card;
  }

  function createServiceCard(dict, service) {
    const card = document.createElement('article');
    card.className = 'card';
    const img = document.createElement('img');
    img.src = `${SERVICES_BASE}/${service.file}`;
    img.alt = `${t(dict, service.key)} - Cartagena con Neys`;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.style.height = '220px';
    img.style.width = '100%';
    img.style.objectFit = 'cover';
    card.appendChild(img);

    const overlay = document.createElement('div');
    overlay.className = 'card-overlay';

    const title = document.createElement('h3');
    title.className = 'card-title';
    title.textContent = t(dict, service.key);

  const actions = document.createElement('div');
    actions.className = 'card-actions';

    const btnChat = document.createElement('a');
    btnChat.href = getWhatsAppURL(t(dict, 'cta.whatsapp_message', 'Hola, estoy interesado en este tour'));
    btnChat.target = '_blank';
    btnChat.rel = 'noopener';
    btnChat.className = 'inline-flex items-center gap-2 rounded-md bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-3 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500';
    btnChat.textContent = t(dict, 'cta.chat', 'Conversemos');

    const btnMore = document.createElement('button');
    btnMore.type = 'button';
    btnMore.className = 'inline-flex items-center gap-2 rounded-md border border-white/80 bg-white/90 hover:bg-white text-slate-900 text-sm font-semibold px-3 py-2';
    btnMore.textContent = t(dict, 'cta.more', 'Conocer más');
    btnMore.addEventListener('click', () => openModal({
      title: t(dict, service.key),
      body: t(dict, service.descKey, ''),
      actionHref: getWhatsAppURL(t(dict, 'cta.whatsapp_message', 'Hola, estoy interesado en este tour'))
    }));

    actions.appendChild(btnChat);
    actions.appendChild(btnMore);
    overlay.appendChild(title);
    overlay.appendChild(actions);
    card.appendChild(overlay);

    card.addEventListener('touchstart', () => {
      card.classList.add('touch-active');
      setTimeout(() => card.classList.remove('touch-active'), 3000);
    });

    return card;
  }

  async function renderTours(dict) {
    const grid = document.getElementById('tours-grid');
    const countEl = document.getElementById('tours-count');
    if (!grid) return;
    grid.innerHTML = '';

  const results = TOURS.map((tour) => ({ tour, images: listImagesFor(tour.folder) }));

    const valid = results.filter((r) => r.images.length > 0);
    valid.forEach(({ tour, images }) => {
      const card = createTourCard(dict, tour, images);
      grid.appendChild(card);
    });

    if (countEl) countEl.textContent = `${valid.length} ${t(dict, 'tours.count_label', 'tours disponibles')}`;
  }

  function renderServices(dict) {
    const grid = document.getElementById('services-grid');
    if (!grid) return;
    grid.innerHTML = '';
    SERVICES.forEach((s) => grid.appendChild(createServiceCard(dict, s)));
  }

  // Modal simple reutilizable
  function openModal({ title, body, actionHref }) {
    const modal = document.getElementById('app-modal');
    if (!modal) return;
    const titleEl = document.getElementById('modal-title');
    const bodyEl = document.getElementById('modal-body');
    const actionEl = document.getElementById('modal-action');
    const cancelEl = document.getElementById('modal-cancel');
    const closeEl = document.getElementById('modal-close');
  const panelEl = modal.querySelector('.modal-panel');
  const activeBefore = document.activeElement;
    titleEl.textContent = title || '';
    bodyEl.textContent = body || '';
    actionEl.href = actionHref || '#';
  // Scroll lock sin provocar salto en móviles
  const scrollY = window.scrollY || document.documentElement.scrollTop;
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollY}px`;
  document.body.style.left = '0';
  document.body.style.right = '0';
  document.body.classList.add('modal-open');
  modal.setAttribute('aria-hidden', 'false');
  // Enfocar sin desplazamiento
  setTimeout(() => panelEl?.focus({ preventScroll: true }), 0);

    const close = () => {
      modal.setAttribute('aria-hidden', 'true');
      // Restaurar scroll original
      const y = parseInt((document.body.style.top || '0').replace('-', ''), 10) || 0;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.classList.remove('modal-open');
      window.scrollTo(0, y);
      // Devolver foco sin scroll
      if (activeBefore && typeof activeBefore.focus === 'function') {
        try { activeBefore.focus({ preventScroll: true }); } catch (_) {}
      }
    };
    cancelEl.onclick = close;
    closeEl.onclick = close;
    modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
    document.addEventListener('keydown', function esc(e){ if (e.key === 'Escape') { close(); document.removeEventListener('keydown', esc); } });
  }

  function setupContactLinks(dict) {
    const fb = document.getElementById('btn-facebook');
    const ig = document.getElementById('btn-instagram');
    const wa = document.getElementById('btn-whatsapp');
    const em = document.getElementById('btn-email');
  // URLs reales del cliente
  if (fb) fb.href = 'https://www.facebook.com/share/16ikpJmhMt/?mibextid=wwXIfr';
  if (ig) ig.href = 'https://www.instagram.com/romeroneys50?igsh=MXh6b3lzcTA1MHE1bg%3D%3D&utm_source=qr';
  if (wa) wa.href = getWhatsAppURL(t(dict, 'cta.whatsapp_message', 'Hola, estoy interesado en este tour'));
  if (em) em.href = 'mailto:romeroneys50@gmail.com';
  }

  async function boot() {
    // Esperar a que i18n haya aplicado traducciones
    const lang = (window.i18n && window.i18n.getLang && window.i18n.getLang()) || 'es';
    const dict = await window.i18n.loadTranslations(lang);
    window.i18n.applyTranslations(dict);
    await renderTours(dict);
  renderServices(dict);
    setupContactLinks(dict);

    document.addEventListener('i18n:changed', async (ev) => {
      const { dict } = ev.detail;
  await renderTours(dict);
  renderServices(dict);
      setupContactLinks(dict);
    });

    // Suavizar scroll
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href').slice(1);
        const el = document.getElementById(id);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', boot);
})();
