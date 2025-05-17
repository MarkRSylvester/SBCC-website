// Universal fix to ensure all accordions scroll to top when opened
document.addEventListener('DOMContentLoaded', function() {
  // Function to set up scroll behavior for all accordions
  function setupAccordionScrolling() {
    // Get all accordion headers
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    // Add click handlers to each header
    accordionHeaders.forEach(function(header) {
      // Remove any existing click handlers by cloning and replacing
      const newHeader = header.cloneNode(true);
      header.parentNode.replaceChild(newHeader, header);
      
      // Add our new click handler
      newHeader.addEventListener('click', function(e) {
        // Get the accordion item
        const accordionItem = this.closest('.accordion-item');
        if (!accordionItem) return;
        
        // Log which accordion was clicked
        console.log('Clicked accordion:', accordionItem.id || 'unknown');
        
        // Wait a moment for the accordion to open/close
        setTimeout(function() {
          // Check if this accordion is now open
          const isOpen = accordionItem.classList.contains('active') || 
                         accordionItem.classList.contains('open');
          
          console.log('Accordion is open:', isOpen);
          
          // If it's open, scroll to it
          if (isOpen) {
            // Find the modal content
            const modalContent = accordionItem.closest('.modal-content');
            if (!modalContent) {
              console.error('Modal content not found');
              return;
            }
            
            // Calculate the position to scroll to
            const scrollTo = accordionItem.offsetTop - 20;
            
            // Force scroll to the top of this accordion
            console.log('Scrolling to accordion at position:', scrollTo);
            modalContent.scrollTo({
              top: scrollTo,
              behavior: 'smooth'
            });
          }
        }, 10);
      });
    });
    
    console.log('Universal accordion scroll handling set up');
  }
  
  // Set up handlers when the page loads
  setTimeout(setupAccordionScrolling, 500);
  
  // Also set up when a modal opens
  document.querySelectorAll('[data-modal-target]').forEach(function(trigger) {
    trigger.addEventListener('click', function() {
      setTimeout(setupAccordionScrolling, 600);
    });
  });
});
