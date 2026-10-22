// Idioma de la página: español (texto original del HTML) o inglés.
// - Los elementos con data-i18n="clave" cambian su contenido.
// - Los bloques con data-lang-block="es" / "en" se muestran según el idioma.
// - La elección se guarda en el navegador y también se puede forzar con ?lang=en.
(function () {
  var EN = {
    nav_open: 'Open menu',
    nav_features: 'Features',
    nav_preview: 'Preview',
    nav_requirements: 'Requirements',
    nav_about: 'About',
    nav_privacy: 'Privacy',
    nav_platforms: 'PLATFORMS',
    nav_back: '← BACK TO SITE',
    hero_pill: 'ONLINE MULTIPLAYER • EPIC ONLINE SERVICES • EASY ANTI-CHEAT',
    hero_title: 'TURN-BASED COMBAT, PHYSICS AND TOTAL CHAOS',
    hero_text: 'Pick your pet, customize it and battle with crazy weapons in online matches of up to 6 players.',
    hero_button: 'SEE PLATFORMS',
    features_title: 'READY FOR BATTLE',
    features_sub: 'Built from scratch for quick, fair and competitive matches.',
    card1_title: 'Online Matches for 1 to 6 Players',
    card1_text: 'Create private rooms to play with your friends by invitation.',
    card2_title: 'Your Pets and Customization',
    card2_text: 'Choose from 8 pets, change their colors and equip them with hats, flags and mini pets.',
    card3_title: 'Practice Mode',
    card3_text: 'Fine-tune your angles, work out your shot power and try every weapon in the arsenal with no time pressure.',
    preview_title: 'LOBBY & MULTIPLAYER ROOMS',
    preview_alt_menu: 'Game main menu',
    preview_alt_gameplay: 'Gameplay in progress',
    preview_alt_map: 'Game map',
    preview_dialog: 'Enlarged screenshot',
    preview_close: 'Close image',
    platforms_title: 'CHOOSE YOUR PLATFORM',
    platforms_sub: 'The game is not released yet. It will come to PC first.',
    soon: 'COMING SOON',
    req_title: 'SYSTEM REQUIREMENTS',
    req_sub: 'Windows PC. An internet connection is required to play online.',
    req_min: 'MINIMUM',
    req_rec: 'RECOMMENDED',
    req_os: 'Operating system',
    req_cpu: 'Processor',
    req_ram: 'Memory',
    req_gpu: 'Graphics',
    req_disk: 'Storage',
    req_net: 'Network',
    req_cpu_min: 'Dual-core 2.0 GHz',
    req_cpu_rec: 'Quad-core 2.5 GHz or faster',
    req_gpu_min: 'OpenGL 3.3 compatible, 512 MB VRAM',
    req_gpu_rec: 'OpenGL 3.3 compatible, 1 GB VRAM',
    req_disk_val: '500 MB available space',
    req_net_val: 'Broadband internet connection',
    about_title: 'ABOUT THE GAME',
    about_text: 'WO: Definitive Edition is a turn-based artillery game with pets, developed by <strong>F.R.R Entertainment</strong>, an independent studio from Argentina.',
    about_age: 'Recommended age: 13 and up (mild cartoon violence and online chat).',
    link_privacy: 'Privacy Policy',
    link_terms: 'Terms and Conditions',
    link_home: 'Home Page',
    footer_rights: '&copy; 2026 F.R.R Entertainment',
    legal_badge: 'COMPLIANCE AND TRANSPARENCY CENTER',
    legal_title: 'LEGAL DOCUMENTATION',
    legal_updated: 'Last updated: October 22, 2026',
    tab_privacy: 'PRIVACY POLICY',
    tab_terms: 'TERMS AND CONDITIONS'
  };
  var TITLES = {
    'index': { es: 'WO Definitive Edition', en: 'WO Definitive Edition' },
    'privacy': { es: 'Aviso Legal, Privacidad y Términos de Servicio', en: 'Legal Notice, Privacy and Terms of Service' }
  };
  var KEY = 'wo_lang';
  var original = {};

  function readSaved() {
    try {
      var q = new URLSearchParams(window.location.search).get('lang');
      if (q === 'es' || q === 'en') return q;
    } catch (e) {}
    try {
      var s = window.localStorage.getItem(KEY);
      if (s === 'es' || s === 'en') return s;
    } catch (e) {}
    var nav = (navigator.language || 'es').toLowerCase();
    return nav.indexOf('es') === 0 ? 'es' : 'en';
  }

  function save(lang) {
    try { window.localStorage.setItem(KEY, lang); } catch (e) {}
  }

  function apply(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(function (el, i) {
      var k = el.getAttribute('data-i18n');
      if (!(i in original)) original[i] = el.innerHTML;
      el.innerHTML = (lang === 'en' && EN[k] !== undefined) ? EN[k] : original[i];
    });
    document.querySelectorAll('[data-i18n-alt]').forEach(function (el) {
      if (!el.dataset.altEs) el.dataset.altEs = el.getAttribute('alt') || '';
      var k = el.getAttribute('data-i18n-alt');
      el.setAttribute('alt', lang === 'en' && EN[k] ? EN[k] : el.dataset.altEs);
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      if (!el.dataset.ariaEs) el.dataset.ariaEs = el.getAttribute('aria-label') || '';
      var k = el.getAttribute('data-i18n-aria');
      el.setAttribute('aria-label', lang === 'en' && EN[k] ? EN[k] : el.dataset.ariaEs);
    });
    document.querySelectorAll('[data-lang-block]').forEach(function (el) {
      el.hidden = el.getAttribute('data-lang-block') !== lang;
    });
    document.querySelectorAll('[data-lang-toggle] .lang-opt').forEach(function (el) {
      el.classList.toggle('active', el.getAttribute('data-lang') === lang);
    });
    var page = document.body.getAttribute('data-page') || 'index';
    if (TITLES[page]) document.title = TITLES[page][lang];
    window.WO_LANG = lang;
    document.dispatchEvent(new CustomEvent('wo:lang', { detail: lang }));
  }

  document.addEventListener('DOMContentLoaded', function () {
    var lang = readSaved();
    apply(lang);
    document.querySelectorAll('[data-lang-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        var opt = e.target.closest('.lang-opt');
        var next = opt ? opt.getAttribute('data-lang') : (window.WO_LANG === 'es' ? 'en' : 'es');
        save(next);
        apply(next);
      });
    });
  });
})();
