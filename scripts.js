// Light interaction helpers for the portal vibe
(function () {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  const portal = document.querySelector(".portal-graphic");
  if (portal) {
    portal.addEventListener("pointermove", (event) => {
      const rect = portal.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      portal.style.setProperty("--tilt-x", `${(0.5 - y) * 4}deg`);
      portal.style.setProperty("--tilt-y", `${(x - 0.5) * 4}deg`);
      portal.style.transform = `rotateX(${(0.5 - y) * 8}deg) rotateY(${(x - 0.5) * 8}deg)`;
    });
    portal.addEventListener("pointerleave", () => {
      portal.style.transform = "";
    });
  }

  // Fade-in effect on scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
})();

