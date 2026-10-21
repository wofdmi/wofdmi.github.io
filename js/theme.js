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
    // Docking logo: big in the banner, shrinks into the top-left corner while scrolling
    var logo = document.getElementById('brand-logo'), slot = logo && logo.parentElement;
    if (nav && logo && slot) {
      var SMALL = 46, g = {};
      var apply = function () {
        var y = window.pageYOffset || document.documentElement.scrollTop;
        var p = Math.min(1, Math.max(0, y / g.R)), e = p * p * (3 - 2 * p);
        var top0 = g.t - y;
        logo.style.left = (g.l + (20 - g.l) * e) + 'px';
        logo.style.top = (top0 + (g.tt - top0) * e) + 'px';
        logo.style.width = logo.style.height = (g.s + (SMALL - g.s) * e) + 'px';
      };
      var measure = function () {
        logo.classList.remove('docked'); logo.removeAttribute('style');
        var r = slot.getBoundingClientRect(), y = window.pageYOffset || document.documentElement.scrollTop;
        g = { l: r.left, t: r.top + y, s: Math.min(r.width, r.height) };
        g.R = Math.max(120, Math.min(260, g.s * 1.1));
        g.tt = (nav.offsetHeight - SMALL) / 2;
        logo.classList.add('docked'); apply();
      };
      document.body.classList.add('has-dock');
      measure();
      window.addEventListener('scroll', apply, { passive: true });
      window.addEventListener('resize', measure);
      window.addEventListener('load', measure);
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