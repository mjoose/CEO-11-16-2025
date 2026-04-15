(function () {
  'use strict';

  function onReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  onReady(function () {
    var header = document.querySelector('.site-header');
    if (header) {
      var setScrolled = function () {
        header.classList.toggle('site-header--scrolled', window.scrollY > 48);
      };
      setScrolled();
      window.addEventListener('scroll', setScrolled, { passive: true });
    }

    var toggle = document.querySelector('.nav-toggle');
    var drawer = document.querySelector('.nav-drawer');
    var mqMobileNav = window.matchMedia('(max-width: 900px)');

    function syncNavDrawerOffset() {
      var header = document.querySelector('.site-header');
      if (!header || !mqMobileNav.matches) {
        document.documentElement.style.removeProperty('--nav-drawer-offset');
        return;
      }
      document.documentElement.style.setProperty('--nav-drawer-offset', header.getBoundingClientRect().height + 'px');
    }

    syncNavDrawerOffset();
    window.addEventListener('resize', syncNavDrawerOffset, { passive: true });
    if (mqMobileNav.addEventListener) {
      mqMobileNav.addEventListener('change', syncNavDrawerOffset);
    } else if (mqMobileNav.addListener) {
      mqMobileNav.addListener(syncNavDrawerOffset);
    }
    window.addEventListener('orientationchange', syncNavDrawerOffset);

    if (toggle && drawer) {
      toggle.addEventListener('click', function () {
        syncNavDrawerOffset();
        var open = drawer.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        document.body.classList.toggle('nav-open', open);
      });
      drawer.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          drawer.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
          document.body.classList.remove('nav-open');
        });
      });
    }

    var revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length && 'IntersectionObserver' in window) {
      var revObs = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
            }
          });
        },
        { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
      );
      revealEls.forEach(function (el) {
        revObs.observe(el);
      });
    } else {
      revealEls.forEach(function (el) {
        el.classList.add('is-visible');
      });
    }

    document.querySelectorAll('.acc-item__trigger').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var item = btn.closest('.acc-item');
        if (!item) return;
        var wasOpen = item.classList.contains('is-open');
        document.querySelectorAll('.acc-item.is-open').forEach(function (i) {
          i.classList.remove('is-open');
        });
        if (!wasOpen) item.classList.add('is-open');
      });
    });

    function animateCounter(el) {
      var target = parseInt(el.getAttribute('data-target'), 10);
      if (isNaN(target)) return;
      var duration = 2200;
      var start = performance.now();
      function frame(now) {
        var t = Math.min(1, (now - start) / duration);
        var eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(target * eased);
        if (t < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }

    var counters = document.querySelectorAll('[data-counter][data-target]');
    if (counters.length && 'IntersectionObserver' in window) {
      var countObs = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            var el = entry.target;
            countObs.unobserve(el);
            animateCounter(el);
          });
        },
        { threshold: 0.35 }
      );
      counters.forEach(function (el) {
        countObs.observe(el);
      });
    }

    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var id = anchor.getAttribute('href');
        if (id.length < 2) return;
        var target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  });
})();
