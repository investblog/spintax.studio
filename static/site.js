(function () {
  'use strict';
  var root = document.documentElement;

  // privacy.html is a byte-exact passthrough without the inline theme boot:
  // restore the stored choice here so it follows the reader's theme too.
  try {
    var stored = localStorage.getItem('spintax-theme');
    if ((stored === 'light' || stored === 'dark') && root.dataset.theme !== stored) {
      root.dataset.theme = stored;
    }
  } catch (e) { /* storage may be denied */ }

  // The inline head script already decided the theme before first paint
  // (stored choice -> OS preference -> dark). This file only flips and stores.
  function applyTheme(theme, toggle) {
    root.dataset.theme = theme;
    try { localStorage.setItem('spintax-theme', theme); } catch (e) { /* storage may be denied */ }
    if (toggle) {
      var next = theme === 'dark' ? 'light' : 'dark';
      toggle.setAttribute('aria-label', 'Switch to ' + next + ' theme');
      toggle.title = 'Switch to ' + next + ' theme';
    }
  }

  var navWrap = document.querySelector('.nav-wrap');
  if (navWrap) {
    var toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.id = 'theme-toggle';
    toggle.className = 'icon-button theme-toggle';
    toggle.innerHTML =
      '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">' +
      '<circle cx="12" cy="12" r="4"/>' +
      '<path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>' +
      '</svg>';
    navWrap.appendChild(toggle);
    toggle.addEventListener('click', function () {
      applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', toggle);
    });
    // Label reflects the CURRENT state on load, not only after the first click.
    toggle.setAttribute('aria-label', 'Switch to ' + (root.dataset.theme === 'dark' ? 'light' : 'dark') + ' theme');
  }

  var mobileToggle = document.getElementById('mobile-toggle');
  var nav = document.getElementById('site-nav');
  if (mobileToggle && nav) {
    mobileToggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      mobileToggle.setAttribute('aria-expanded', String(open));
      mobileToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    nav.addEventListener('click', function (e) {
      if (e.target && e.target.closest('a')) {
        nav.classList.remove('is-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.setAttribute('aria-label', 'Open menu');
      }
    });
  }
})();
