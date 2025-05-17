const observer = new MutationObserver(mutations => {
  for (const mutation of mutations) {
    if (
      mutation.type === "attributes" &&
      mutation.attributeName === "class" &&
      mutation.target.classList.contains("accordion-item") &&
      mutation.target.classList.contains("active")
    ) {
      mutation.target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }
});

document.querySelectorAll(".accordion-item").forEach(item => {
  observer.observe(item, { attributes: true });
});
