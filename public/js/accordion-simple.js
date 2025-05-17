document.addEventListener('DOMContentLoaded', function() {
  // Simple function to handle accordion clicks
  function handleAccordionClick(e) {
    // Get the accordion item
    const item = this.closest('.accordion-item');
    if (!item) return;
    
    // Get the modal
    const modal = item.closest('.modal');
    
    // Toggle active class
    const wasActive = item.classList.contains('active');
    
    // Close all accordions first
    document.querySelectorAll('.accordion-item').forEach(accordion => {
      accordion.classList.remove('active', 'open');
      const content = accordion.querySelector('.accordion-content');
      if (content) {
        content.style.display = 'none';
      }
    });
    
    // If it wasn't active before, open it
    if (!wasActive) {
      item.classList.add('active', 'open');
      const content = item.querySelector('.accordion-content');
      if (content) {
        content.style.display = 'block';
      }
      
      // Scroll to the header
      if (modal) {
        setTimeout(() => {
          modal.scrollTop = item.offsetTop - 20;
        }, 50);
      }
    }
  }
  
  // Add click handler to all accordion headers
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', handleAccordionClick);
  });
});
