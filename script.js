const cursor = document.querySelector(".cursor");
const ring = document.querySelector(".cursor-ring");
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

// Remove qualquer canvas residual antigo no hero
document.querySelectorAll(".hero canvas").forEach((c) => c.remove());

if (cursor && ring) {
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = `${mouseX - 4}px`;
    cursor.style.top = `${mouseY - 4}px`;
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll("a, button").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      ring.style.transform = "translate(-50%,-50%) scale(1.8)";
    });
    el.addEventListener("mouseleave", () => {
      ring.style.transform = "translate(-50%,-50%) scale(1)";
    });
  });
}

window.addEventListener("scroll", () => {
  document.querySelector("nav").classList.toggle("scrolled", window.scrollY > 40);
  const sections = document.querySelectorAll("section[id]");
  sections.forEach((s) => {
    const top = s.offsetTop - 100;
    const bottom = top + s.offsetHeight;
    const link = document.querySelector(`.nav-links a[href="#${s.id}"]`);
    if (link) link.classList.toggle("active", window.scrollY >= top && window.scrollY < bottom);
  });
});

function animateCount(el, target, suffix) {
  let n = 0;
  const dur = 1800;
  const start = performance.now();
  function step(now) {
    const p = Math.min((now - start) / dur, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    n = Math.round(ease * target);
    el.textContent = n + suffix;
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const metricsObs = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    animateCount(document.getElementById("m1"), 50, "+");
    animateCount(document.getElementById("m2"), 30, "+");
    animateCount(document.getElementById("m3"), 98, "%");
    metricsObs.disconnect();
  }
}, { threshold: 0.5 });
const metricsNode = document.querySelector(".metrics");
if (metricsNode) metricsObs.observe(metricsNode);

const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add("visible");
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el) => revealObs.observe(el));

const progressBar = document.createElement("div");
progressBar.style.cssText = "position:fixed;top:0;left:0;height:1px;background:white;z-index:9999;transition:width 0.1s linear;";
document.body.prepend(progressBar);
window.addEventListener("scroll", () => {
  const p = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  progressBar.style.width = `${p * 100}%`;
});

const form = document.querySelector(".contact-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = form.querySelector(".form-submit");
    if (!btn) return;
    const original = btn.textContent;
    btn.textContent = "ENVIANDO...";
    btn.disabled = true;
    setTimeout(() => {
      form.reset();
      btn.textContent = original;
      btn.disabled = false;
    }, 1500);
  });
}
