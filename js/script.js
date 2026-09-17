document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".nav-menu");

  if (menuButton && menu) {
    menuButton.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("open");
      document.body.classList.toggle("menu-open", isOpen);
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("open");
        document.body.classList.remove("menu-open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation");
      });
    });
  }

  const year = document.getElementById("current-year");
  if (year) year.textContent = new Date().getFullYear();

  const quoteForm = document.getElementById("safari-enquiry-form");
  if (quoteForm) {
    const params = new URLSearchParams(window.location.search);
    const requestedTour = params.get("tour");
    const tourSelect = quoteForm.querySelector('[name="tour"]');
    if (requestedTour && tourSelect) {
      const option = [...tourSelect.options].find((item) => item.value === requestedTour);
      if (option) tourSelect.value = requestedTour;
    }

    const dateInput = quoteForm.querySelector('[name="travel_date"]');
    if (dateInput) dateInput.min = new Date().toISOString().split("T")[0];

    quoteForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!quoteForm.reportValidity()) return;
      const data = new FormData(quoteForm);
      const message = [
        "Hello Geo Safaris Tanzania, I would like to plan a safari.", "",
        `Name: ${data.get("name")}`, `Email: ${data.get("email")}`,
        `Country: ${data.get("country")}`, `Travel date: ${data.get("travel_date")}`,
        `Travellers: ${data.get("travellers")}`, `Safari interest: ${data.get("tour")}`,
        `Accommodation: ${data.get("accommodation")}`,
        `Message: ${data.get("message") || "No additional message"}`
      ].join("\n");
      window.open(`https://wa.me/255743828620?text=${encodeURIComponent(message)}`, "_blank", "noopener");
    });
  }

  const gallery = document.querySelector(".gallery-grid");
  const lightbox = document.getElementById("gallery-lightbox");
  const lightboxImage = lightbox?.querySelector("img");
  const closeButton = lightbox?.querySelector(".lightbox-close");
  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.setAttribute("hidden", "");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("menu-open");
  };

  if (gallery && lightbox && lightboxImage) {
    gallery.addEventListener("click", (event) => {
      const item = event.target.closest(".gallery-item");
      if (!item) return;
      const image = item.querySelector("img");
      if (!image) return;
      lightboxImage.src = image.currentSrc || image.src;
      lightboxImage.alt = image.alt;
      lightbox.removeAttribute("hidden");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("menu-open");
      closeButton?.focus();
    });
    closeButton?.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (event) => { if (event.target === lightbox) closeLightbox(); });
    document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeLightbox(); });
  }
});
