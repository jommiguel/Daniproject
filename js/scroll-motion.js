(() => {
  "use strict";
  // Adapted from Squadra IQ's Reveal and ScrollProgress components.
  // Native scrolling stays in control so lessons, anchors and keyboard work normally.
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const compact = matchMedia("(max-width: 800px)");
  const header = document.querySelector(".site-header");
  const running = new Map();
  let observer;
  let frame = 0;
  const seen = new WeakSet();
  const targets = [
    ...document.querySelectorAll(
      ".page-hero > div:first-child > *, .hero-image, .dashboard-progress > *, .section-heading, .destination, .page-content > section > .eyebrow, .page-content > section > h2, .page-content > section > p, .lesson-panel, .interactive-workbench, .track-item, .motion-demo > div:first-child, .search-bar, .site-footer",
    ),
  ];
  const images = [...document.querySelectorAll(".hero-image > img")].map(
    (image) => {
      const wrapper = document.createElement("div");
      wrapper.className = "motion-image-frame";
      image.before(wrapper);
      wrapper.append(image);
      return { image, wrapper };
    },
  );
  const sectionLinks = [
    ...document.querySelectorAll(
      '.chapter-nav a[href^="#"], .page-index a[href^="#"]',
    ),
  ]
    .map((link) => ({
      link,
      section: document.getElementById(link.hash.slice(1)),
    }))
    .filter((item) => item.section);

  function finishAnimations() {
    for (const animation of running.values()) animation.cancel();
    running.clear();
    for (const { image } of images) image.style.removeProperty("transform");
  }
  function reveal(element, delay) {
    if (seen.has(element)) return;
    seen.add(element);
    observer?.unobserve(element);
    if (
      reduced.matches ||
      document.hidden ||
      element.contains(document.activeElement)
    )
      return;
    const animation = element.animate(
      [
        {
          opacity: 0,
          transform: `translateY(${compact.matches ? 16 : 36}px)`,
          filter: `blur(${compact.matches ? 2 : 5}px)`,
        },
        { opacity: 1, transform: "translateY(0)", filter: "blur(0)" },
      ],
      {
        duration: compact.matches ? 480 : 800,
        delay,
        easing: "cubic-bezier(.2,.7,.2,1)",
        fill: "backwards",
      },
    );
    running.set(element, animation);
    animation.onfinish = () => {
      animation.cancel();
      running.delete(element);
    };
  }
  function observe() {
    observer?.disconnect();
    if (
      reduced.matches ||
      !("IntersectionObserver" in window) ||
      !Element.prototype.animate
    )
      return;
    observer = new IntersectionObserver(
      (entries) => {
        let index = 0;
        for (const entry of entries) {
          if (entry.isIntersecting)
            reveal(entry.target, Math.min(index++ * 80, 240));
        }
      },
      { threshold: 0, rootMargin: "0px 0px -6% 0px" },
    );
    targets.forEach((target) => {
      if (!seen.has(target)) observer.observe(target);
    });
  }
  function update() {
    frame = 0;
    const available = document.documentElement.scrollHeight - innerHeight;
    const progress =
      available > 0 ? Math.min(1, Math.max(0, scrollY / available)) : 1;
    header?.style.setProperty("--reading-progress", String(progress));
    if (!reduced.matches && !compact.matches) {
      for (const { image, wrapper } of images) {
        const rect = wrapper.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > innerHeight) continue;
        const offset = Math.max(
          -12,
          Math.min(12, (innerHeight / 2 - rect.top - rect.height / 2) * 0.04),
        );
        image.style.transform = `translateY(${offset.toFixed(2)}px) scale(1.06)`;
      }
    }
    let active = null;
    for (const item of sectionLinks) {
      if (item.section.getBoundingClientRect().top <= innerHeight * 0.38)
        active = item;
    }
    sectionLinks.forEach((item) => {
      if (item === active) item.link.setAttribute("aria-current", "location");
      else item.link.removeAttribute("aria-current");
    });
  }
  function schedule() {
    if (!frame) frame = requestAnimationFrame(update);
  }
  addEventListener("scroll", schedule, { passive: true });
  addEventListener("resize", schedule, { passive: true });
  addEventListener("pageshow", schedule);
  document.addEventListener("focusin", (event) => {
    for (const [element, animation] of running) {
      if (element.contains(event.target)) {
        animation.cancel();
        running.delete(element);
      }
    }
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) finishAnimations();
    else schedule();
  });
  reduced.addEventListener("change", () => {
    finishAnimations();
    observe();
    schedule();
  });
  compact.addEventListener("change", () => {
    finishAnimations();
    schedule();
  });
  observe();
  update();
})();
