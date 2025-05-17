document.addEventListener("DOMContentLoaded", function () {
  const modal = document.querySelector("#explore-modal");
  const headers = modal.querySelectorAll(".accordion-header");
  const items = modal.querySelectorAll(".accordion-item");

  headers.forEach(header => {
    header.addEventListener("click", () => {
      const item = header.closest(".accordion-item");
      const isOpen = item.classList.contains("open");

      // Close all
      items.forEach(i => i.classList.remove("open"));

      if (!isOpen) {
        item.classList.add("open");

        // Scroll the header into view — always works
        header.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });
});
