// Welcome splash: animated text shown when the site opens (once per visit).
(function () {
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  try { if (sessionStorage.getItem('welcomed')) return; sessionStorage.setItem('welcomed', '1'); } catch (e) {}

  var css = '\
#welcome{position:fixed;inset:0;z-index:200;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.6rem;padding:1.5rem;text-align:center;background:#111;color:#fff;cursor:pointer;transition:opacity .7s ease}\
#welcome.out{opacity:0;pointer-events:none}\
#welcome .w{opacity:0;transform:translateY(18px);animation:wofRise .9s ease forwards;font-family:"Fraunces",Georgia,serif}\
#welcome .w1{font-size:1.1rem;color:#d9d9d9;animation-delay:.2s}\
#welcome .w2{font-size:clamp(2.4rem,9vw,5rem);font-weight:700;line-height:1.05;animation-delay:.8s}\
#welcome .bar{width:0;height:3px;background:#fcc03c;border-radius:2px;animation:wofBar 1s ease 1.5s forwards}\
#welcome .w3{font-size:clamp(1rem,3.5vw,1.5rem);color:#fcc03c;animation-delay:1.7s}\
#welcome .w4{font-size:clamp(1rem,3.5vw,1.4rem);font-style:italic;color:#fff;animation-delay:2.3s}\
#welcome .w5{margin-top:1rem;font-size:clamp(1.7rem,6.5vw,3rem);font-weight:700;letter-spacing:.05em;color:#fcc03c;animation-delay:3s}\
#welcome .skip{position:absolute;bottom:1.5rem;font:inherit;font-size:.9rem;color:#a9a9a9;background:none;border:0;cursor:pointer}\
@keyframes wofRise{to{opacity:1;transform:none}}\
@keyframes wofBar{to{width:min(180px,40vw)}}';

  var style = document.createElement('style'); style.textContent = css; document.head.appendChild(style);

  var el = document.createElement('div');
  el.id = 'welcome'; el.setAttribute('aria-live', 'polite');
  el.innerHTML = '<div class="w w1">Welcome to</div>' +
    '<div class="w w2">Word of Faith</div><div class="bar"></div>' +
    '<div class="w w3">Dynamic Ministries International</div>' +
    '<div class="w w4">2026 &middot; The Year of Jubilee</div>' +
    '<div class="w w5">JESO KE MORENA!</div>' +
    '<button class="skip" type="button">Tap to continue</button>';
  document.body.appendChild(el);
  document.documentElement.style.overflow = 'hidden';

  var done = false;
  function close() {
    if (done) return; done = true;
    el.classList.add('out');
    document.documentElement.style.overflow = '';
    setTimeout(function () { el.remove(); }, 800);
  }
  el.addEventListener('click', close);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  setTimeout(close, 6200);
})();
