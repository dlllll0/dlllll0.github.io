(function () {
  const root = document.documentElement;
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  let selected = null;
  try { selected = localStorage.getItem('portfolio-theme'); } catch (_) {}
  if (selected !== 'dark' && selected !== 'light') selected = null;
  function apply(theme) {
    root.dataset.theme = theme;
    const button = document.querySelector('#theme-toggle');
    if (button) {
      button.textContent = theme === 'dark' ? '☀ 라이트' : '☾ 블랙';
      button.setAttribute('aria-label', theme === 'dark' ? '라이트 테마로 전환' : '블랙 테마로 전환');
      button.setAttribute('aria-pressed', String(theme === 'dark'));
    }
  }
  apply(selected || (media.matches ? 'dark' : 'light'));
  document.addEventListener('DOMContentLoaded', () => {
    apply(root.dataset.theme);
    document.querySelector('#theme-toggle').addEventListener('click', () => {
      selected = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('portfolio-theme', selected); } catch (_) {}
      apply(selected);
    });
  });
  media.addEventListener('change', event => { if (!selected) apply(event.matches ? 'dark' : 'light'); });
})();
