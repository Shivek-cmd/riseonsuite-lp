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

const formatNumber = (value) => new Intl.NumberFormat("en-IN").format(value);

const setupCounters = () => {
  const counters = Array.from(document.querySelectorAll("[data-count-to]"));

  if (!counters.length) return;

  const animateCounter = (node) => {
    const target = Number(node.dataset.countTo);
    const duration = 1200;
    const startedAt = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      node.textContent = `${formatNumber(Math.round(target * eased))}+`;

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.55 }
  );

  counters.forEach((counter) => observer.observe(counter));
};

const setupReveal = () => {
  const nodes = document.querySelectorAll(
    ".nfp-hero__copy, .nfp-proof__grid div, .community-strip span, .flow-card, .solution-media, .solution-list article, .nfp-cta__inner"
  );

  nodes.forEach((node) => node.classList.add("reveal-on-scroll"));

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

const setupNfpHeroCarousel = () => {
  const slides = Array.from(document.querySelectorAll(".nfp-hero-carousel__slide"));
  const dots = Array.from(document.querySelectorAll("[data-nfp-hero-dot]"));

  if (!slides.length || !dots.length) return;

  let activeIndex = 0;
  let timerId;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const setActive = (index) => {
    activeIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === activeIndex);
    });

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === activeIndex);
    });
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

const init = async () => {
  await includeFragments();
  setupCounters();
  setupReveal();
  setupNfpHeroCarousel();
};

init();
