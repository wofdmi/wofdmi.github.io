// Dark mode: remembers the choice, otherwise follows the device setting.
(function () {
  var root = document.documentElement;
  function saved() { try { return localStorage.getItem('theme'); } catch (e) { return null; } }
  function save(v) { try { localStorage.setItem('theme', v); } catch (e) {} }
  var start = saved() || (window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  root.setAttribute('data-theme', start); // runs in <head>, so there is no white flash

  document.addEventListener('DOMContentLoaded', function () {
    // Top bar: show the logo (left) only after scrolling past the banner
    var nav = document.querySelector('nav'), hdr = document.querySelector('.site-header');
    if (nav) {
      var update = function () {
        var y = window.pageYOffset || document.documentElement.scrollTop;
        nav.classList.toggle('scrolled', y > 8);
        nav.classList.toggle('at-top', !!hdr && y <= hdr.offsetHeight * 0.5);
      };
      window.addEventListener('scroll', update, { passive: true }); update();
    }
    var menu = document.getElementById('nav-links');
    if (!menu) return; // pages without the menu (like the admin page)
    var li = document.createElement('li');
    var btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'theme-btn';
    function label() { btn.textContent = root.getAttribute('data-theme') === 'dark' ? '\u2600 Switch to light mode' : '\u263E Switch to dark mode'; }
    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next); save(next); label();
    });
    label(); li.appendChild(btn); menu.appendChild(li);
  });
})();