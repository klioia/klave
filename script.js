const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

const form = document.querySelector(".contact-form");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = form.querySelector("button");
    const originalLabel = button.textContent;

    button.textContent = "Mensagem enviada";
    button.disabled = true;

    setTimeout(() => {
      form.reset();
      button.textContent = originalLabel;
      button.disabled = false;
    }, 2000);
  });
}
