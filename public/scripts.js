console.log('✅ SBCC scripts.js loaded');

// Basic accordion logic for explore-modal
document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('#explore-modal .accordion-item');
  items.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (header) {
      header.addEventListener('click', () => {
        items.forEach(i => i.classList.remove('open'));
        item.classList.toggle('open');
      });
    }
  });
});

// Remove rogue "+" icons from accordion headers
document.querySelectorAll('.accordion-header').forEach(header => {
  const plus = header.querySelector(':scope > .accordion-icon + .accordion-icon');
  if (plus && plus.textContent.trim() === '+') {
    plus.remove();
  }
});
