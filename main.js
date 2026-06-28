(function () {
  "use strict";

  /* ── Helpers ─────────────────────────────────────────────── */
  const $ = (sel, scope) => (scope || document).querySelector(sel);
  const $$ = (sel, scope) => Array.from((scope || document).querySelectorAll(sel));
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fineHover = matchMedia("(hover: hover) and (pointer: fine)").matches;
  function safe(fn, name) { try { fn(); } catch (e) { console.warn("[" + name + "]", e); } }

  /* ── Init sequence ───────────────────────────────────────── */
  function boot() {
    safe(initNav,          "nav");
    safe(initMobileMenu,   "mobileMenu");
    safe(initCursor,       "cursor");
    safe(initMouseGradient,"gradient");
    safe(initReveals,      "reveals");
    safe(initCounters,     "counters");
    safe(initTypewriter,   "typewriter");
    safe(initProjectRows,  "projects");
    safe(initSmoothAnchors,"anchors");
    safe(initBackToTop,    "btt");
    safe(initContactForm,  "form");
    safe(initActiveNav,    "activeNav");
    safe(revealSafety,     "safetyNet");
    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  /* ── NAV scroll effect ───────────────────────────────────── */
  function initNav() {
    const nav = $("#navbar");
    if (!nav) return;
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ── Mobile menu ─────────────────────────────────────────── */
  function initMobileMenu() {
    const btn   = $("#hamburger");
    const menu  = $("#mobile-menu");
    const close = $("#mobile-close");
    if (!btn || !menu) return;

    function open() {
      btn.classList.add("open");
      menu.classList.add("open");
      document.body.style.overflow = "hidden";
      btn.setAttribute("aria-expanded", "true");
    }
    function shut() {
      btn.classList.remove("open");
      menu.classList.remove("open");
      document.body.style.overflow = "";
      btn.setAttribute("aria-expanded", "false");
    }

    btn.addEventListener("click", () => menu.classList.contains("open") ? shut() : open());
    if (close) close.addEventListener("click", shut);
    $$("a", menu).forEach(a => a.addEventListener("click", shut));
    document.addEventListener("keydown", e => { if (e.key === "Escape") shut(); });
  }

  /* ── Custom cursor — hidden until first mousemove (A.3) ─── */
  function initCursor() {
    if (!fineHover) return;
    const cursor = $(".cursor");
    const dot    = $(".cursor-dot");
    const ring   = $(".cursor-ring");
    if (!cursor || !dot || !ring) return;

    let rx = 0, ry = 0, dx = 0, dy = 0;
    let firstMove = false;
    let rafId;

    function lerp(a, b, t) { return a + (b - a) * t; }

    function animate() {
      rx = lerp(rx, dx, 0.12);
      ry = lerp(ry, dy, 0.12);
      ring.style.transform = "translate3d(" + rx + "px," + ry + "px,0)";
      rafId = requestAnimationFrame(animate);
    }

    window.addEventListener("mousemove", e => {
      dx = e.clientX; dy = e.clientY;
      dot.style.transform = "translate3d(" + dx + "px," + dy + "px,0) translate(-50%,-50%)";
      if (!firstMove) {
        firstMove = true;
        rx = dx; ry = dy;
        cursor.classList.add("is-ready");
        cancelAnimationFrame(rafId);
        animate();
      }
    });

    $$("a, button, [data-hover]").forEach(el => {
      el.addEventListener("mouseover", () => cursor.classList.add("is-hover"));
      el.addEventListener("mouseout",  () => cursor.classList.remove("is-hover"));
    });
  }

  /* ── Hero mouse-reactive gradient — Archetype 05 signature ─ */
  function initMouseGradient() {
    const hero = $("#hero");
    if (!hero || !fineHover) return;

    hero.addEventListener("mousemove", e => {
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1) + "%";
      const y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1) + "%";
      hero.style.setProperty("--mx", x);
      hero.style.setProperty("--my", y);
    });

    hero.addEventListener("mouseleave", () => {
      hero.style.removeProperty("--mx");
      hero.style.removeProperty("--my");
    });
  }

  /* ── Reveal on scroll — IntersectionObserver ─────────────── */
  function initReveals() {
    const els = $$(".reveal");
    if (!els.length) return;

    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const delay = parseFloat(e.target.dataset.delay || "0") * 1000;
          setTimeout(() => e.target.classList.add("is-visible"), delay);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.04, rootMargin: "0px 0px -3% 0px" });

    els.forEach(el => io.observe(el));
  }

  /* Safety net at 6s — reveal anything still hidden (A.8) */
  function revealSafety() {
    setTimeout(() => {
      $$(".reveal:not(.is-visible)").forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight * 1.2) {
          el.classList.add("is-visible");
        }
      });
    }, 6000);
  }

  /* ── Animated count-up ──────────────────────────────────── */
  function initCounters() {
    const nums = $$("[data-count]");
    if (!nums.length) return;

    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        countUp(e.target);
        io.unobserve(e.target);
      });
    }, { threshold: 0.04, rootMargin: "0px 0px -10% 0px" });

    nums.forEach(el => io.observe(el));

    function countUp(el) {
      const target   = parseFloat(el.dataset.count);
      const suffix   = el.dataset.suffix || "";
      const duration = reduced ? 0 : 1600;
      const start    = performance.now();
      const isFloat  = String(target).includes(".");

      if (duration === 0) { el.textContent = target + suffix; return; }

      function step(now) {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const cur = target * eased;
        el.textContent = (isFloat ? cur.toFixed(1) : Math.floor(cur)) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
  }

  /* ── Typewriter ─────────────────────────────────────────── */
  function initTypewriter() {
    const el = $("#tw-text");
    if (!el) return;

    const texts = [
      "Desarrollador Full Stack",
      "Mtro. en Ingeniería de Software",
      "Lic. en Tecnologías de la Información",
      "5× Ganador Exposoftware",
      "Experto en Linux y SQL"
    ];
    let tIdx = 0, cIdx = 0, deleting = false;
    const SPEED_TYPE = 65, SPEED_DEL = 35, PAUSE = 2200;

    function tick() {
      const cur = texts[tIdx];
      if (!deleting) {
        el.textContent = cur.substring(0, ++cIdx);
        if (cIdx === cur.length) { deleting = true; return setTimeout(tick, PAUSE); }
        return setTimeout(tick, SPEED_TYPE);
      }
      el.textContent = cur.substring(0, --cIdx);
      if (cIdx === 0) { deleting = false; tIdx = (tIdx + 1) % texts.length; }
      setTimeout(tick, SPEED_DEL);
    }

    setTimeout(tick, 1000);
  }

  /* ── Project rows accordion ─────────────────────────────── */
  function initProjectRows() {
    $$(".project-row").forEach(row => {
      const header = $(".project-row-header", row);
      const body   = $(".project-row-body",   row);
      if (!header || !body) return;

      header.addEventListener("click", () => {
        const isOpen = row.classList.toggle("is-open");
        header.setAttribute("aria-expanded", isOpen);
        body.removeAttribute("hidden");
        body.style.maxHeight = isOpen ? body.scrollHeight + "px" : "0";

        /* Collapse others */
        $$(".project-row").forEach(other => {
          if (other === row) return;
          const otherHeader = $(".project-row-header", other);
          const otherBody   = $(".project-row-body",   other);
          other.classList.remove("is-open");
          if (otherHeader) otherHeader.setAttribute("aria-expanded", "false");
          if (otherBody)   otherBody.style.maxHeight = "0";
        });
      });
    });
  }

  /* ── Smooth anchor scroll ───────────────────────────────── */
  function initSmoothAnchors() {
    const nav = $("#navbar");
    document.addEventListener("click", e => {
      const a = e.target.closest("a[href^='#']");
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = (nav ? nav.offsetHeight : 72) + 16;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - offset,
        behavior: reduced ? "auto" : "smooth"
      });
    });
  }

  /* ── Active nav link ────────────────────────────────────── */
  function initActiveNav() {
    const navLinks = $$(".nav-links a");
    const sections = $$("section[id]");
    if (!navLinks.length || !sections.length) return;

    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const id = e.target.id;
          navLinks.forEach(link => {
            link.classList.toggle("active", link.getAttribute("href") === "#" + id);
          });
        }
      });
    }, { threshold: 0.04, rootMargin: "-35% 0px -55% 0px" });

    sections.forEach(s => io.observe(s));
  }

  /* ── Back to top ────────────────────────────────────────── */
  function initBackToTop() {
    const btn = $("#back-to-top");
    if (!btn) return;
    window.addEventListener("scroll", () => {
      btn.classList.toggle("visible", window.scrollY > 500);
    }, { passive: true });
    btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" }));
  }

  /* ── Contact form — EmailJS ─────────────────────────────── */
  function initContactForm() {
    const form    = $("#contact-form");
    const btn     = $("#form-btn");
    const success = $("#form-success");
    const error   = $("#form-error");
    if (!form) return;

    /* EmailJS keys — update with your real values:
       emailjs.init("YOUR_PUBLIC_KEY");
       Change YOUR_SERVICE_ID and YOUR_TEMPLATE_ID below. */
    if (window.emailjs && typeof emailjs.init === "function") {
      try { emailjs.init("YOUR_PUBLIC_KEY"); } catch (_) {}
    }

    form.addEventListener("submit", e => {
      e.preventDefault();
      if (!form.reportValidity()) return;

      const btnText    = btn.querySelector(".btn-text");
      const btnSending = btn.querySelector(".btn-sending");
      btn.disabled = true;
      if (btnText)    btnText.style.display    = "none";
      if (btnSending) btnSending.style.display = "";
      if (success) success.style.display = "none";
      if (error)   error.style.display   = "none";

      if (window.emailjs && typeof emailjs.sendForm === "function") {
        emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", form)
          .then(() => {
            if (success) success.style.display = "";
            form.reset();
          })
          .catch(() => {
            if (error) error.style.display = "";
          })
          .finally(() => {
            btn.disabled = false;
            if (btnText)    btnText.style.display    = "";
            if (btnSending) btnSending.style.display = "none";
          });
      } else {
        /* EmailJS not configured — show fallback */
        if (error) error.style.display = "";
        btn.disabled = false;
        if (btnText)    btnText.style.display    = "";
        if (btnSending) btnSending.style.display = "none";
      }
    });
  }

})();
