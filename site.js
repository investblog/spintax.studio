(() => {
  const root = document.documentElement;
  let themeToggle = document.getElementById('theme-toggle');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileNav = document.getElementById('mobile-nav') || document.querySelector('.site-header nav');

  if (!themeToggle) {
    const navWrap = document.querySelector('.nav-wrap');
    const storeLink = navWrap?.querySelector('.nav-cta');
    if (navWrap) {
      themeToggle = document.createElement('button');
      themeToggle.className = 'icon-button';
      themeToggle.id = 'theme-toggle';
      themeToggle.type = 'button';
      themeToggle.setAttribute('aria-label', 'Switch theme');
      themeToggle.title = 'Switch theme';
      themeToggle.innerHTML = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v2m0 14v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M3 12h2m14 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/><circle cx="12" cy="12" r="4"/></svg>';
      navWrap.insertBefore(themeToggle, storeLink || null);
    }
  }

  function applyTheme(theme) {
    root.dataset.theme = theme;
    try { localStorage.setItem('spintax-theme', theme); } catch (error) {}
    if (themeToggle) {
      const next = theme === 'dark' ? 'light' : 'dark';
      themeToggle.setAttribute('aria-label', `Switch to ${next} theme`);
      themeToggle.setAttribute('title', `Switch to ${next} theme`);
    }
  }

  themeToggle?.addEventListener('click', () => applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));
  mobileToggle?.addEventListener('click', () => {
    const isOpen = mobileNav?.classList.toggle('is-open') ?? false;
    mobileToggle.setAttribute('aria-expanded', String(isOpen));
    mobileToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });
  mobileNav?.addEventListener('click', (event) => {
    if (event.target instanceof HTMLElement && event.target.tagName === 'A') {
      mobileNav.classList.remove('is-open');
      mobileToggle?.setAttribute('aria-expanded', 'false');
      mobileToggle?.setAttribute('aria-label', 'Open menu');
    }
  });
  applyTheme(root.dataset.theme === 'light' ? 'light' : 'dark');
})();
