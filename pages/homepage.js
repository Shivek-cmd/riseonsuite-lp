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

const setupFaq = () => {
  document.querySelectorAll(".faq-item button").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      const isOpen = item.classList.toggle("is-open");
      button.setAttribute("aria-expanded", String(isOpen));
    });
  });
};

const setupWorkflow = () => {
  const cards = Array.from(document.querySelectorAll("[data-workflow-step]"));
  const panels = Array.from(document.querySelectorAll("[data-workflow-panel]"));

  if (!cards.length || !panels.length) return;

  const setActive = (index) => {
    cards.forEach((card, cardIndex) => {
      card.classList.toggle("is-active", cardIndex === index);
    });

    panels.forEach((panel, panelIndex) => {
      panel.classList.toggle("is-active", panelIndex === index);
    });
  };

  cards.forEach((card, index) => {
    card.addEventListener("mouseenter", () => setActive(index));
    card.addEventListener("focusin", () => setActive(index));
  });

  const observer = new IntersectionObserver(
    (entries) => {
      const visibleEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visibleEntry) return;

      setActive(Number(visibleEntry.target.dataset.workflowStep));
    },
    {
      rootMargin: "-35% 0px -45% 0px",
      threshold: [0.2, 0.45, 0.7],
    }
  );

  cards.forEach((card) => observer.observe(card));
};

const init = async () => {
  await includeFragments();
  setupFaq();
  setupWorkflow();
};

init();
