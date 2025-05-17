document.addEventListener('DOMContentLoaded', function() {
  // Simple function to force open an accordion
  function setupForceOpen() {
    // Get all accordion headers
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    // Add click handlers
    accordionHeaders.forEach(header => {
      header.addEventListener('click', function() {
        // Get the parent accordion item
        const accordionItem = this.closest('.accordion-item');
        if (!accordionItem) return;
        
        // Get the content element
        const content = accordionItem.querySelector('.accordion-content');
        if (!content) return;
        
        // Toggle the state
        if (accordionItem.classList.contains('active') || 
            accordionItem.classList.contains('open')) {
          // Close this accordion
          accordionItem.classList.remove('active', 'open');
          content.style.display = 'none';
          console.log('Closing accordion:', accordionItem.id);
        } else {
          // Open this accordion
          accordionItem.classList.add('active', 'open');
          content.style.display = 'block';
          content.style.height = 'auto';
          content.style.maxHeight = '80vh';
          content.style.visibility = 'visible';
          content.style.opacity = '1';
          content.style.overflow = 'auto';
          content.style.padding = '20px';
          console.log('Opening accordion:', accordionItem.id);
          
          // Scroll to it
          setTimeout(() => {
            const modalContent = accordionItem.closest('.modal-content');
            if (modalContent) {
              modalContent.scrollTop = accordionItem.offsetTop - 20;
            }
          }, 50);
        }
      });
    });
    
    console.log('Force accordion open/close handlers set up');
  }
  
  // Add a delay to ensure it runs after other scripts
  setTimeout(setupForceOpen, 500);
  
  // Also set it up when modals open
  document.querySelectorAll('[data-modal-target]').forEach(button => {
    button.addEventListener('click', function() {
      setTimeout(setupForceOpen, 600);
    });
  });
});
