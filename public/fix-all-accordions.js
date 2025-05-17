// Emergency fix to restore accordion functionality
document.addEventListener('DOMContentLoaded', function() {
  console.log('Emergency accordion fix initializing...');
  
  // Function to restore normal accordion functionality
  function restoreAccordions() {
    // Get all accordion headers
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    // Add proper click handlers
    accordionHeaders.forEach(function(header) {
      // First, remove any event listeners by creating a clone
      const newHeader = header.cloneNode(true);
      if (header.parentNode) {
        header.parentNode.replaceChild(newHeader, header);
      }
      
      // Add a simple click handler that toggles the accordion
      newHeader.addEventListener('click', function(e) {
        // Get the accordion item
        const accordionItem = this.closest('.accordion-item');
        if (!accordionItem) return;
        
        // Toggle the accordion classes
        const isCurrentlyOpen = accordionItem.classList.contains('active') || 
                              accordionItem.classList.contains('open');
        
        if (isCurrentlyOpen) {
          // Close this accordion
          accordionItem.classList.remove('active', 'open');
          const content = accordionItem.querySelector('.accordion-content');
          if (content) {
            content.style.display = 'none';
            content.style.maxHeight = '0';
            content.style.opacity = '0';
            content.style.visibility = 'hidden';
          }
          console.log('Closed accordion:', accordionItem.id || 'unknown');
        } else {
          // Open this accordion
          accordionItem.classList.add('active', 'open');
          const content = accordionItem.querySelector('.accordion-content');
          if (content) {
            content.style.display = 'block';
            content.style.maxHeight = '80vh';
            content.style.height = 'auto';
            content.style.opacity = '1';
            content.style.visibility = 'visible';
            content.style.overflow = 'auto';
            content.style.padding = '20px';
          }
          console.log('Opened accordion:', accordionItem.id || 'unknown');
          
          // Scroll to this accordion
          setTimeout(function() {
            const modalContent = accordionItem.closest('.modal-content');
            if (modalContent) {
              const scrollTo = accordionItem.offsetTop - 20;
              modalContent.scrollTo({
                top: scrollTo,
                behavior: 'smooth'
              });
            }
          }, 10);
        }
      });
    });
    
    console.log('Accordion functionality restored');
  }
  
  // Initialize right away
  setTimeout(restoreAccordions, 0);
  
  // Also reinitialize when modals are opened
  document.querySelectorAll('[data-modal-target]').forEach(function(trigger) {
    trigger.addEventListener('click', function() {
      setTimeout(restoreAccordions, 300);
    });
  });
});
