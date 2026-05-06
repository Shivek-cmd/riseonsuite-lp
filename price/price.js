const includeFragments = async () => {
  const includeNodes = Array.from(document.querySelectorAll("[data-include]"));

  await Promise.all(
    includeNodes.map(async (node) => {
      const response = await fetch(node.dataset.include);
      const html = await response.text();
      node.innerHTML = html;

      node.querySelectorAll("script").forEach((oldScript) => {
        const script = document.createElement("script");
        script.textContent = oldScript.textContent;
        document.body.appendChild(script);
        oldScript.remove();
      });
    })
  );
};

const setupReveal = () => {
  const nodes = document.querySelectorAll(".price-card, .guarantee-card, .pricing-proof__grid");

  nodes.forEach((node) => node.classList.add("reveal-on-scroll"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  nodes.forEach((node) => observer.observe(node));
};

const init = async () => {
  await includeFragments();
  setupReveal();
};

init();
