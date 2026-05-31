/**
 * Abstero — animations.ts
 * Central animation module. Uses Motion for scroll-linked animations,
 * IntersectionObserver for reveals, and vanilla JS for everything else.
 *
 * Imported once in BaseLayout via <script> tag.
 */

import { scroll, animate } from 'motion';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ─── Reveal on scroll ───────────────────────────────────────────────
const revealEls = document.querySelectorAll('[data-reveal], [data-reveal-stagger]');
if ('IntersectionObserver' in window && !reduceMotion) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('is-in'));
}

// ─── Magnetic buttons ───────────────────────────────────────────────
if (!reduceMotion && window.matchMedia('(hover: hover)').matches) {
  document.querySelectorAll('.magnetic').forEach((btn) => {
    const el = btn as HTMLElement;
    const strength = 0.25;
    el.addEventListener('mousemove', (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * strength;
      const y = (e.clientY - r.top - r.height / 2) * strength;
      el.style.transform = `translate(${x}px, ${y}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });
}

// ─── Flow card cursor-tracked glow ──────────────────────────────────
if (!reduceMotion && window.matchMedia('(hover: hover)').matches) {
  document.querySelectorAll('article.flow-card, a.flow-card').forEach((card) => {
    const el = card as HTMLElement;
    el.addEventListener('mousemove', (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const mx = ((e.clientX - r.left) / r.width) * 100;
      const my = ((e.clientY - r.top) / r.height) * 100;
      el.style.setProperty('--mx', mx + '%');
      el.style.setProperty('--my', my + '%');
    });
  });
}

// ─── Parallax on hero mock ──────────────────────────────────────────
if (!reduceMotion) {
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  if (parallaxEls.length) {
    let mx = 0,
      my = 0,
      tx = 0,
      ty = 0;
    document.addEventListener('mousemove', (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mx = (e.clientX - cx) / cx;
      my = (e.clientY - cy) / cy;
    });
    const tick = () => {
      tx += (mx - tx) * 0.06;
      ty += (my - ty) * 0.06;
      parallaxEls.forEach((el) => {
        const htmlEl = el as HTMLElement;
        const f = parseFloat(htmlEl.dataset.parallax || '0.04');
        htmlEl.style.transform = `translate3d(${tx * f * 40}px, ${ty * f * 40}px, 0)`;
      });
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
}

// ─── BG glows drift on scroll ───────────────────────────────────────
if (!reduceMotion) {
  const g1 = document.querySelector('.bg-glow--1') as HTMLElement | null;
  const g2 = document.querySelector('.bg-glow--2') as HTMLElement | null;
  if (g1 || g2) {
    window.addEventListener(
      'scroll',
      () => {
        const y = window.scrollY;
        if (g1) g1.style.transform = `translate3d(0, ${y * 0.12}px, 0)`;
        if (g2) g2.style.transform = `translate3d(0, ${y * -0.08}px, 0)`;
      },
      { passive: true },
    );
  }
}

// ─── Sticky cards scroll animation (Motion) ─────────────────────────
if (!reduceMotion) {
  const cards = document.querySelectorAll('.process__card');
  cards.forEach((card, index) => {
    const isLast = index === cards.length - 1;

    if (isLast) {
      scroll(
        animate(card, {
          scale: [1, 0.92],
          opacity: [1, 0.25],
          filter: ['blur(0px) brightness(1)', 'blur(4px) brightness(0.6)'],
        }),
        {
          target: card,
          offset: ['start 30%', 'end 0%'],
        },
      );
    } else {
      const targetEl = cards[index + 1];
      scroll(
        animate(card, {
          scale: [1, 0.92],
          opacity: [1, 0.25],
          filter: ['blur(0px) brightness(1)', 'blur(4px) brightness(0.6)'],
        }),
        {
          target: targetEl,
          offset: ['start 85%', 'start 20%'],
        },
      );
    }
  });
}

// ─── Smooth anchor scroll with offset ───────────────────────────────
const INTENT_PARAM = 'intent';
const intentInput = document.getElementById('contact-intent') as HTMLInputElement | null;

const parseHashLink = (href: string) => {
  const raw = href.startsWith('#') ? href.slice(1) : href;
  const [id, query] = raw.split('?');
  return {
    selector: id ? `#${id}` : null,
    intent: query ? new URLSearchParams(query).get(INTENT_PARAM) : null,
  };
};

const readIntentFromUrl = () => {
  const fromSearch = new URLSearchParams(location.search).get(INTENT_PARAM);
  if (fromSearch) return fromSearch;
  const hash = location.hash.slice(1);
  if (!hash) return null;
  const query = hash.includes('?') ? hash.split('?')[1] : '';
  return query ? new URLSearchParams(query).get(INTENT_PARAM) : null;
};

const setContactIntent = (intent: string | null) => {
  if (!intentInput) return;
  intentInput.value = intent || '';
};

setContactIntent(readIntentFromUrl());
window.addEventListener('hashchange', () => {
  setContactIntent(readIntentFromUrl());
});

document.querySelectorAll('a[href^="#"]').forEach((a) => {
  const href = a.getAttribute('href');
  if (!href || href === '#') return;
  a.addEventListener('click', (e) => {
    const { selector, intent } = parseHashLink(href);
    if (!selector) return;
    const target = document.querySelector(selector);
    if (!target) return;
    e.preventDefault();
    if (intent) {
      setContactIntent(intent);
      history.replaceState(
        null,
        '',
        `${selector}?${INTENT_PARAM}=${encodeURIComponent(intent)}`,
      );
    }
    const top = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
  });
});
