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
    const safeIndex = Math.max(0, Math.min(index, cards.length - 1));

    cards.forEach((card, cardIndex) => {
      card.classList.toggle("is-active", cardIndex === safeIndex);
    });

    panels.forEach((panel, panelIndex) => {
      panel.classList.toggle("is-active", panelIndex === safeIndex);
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
      rootMargin: "-30% 0px -45% 0px",
      threshold: [0.25, 0.5, 0.75],
    }
  );

  cards.forEach((card) => observer.observe(card));
};

const setupHeroCarousel = () => {
  const slides = Array.from(document.querySelectorAll(".hero-carousel__slide"));
  const dots = Array.from(document.querySelectorAll("[data-hero-dot]"));
  const kicker = document.querySelector("[data-hero-kicker]");
  const title = document.querySelector("[data-hero-title]");
  const description = document.querySelector("[data-hero-description]");
  const trust = document.querySelector("[data-hero-trust]");

  if (!slides.length || !dots.length || !kicker || !title || !description || !trust) return;

  const content = [
    {
      kicker: "RiseON Suite",
      title: 'Land your next job <span>3x faster</span> with AI on your side.',
      description:
        "RiseON Suite turns your resume, applications, and interviews into a system that actually gets you hired. Built for candidates tired of getting ghosted.",
      trust: ["100% money-back guarantee", "No credit card required", "450,000+ AI career interactions"],
    },
    {
      kicker: "Smarter applications",
      title: 'Apply with a profile that gets <span>shortlisted</span> faster.',
      description:
        "Build ATS-ready resumes, tailored cover letters, and recruiter-friendly profiles for every role without starting from a blank page.",
      trust: ["ATS-ready resume builder", "Role-specific cover letters", "Recruiter-ready profile links"],
    },
    {
      kicker: "Interview confidence",
      title: 'Practice every answer before the <span>real interview</span>.',
      description:
        "Use AI mock interviews to sharpen your answers, improve structure, and walk into interviews with a clear plan instead of guesswork.",
      trust: ["AI mock interviews", "Instant answer feedback", "Role-specific preparation"],
    },
    {
      kicker: "Job-search command center",
      title: 'Track every opportunity until the <span>offer</span> lands.',
      description:
        "Stay organized across applications, follow-ups, interviews, and next steps so momentum never disappears inside a messy spreadsheet.",
      trust: ["Application dashboard", "Follow-up tracking", "Clear next step every day"],
    },
  ];

  let activeIndex = 0;
  let timerId;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const setActive = (index) => {
    activeIndex = (index + slides.length) % slides.length;
    const activeContent = content[activeIndex];

    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === activeIndex);
    });

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === activeIndex);
    });

    kicker.textContent = activeContent.kicker;
    title.innerHTML = activeContent.title;
    description.textContent = activeContent.description;
    trust.innerHTML = activeContent.trust.map((item) => `<span>${item}</span>`).join("");
  };

  const start = () => {
    if (reduceMotion) return;
    timerId = window.setInterval(() => setActive(activeIndex + 1), 6500);
  };

  const restart = () => {
    window.clearInterval(timerId);
    start();
  };

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      setActive(index);
      restart();
    });
  });

  setActive(0);
  start();
};

const setupReveal = () => {
  const nodes = document.querySelectorAll(
    ".hero__copy, .proof__grid div, .logo-marquee__inner, .section-heading, .workflow-card, .workflow-visual, .suite-step, .benefits article, .testimonial-card, .testimonial-score, .cta-band__inner, .faq-item"
  );

  nodes.forEach((node, index) => {
    node.classList.add("reveal-on-scroll");
    node.style.setProperty("--reveal-delay", `${Math.min(index % 8, 7) * 70}ms`);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.16 }
  );

  nodes.forEach((node) => observer.observe(node));
};

const init = async () => {
  await includeFragments();
  setupFaq();
  setupWorkflow();
  setupHeroCarousel();
  setupReveal();
};

init();
