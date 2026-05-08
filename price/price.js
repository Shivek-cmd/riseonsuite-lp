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
  const nodes = document.querySelectorAll(
    ".pricing-hero__copy, .pricing-hero__panel, .section-heading, .gem-guide, .price-card, .guarantee-card, .pricing-proof__grid div"
  );

  nodes.forEach((node, index) => {
    node.classList.add("reveal-on-scroll");
    node.style.setProperty("--reveal-delay", `${Math.min(index % 8, 7) * 80}ms`);
  });

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

const geolocationApis = [
  "https://ipapi.co/json",
  "https://ipinfo.io?token=c08b35d57c890c",
  "https://api.ipstack.com/check?access_key=cac325ffe7b7df5a04e5f579a32ebdc4",
  "https://get.geojs.io/v1/ip/geo.json",
];

const getCountryCode = (data) => {
  const countryValue = data.country || data.country_code || data.countryCode || data.country_name;
  const countryName = data.country_name || data.countryName || data.country;

  if (!countryValue && !countryName) return null;

  const normalizedCode = String(countryValue || "").trim().toUpperCase();
  const normalizedName = String(countryName || "").trim().toLowerCase();

  if (normalizedCode === "IN" || normalizedName === "india") {
    return "IN";
  }

  return normalizedCode || null;
};

const applyPricingCurrency = (currency) => {
  const priceNodes = document.querySelectorAll("[data-price]");
  const regionNode = document.querySelector("[data-pricing-region]");
  const priceKey = currency === "INR" ? "priceInr" : "priceUsd";

  priceNodes.forEach((node) => {
    node.textContent = node.dataset[priceKey] || node.textContent;
  });

  if (regionNode) {
    regionNode.textContent = currency === "INR"
      ? "Showing INR pricing for India"
      : "Showing USD pricing for your region";
  }
};

const fetchUserLocation = async () => {
  applyPricingCurrency("USD");

  for (const api of geolocationApis) {
    try {
      const response = await fetch(api, { cache: "no-store" });
      if (!response.ok) continue;

      const data = await response.json();
      const countryCode = getCountryCode(data);

      if (countryCode) {
        applyPricingCurrency(countryCode === "IN" ? "INR" : "USD");
        return;
      }
    } catch (error) {
      console.warn("Unable to detect pricing region:", error);
    }
  }

  applyPricingCurrency("USD");
};

const init = async () => {
  await includeFragments();
  fetchUserLocation();
  setupReveal();
};

init();
