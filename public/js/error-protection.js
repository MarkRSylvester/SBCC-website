/**
 * Protect against JavaScript errors breaking functionality
 */
window.addEventListener('error', function(e) {
  console.error('JS Error caught:', e.message);
  // Prevent the error from breaking other functionality
  e.preventDefault();
  
  // Try to recover basic accordion functionality
  setTimeout(function() {
    document.querySelectorAll('.accordion-header').forEach(function(header) {
      if (!header.hasEventListener) {
        header.hasEventListener = true;
        header.addEventListener('click', function() {
          const item = this.closest('.accordion-item');
          const wasActive = item.classList.contains('active');
          
          // Close all accordions
          document.querySelectorAll('.accordion-item').forEach(function(accItem) {
            accItem.classList.remove('active');
            const content = accItem.querySelector('.accordion-content');
            if (content) {
              content.style.display = 'none';
            }
          });
          
          // If it wasn't active before, open this one
          if (!wasActive) {
            item.classList.add('active');
            const content = item.querySelector('.accordion-content');
            if (content) {
              content.style.display = 'block';
            }
          }
        });
      }
    });
  }, 500);
});
