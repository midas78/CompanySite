const header = document.getElementById("site-header");
const navToggle = document.getElementById("nav-toggle");
const siteNav = document.getElementById("site-nav");

const onScroll = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 8);
};

onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

const closeNav = () => {
  navToggle.setAttribute("aria-expanded", "false");
  siteNav.classList.remove("is-open");
};

navToggle.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!isOpen));
  siteNav.classList.toggle("is-open", !isOpen);
});

siteNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeNav);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeNav();
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 900) closeNav();
});

const revealItems = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

document.getElementById("year").textContent = new Date().getFullYear();
