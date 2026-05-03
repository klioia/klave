window.addEventListener("scroll", () => {
  const nav = document.querySelector(".navbar");
  if (!nav) return;
  if (window.scrollY > 50) {
    nav.style.background = "rgba(0,0,0,0.85)";
    nav.style.backdropFilter = "blur(12px)";
  } else {
    nav.style.background = "transparent";
    nav.style.backdropFilter = "none";
  }
});

const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        obs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1 }
);
document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));

function animateCounter(el, target, suffix) {
  let count = 0;
  const step = Math.ceil(target / 60);
  const timer = setInterval(() => {
    count += step;
    if (count >= target) {
      count = target;
      clearInterval(timer);
    }
    el.textContent = String(count) + suffix;
  }, 16);
}

const metricObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCounter(document.getElementById("m1"), 50, "+");
      animateCounter(document.getElementById("m2"), 30, "+");
      animateCounter(document.getElementById("m3"), 98, "%");
      metricObserver.disconnect();
    }
  });
});
const metricSection = document.querySelector(".metrics-section");
if (metricSection) metricObserver.observe(metricSection);

const form = document.querySelector(".contact-form");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = form.querySelector(".submit-btn");
    if (!button) return;
    const original = button.textContent;
    button.classList.add("loading");
    button.textContent = "ENVIANDO...";
    setTimeout(() => {
      form.reset();
      button.classList.remove("loading");
      button.textContent = original;
    }, 1400);
  });
}
