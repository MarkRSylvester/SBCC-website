console.log('✅ SBCC scripts.js loaded');

// Basic accordion logic for explore-modal
document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('#explore-modal .accordion-item');
  const modal = document.querySelector('#explore-modal .modal-content');
  
  items.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (header) {
      header.addEventListener('click', () => {
        // Close other accordions
        items.forEach(i => i.classList.remove('open'));
        item.classList.toggle('open');
        
        // Smooth scroll the clicked accordion near the top
        if (item.classList.contains('open')) {
          const modalTop = modal.getBoundingClientRect().top;
          const itemTop = item.getBoundingClientRect().top;
          const scrollOffset = 40; // Space from top of modal
          
          modal.scrollTo({
            top: modal.scrollTop + (itemTop - modalTop) - scrollOffset,
            behavior: 'smooth'
          });
        }
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

/**
 * Smoothly scrolls the page to the top
 * @param {number} duration - Duration of the scroll animation in milliseconds (default: 500)
 */
function scrollToTop(duration = 500) {
  const start = window.pageYOffset;
  const startTime = performance.now();

  function scroll(currentTime) {
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    
    // Easing function for smooth animation
    const easeInOutCubic = progress => progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    window.scrollTo(0, start * (1 - easeInOutCubic(progress)));

    if (timeElapsed < duration) {
      requestAnimationFrame(scroll);
    }
  }

  requestAnimationFrame(scroll);
}

// Make the function globally available
window.scrollToTop = scrollToTop;

// Back to Top Button functionality
document.addEventListener('DOMContentLoaded', () => {
  const backToTopButton = document.getElementById('backToTop');
  
  // Show/hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  });

  // Scroll to top when clicked
  backToTopButton.addEventListener('click', () => {
    scrollToTop();
  });
});
