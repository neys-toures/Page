// app.js - render dinámico de tours, carrusel y acciones
(function () {
  const TOURS_BASE = 'img/toures';
  const SERVICES_BASE = 'img/Otros servicios';
  // Mapear carpetas conocidas a nombres amigables por clave i18n
  const TOURS = [
  { folder: 'Atardecer sibarita master', key: 'tours.atardecer_sibarita', priceKey: 'price.tours.atardecer_sibarita', descKey: 'desc.tours.atardecer_sibarita' },
  { folder: 'chiva rumbera', key: 'tours.chiva_rumbera', priceKey: 'price.tours.chiva_rumbera', descKey: 'desc.tours.chiva_rumbera' },
  { folder: 'City tour', key: 'tours.city_tour', priceKey: 'price.tours.city_tour', descKey: 'desc.tours.city_tour' },
  { folder: 'Eteka beach resort', key: 'tours.eteka_beach', priceKey: 'price.tours.eteka_beach', descKey: 'desc.tours.eteka_beach' },
  { folder: 'Pao Pao', key: 'tours.pao_pao', priceKey: 'price.tours.pao_pao', descKey: 'desc.tours.pao_pao' },
  { folder: 'Playa blanca', key: 'tours.playa_blanca', priceKey: 'price.tours.playa_blanca', descKey: 'desc.tours.playa_blanca' },
  { folder: 'playa tranquila', key: 'tours.playa_tranquila', priceKey: 'price.tours.playa_tranquila', descKey: 'desc.tours.playa_tranquila' },
  { folder: 'Tour 5 islas', key: 'tours.tour_cinco_islas', priceKey: 'price.tours.tour_cinco_islas', descKey: 'desc.tours.tour_cinco_islas' },
  { folder: 'Volcan de totumo', key: 'tours.volcan_totumo', priceKey: 'price.tours.volcan_totumo', descKey: 'desc.tours.volcan_totumo' },
  { folder: 'Palenque', key: 'tours.tour_palenque', priceKey: 'price.tours.tour_palenque', descKey: 'desc.tours.tour_palenque' },
  // Nuevos tours añadidos por el cliente (ahora mapeados a carpetas reales)
  { folder: 'Top 3 islas vip', key: 'tours.top3_islas_vip', priceKey: 'price.tours.top3_islas_vip', descKey: 'desc.tours.top3_islas_vip' },
  { folder: 'bora bora', key: 'tours.bora_bora', priceKey: 'price.tours.bora_bora', descKey: 'desc.tours.bora_bora' },
  { folder: 'Tour 4 islas vip', key: 'tours.top4_islas_vip', priceKey: 'price.tours.top4_islas_vip', descKey: 'desc.tours.top4_islas_vip' },
  { folder: 'Cholon', key: 'tours.cholon', priceKey: 'price.tours.cholon', descKey: 'desc.tours.cholon' },
  { folder: 'Baranquilla santa marta', key: 'tours.barranquilla_tour', priceKey: 'price.tours.barranquilla_tour', descKey: 'desc.tours.barranquilla_tour' },
  { folder: 'luxuri', key: 'tours.luxury', priceKey: 'price.tours.luxury', descKey: 'desc.tours.luxury' },
  { folder: 'isla lizamar', key: 'tours.isla_lizmar', priceKey: 'price.tours.isla_lizmar', descKey: 'desc.tours.isla_lizmar' },
  { folder: 'isla del sol', key: 'tours.isla_del_sol', priceKey: 'price.tours.isla_del_sol', descKey: 'desc.tours.isla_del_sol' },
  { folder: 'isla del pirata', key: 'tours.isla_pirata', priceKey: 'price.tours.isla_pirata', descKey: 'desc.tours.isla_pirata' },
  { folder: 'Isla cocotera', key: 'tours.isla_cocotera', priceKey: 'price.tours.isla_cocotera', descKey: 'desc.tours.isla_cocotera' },
  { folder: 'isla del encanto', key: 'tours.isla_del_encanto', priceKey: 'price.tours.isla_del_encanto', descKey: 'desc.tours.isla_del_encanto' },
  { folder: 'isla encantada', key: 'tours.isla_encantada', priceKey: 'price.tours.isla_encantada', descKey: 'desc.tours.isla_encantada' }
  ];
  // Nuevos (agosto 2025)
  TOURS.push(
    { folder: 'isla de Ibbiza', key: 'tours.isla_ibbiza', priceKey: 'price.tours.isla_ibbiza', descKey: 'desc.tours.isla_ibbiza' },
    { folder: 'Tour bahia', key: 'tours.tour_bahia', priceKey: 'price.tours.tour_bahia', descKey: 'desc.tours.tour_bahia' },
    { folder: 'Barco pirata', key: 'tours.barco_pirata', priceKey: 'price.tours.barco_pirata', descKey: 'desc.tours.barco_pirata' }
  );
  // Nuevos adicionales
  TOURS.push(
    { folder: 'Paue', key: 'tours.isla_paue', priceKey: 'price.tours.isla_paue', descKey: 'desc.tours.isla_paue' },
    { folder: 'Cena sibarita', key: 'tours.cena_sibarita', priceKey: 'price.tours.cena_sibarita', descKey: 'desc.tours.cena_sibarita' }
  );

  // Servicios: nombre de archivo exacto según estructura
  const SERVICES = [
  { file: 'Alquiler de caballos.webp', key: 'services.alquiler_caballos', descKey: 'desc.services.alquiler_caballos' },
  { file: 'Alquiler de cuatrimoto.webp', key: 'services.alquiler_cuatrimoto', descKey: 'desc.services.alquiler_cuatrimoto' },
  { file: 'Alquiler de yates.webp', key: 'services.alquiler_yates', descKey: 'desc.services.alquiler_yates' }
  ];

  // Conteos estáticos de imágenes basados en la estructura provista del proyecto
  const IMAGE_COUNTS = {
    'Atardecer sibarita master': 2,
    'Baranquilla santa marta': 5,
    'bora bora': 5,
    'chiva rumbera': 3,
    'Cholon': 4,
    'City tour': 3,
    'Eteka beach resort': 4,
    'Isla cocotera': 4,
    'isla del encanto': 5,
    'isla del pirata': 5,
    'isla del sol': 6,
    'isla encantada': 4,
    'isla lizamar': 6,
    'luxuri': 4,
    'Palenque': 4,
    'Pao Pao': 5,
    'Playa blanca': 3,
    'playa tranquila': 2,
    'Top 3 islas vip': 4,
    'Tour 4 islas vip': 4,
    'Tour 5 islas': 4,
    'Volcan de totumo': 3
  };
  // Conteos para nuevos (agosto 2025)
  IMAGE_COUNTS['isla de Ibbiza'] = 3;
  IMAGE_COUNTS['Tour bahia'] = 3;
  IMAGE_COUNTS['Barco pirata'] = 3;
  IMAGE_COUNTS['Paue'] = 4;
  IMAGE_COUNTS['Cena sibarita'] = 4;

  function listImagesFor(folder) {
    const n = IMAGE_COUNTS[folder];
    const first = `${TOURS_BASE}/${folder}/1.webp`;
    if (typeof n === 'number' && n > 0) {
      const rest = [];
      for (let i = 2; i <= n; i++) rest.push(`${TOURS_BASE}/${folder}/${i}.webp`);
      return { images: [first], rest, needsDiscover: false };
    }
    // Fallback mínimo: asumir al menos 1.webp y descubrir el resto
    return { images: [first], rest: [], needsDiscover: true };
  }

  async function discoverImages(folder, max = 8) {
    const urls = [];
    // Si HEAD no está permitido, usaremos carga de Image como fallback
    for (let i = 1; i <= max; i++) {
      const url = `${TOURS_BASE}/${folder}/${i}.webp`;
      try {
        const res = await fetch(url, { method: 'HEAD' });
        if (res.ok) urls.push(url);
        else if (res.status === 405) {
          const ok = await new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = url;
          });
          if (ok) urls.push(url);
        }
      } catch (_) {
        // Fallback a prueba de imagen
        const ok = await new Promise((resolve) => {
          const img = new Image();
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false);
          img.src = url;
        });
        if (ok) urls.push(url);
      }
    }
    return urls;
  }

  function t(dict, path, fallback) {
    const v = path.split('.').reduce((acc, k) => (acc && acc[k] != null ? acc[k] : null), dict);
    return v ?? fallback ?? path;
  }

  function getCurrentLang() {
    try { return (window.i18n && window.i18n.getLang && window.i18n.getLang()) || document.documentElement.lang || 'es'; }
    catch (_) { return 'es'; }
  }

  function buildTourMessage(name) {
    const lang = getCurrentLang();
    return lang === 'es' ? `Estoy interesado en este tour ${name}` : `I'm interested in this tour ${name}`;
  }

  function buildServiceMessage(name) {
    const lang = getCurrentLang();
    return lang === 'es' ? `Estoy interesado en este servicio ${name}` : `I'm interested in this service ${name}`;
  }

  function getWhatsAppURL(text) {
    const number = document.body.getAttribute('data-whatsapp-number') || '';
    const msg = encodeURIComponent(text || 'Hola, estoy interesado en este tour');
    const base = number ? `https://wa.me/${number}` : 'https://wa.me/';
    return `${base}?text=${msg}`;
  }

  function createCarousel(images, alt, auto = true, intervalMs = 5200, transitionMs = 600) {
    const container = document.createElement('div');
    container.className = 'carousel';

    const track = document.createElement('div');
    track.className = 'carousel-track';
    track.style.setProperty('--carousel-duration', `${transitionMs}ms`);

    let imgs = [...images];
    function appendSlide(src) {
      const slide = document.createElement('div');
      slide.className = 'carousel-slide';
      const img = document.createElement('img');
      img.src = src;
      img.alt = alt;
      img.loading = 'lazy';
      img.decoding = 'async';
      img.onerror = () => {
        // Reemplazar por un placeholder si la imagen no existe
        slide.innerHTML = '';
        const ph = document.createElement('div');
        ph.className = 'placeholder-cover';
        ph.setAttribute('role', 'img');
        ph.setAttribute('aria-label', alt);
        slide.appendChild(ph);
      };
      slide.appendChild(img);
      track.appendChild(slide);
    }
    imgs.forEach(appendSlide);

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
      index = (index + delta + imgs.length) % imgs.length;
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
    let visible = true;
    function start() {
      if (!auto || imgs.length <= 1 || !visible) return;
      stop();
      timer = setInterval(() => go(1), intervalMs);
    }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
  container.addEventListener('mouseenter', stop);
  container.addEventListener('mouseleave', start);
    container.addEventListener('touchstart', stop, { passive: true });
    container.addEventListener('touchend', start, { passive: true });
    // Pausar cuando el carrusel no está en viewport para ahorrar recursos
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        visible = entry.isIntersecting;
        if (visible) start(); else stop();
      });
    }, { rootMargin: '0px', threshold: 0.2 });
    io.observe(container);
    start();
    function addImages(newOnes = []) {
      if (!Array.isArray(newOnes) || newOnes.length === 0) return;
      newOnes.forEach((src) => { imgs.push(src); appendSlide(src); });
      update();
      start();
    }
    return { el: container, go, update, start, stop, addImages };
  }

  function createTourCard(dict, tour, initial) {
    const card = document.createElement('article');
    card.className = 'card';
    card.tabIndex = 0;

    const alt = `${t(dict, tour.key, tour.folder)} - Cartagena con Neys`;
    const carousel = createCarousel(initial.images, alt);
    card.appendChild(carousel.el);

    // Insignia de precio
    const priceText = tour.priceKey ? t(dict, tour.priceKey, t(dict, 'price.placeholder', 'cambiar')) : t(dict, 'price.placeholder', 'cambiar');
    const price = document.createElement('div');
    price.className = 'price-badge';
    price.textContent = priceText;
    card.appendChild(price);

    const overlay = document.createElement('div');
    overlay.className = 'card-overlay';

    const title = document.createElement('h3');
    title.className = 'card-title';
    title.textContent = t(dict, tour.key, tour.folder);

    const actions = document.createElement('div');
    actions.className = 'card-actions';

  const btnChat = document.createElement('a');
  const tourName = t(dict, tour.key, tour.folder);
  btnChat.href = getWhatsAppURL(buildTourMessage(tourName));
    btnChat.target = '_blank';
    btnChat.rel = 'noopener';
    btnChat.className = 'inline-flex items-center gap-2 rounded-md bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-3 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500';
    btnChat.textContent = t(dict, 'cta.chat', 'Conversemos');

    const btnMore = document.createElement('button');
    btnMore.type = 'button';
    btnMore.className = 'inline-flex items-center gap-2 rounded-md border border-white/80 bg-white/90 hover:bg-white text-slate-900 text-sm font-semibold px-3 py-2';
    btnMore.textContent = t(dict, 'cta.more', 'Conocer más');
    btnMore.addEventListener('click', () => openModal({
      title: tourName,
      body: t(dict, tour.descKey, ''),
      actionHref: getWhatsAppURL(buildTourMessage(tourName))
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

    // Marcar para descubrimiento perezoso si aplica
    card.dataset.folder = tour.folder;
    // Guardar referencia al carrusel para añadir imágenes luego
    card._carousel = carousel;
    // Si hay más imágenes o requiere descubrimiento, marcar para lazy
    if ((initial.rest && initial.rest.length > 0) || initial.needsDiscover) {
      card.dataset.lazy = 'true';
      if (initial.rest && initial.rest.length > 0) card._lazyRest = initial.rest;
    }

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
  const svcName = t(dict, service.key);
  btnChat.href = getWhatsAppURL(buildServiceMessage(svcName));
    btnChat.target = '_blank';
    btnChat.rel = 'noopener';
    btnChat.className = 'inline-flex items-center gap-2 rounded-md bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-3 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500';
    btnChat.textContent = t(dict, 'cta.chat', 'Conversemos');

    const btnMore = document.createElement('button');
    btnMore.type = 'button';
    btnMore.className = 'inline-flex items-center gap-2 rounded-md border border-white/80 bg-white/90 hover:bg-white text-slate-900 text-sm font-semibold px-3 py-2';
    btnMore.textContent = t(dict, 'cta.more', 'Conocer más');
    btnMore.addEventListener('click', () => openModal({
      title: svcName,
      body: t(dict, service.descKey, ''),
      actionHref: getWhatsAppURL(buildServiceMessage(svcName))
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

  const results = TOURS.map((tour) => ({ tour, initial: listImagesFor(tour.folder) }));

    const valid = results.filter((r) => r.initial.images.length > 0);
    // Mostrar solo 3 filas inicialmente (depende de columnas responsive)
    const isLg = window.matchMedia('(min-width: 1024px)').matches; // lg:grid-cols-3
    const isSm = window.matchMedia('(min-width: 640px)').matches;  // sm:grid-cols-2
    const cols = isLg ? 3 : (isSm ? 2 : 1);
    const initialCount = cols * 3; // 3 filas
    const toShow = valid.slice(0, initialCount);
    const hidden = valid.slice(initialCount);
    toShow.forEach(({ tour, initial }) => {
      const card = createTourCard(dict, tour, initial);
      grid.appendChild(card);
    });
    if (hidden.length) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'mt-2 w-full rounded-md border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-semibold py-2';
      const baseLabel = t(dict, 'cta.show_more', 'Ver más');
      let nextIndex = 0;
      const chunkSize = 6; // cargar 6 por tanda
      const updateLabel = () => {
        const remaining = hidden.length - nextIndex;
        btn.textContent = remaining > 0 ? `${baseLabel}` : baseLabel;
      };
      updateLabel();
      btn.addEventListener('click', () => {
        const slice = hidden.slice(nextIndex, nextIndex + chunkSize);
        slice.forEach(({ tour, initial }) => {
          const card = createTourCard(dict, tour, initial);
          grid.appendChild(card);
        });
        nextIndex += slice.length;
        // Reconfigurar lazy observer para los nuevos elementos
        setupLazy(grid);
        if (nextIndex >= hidden.length) {
          btn.remove();
        } else {
          updateLabel();
        }
      });
      grid.parentElement.appendChild(btn);
    }

    if (countEl) countEl.textContent = `${valid.length} ${t(dict, 'tours.count_label', 'tours disponibles')}`;

    setupLazy(grid);
  }

  function setupLazy(grid) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          if (el.dataset.lazy === 'true' && el.dataset.folder && el._carousel) {
            if (el._lazyRest && el._lazyRest.length) {
              el._carousel.addImages(el._lazyRest);
              el.dataset.lazy = 'done';
            } else {
              const found = await discoverImages(el.dataset.folder, 8);
              if (Array.isArray(found) && found.length > 1) {
                el._carousel.addImages(found.slice(1));
                el.dataset.lazy = 'done';
              }
            }
          }
          obs.unobserve(el);
        }
      });
    }, { rootMargin: '200px 0px', threshold: 0.15 });
    Array.from(grid.children).forEach((child) => io.observe(child));
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
