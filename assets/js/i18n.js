// i18n.js - manejo simple de traducciones con JSON por idioma
(() => {
  const STORAGE_KEY = 'ccn_lang';
  const DEFAULT_LANG = 'es';
  const supported = ['es', 'en'];

  const getLang = () => localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
  const setLang = (lang) => localStorage.setItem(STORAGE_KEY, lang);

  async function loadTranslations(lang) {
    const safe = supported.includes(lang) ? lang : DEFAULT_LANG;
    const res = await fetch(`translations/${safe}.json`, { cache: 'no-cache' });
    if (!res.ok) throw new Error('No se pudieron cargar traducciones');
    return res.json();
  }

  function applyTranslations(dict) {
    const nodes = document.querySelectorAll('[data-i18n]');
    nodes.forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const value = key.split('.').reduce((acc, k) => (acc && acc[k] != null ? acc[k] : null), dict);
      if (value == null) return;
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = String(value);
      } else {
        el.textContent = String(value);
      }
    });
    document.documentElement.lang = dict.meta?.lang || getLang();
    const btn = document.getElementById('lang-toggle');
    if (btn) btn.textContent = (dict.meta?.lang || 'ES').toUpperCase();
    document.title = dict.seo?.title || document.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta && dict.seo?.description) meta.setAttribute('content', dict.seo.description);
  }

  async function initI18n() {
    const lang = getLang();
    const dict = await loadTranslations(lang);
    applyTranslations(dict);

    const toggle = document.getElementById('lang-toggle');
    if (toggle) {
      toggle.addEventListener('click', async () => {
        const current = getLang();
        const next = current === 'es' ? 'en' : 'es';
        setLang(next);
        const d = await loadTranslations(next);
        applyTranslations(d);
        document.dispatchEvent(new CustomEvent('i18n:changed', { detail: { lang: next, dict: d } }));
      });
    }
  }

  document.addEventListener('DOMContentLoaded', initI18n);

  // Expose minimal API
  window.i18n = { getLang, setLang, loadTranslations, applyTranslations };
})();
