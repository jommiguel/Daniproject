(() => {
  const hero = document.querySelector(".home-hero");
  if (!hero) return;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const pointer = matchMedia("(hover: hover) and (pointer: fine)");
  const reset = () => {
    hero.style.removeProperty("--hero-x");
    hero.style.removeProperty("--hero-y");
  };
  hero.addEventListener(
    "pointermove",
    (event) => {
      if (reduced.matches || !pointer.matches) return;
      const bounds = hero.getBoundingClientRect();
      hero.style.setProperty(
        "--hero-x",
        `${((event.clientX - bounds.left) / bounds.width - 0.5) * 10}px`,
      );
      hero.style.setProperty(
        "--hero-y",
        `${((event.clientY - bounds.top) / bounds.height - 0.5) * 6}px`,
      );
    },
    { passive: true },
  );
  hero.addEventListener("pointerleave", reset);
  reduced.addEventListener("change", reset);
})();
