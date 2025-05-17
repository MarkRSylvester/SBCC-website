document.addEventListener('DOMContentLoaded', function() {
  console.log('Accordion fix script loaded');
  
  // Get all accordion headers
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  // Function to check if an accordion item is open
  function isAccordionOpen(accordionItem) {
    return accordionItem.classList.contains('active') || 
           accordionItem.classList.contains('open') || 
           (accordionItem.querySelector('.accordion-content') && 
            window.getComputedStyle(accordionItem.querySelector('.accordion-content')).display !== 'none');
  }
  
  // Add click event to each accordion header
  accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
      console.log('Accordion header clicked');
      
      // Get the parent accordion item
      const accordionItem = this.closest('.accordion-item');
      const modal = accordionItem.closest('.modal');
      
      // After a brief delay to let the default behavior happen
      setTimeout(() => {
        // Close all other accordions
        document.querySelectorAll('.accordion-item').forEach(item => {
          if (item !== accordionItem && isAccordionOpen(item)) {
            console.log('Closing other accordion');
            // Trigger a click on this accordion's header to close it
            const otherHeader = item.querySelector('.accordion-header');
            if (otherHeader) {
              otherHeader.click();
            }
          }
        });
        
        // If this accordion is now open, scroll to it
        if (isAccordionOpen(accordionItem) && modal) {
          console.log('Scrolling to open accordion');
          
          // Wait a bit longer to ensure content is fully rendered
          setTimeout(() => {
            try {
              // Get positions relative to the viewport
              const headerRect = header.getBoundingClientRect();
              const modalRect = modal.getBoundingClientRect();
              
              // Calculate scroll position - scroll to the header
              const scrollPosition = modal.scrollTop + (headerRect.top - modalRect.top) - 20;
              
              console.log('Scrolling modal to position:', scrollPosition);
              
              // Scroll smoothly
              modal.scrollTo({
                top: scrollPosition,
                behavior: 'smooth'
              });
            } catch (e) {
              console.error('Error scrolling to accordion:', e);
            }
          }, 150);
        }
      }, 100);
    });
  });
  
  // Optional enhancement: ensure only one accordion is open on page load
  setTimeout(() => {
    let openCount = 0;
    document.querySelectorAll('.accordion-item').forEach(item => {
      if (isAccordionOpen(item)) {
        openCount++;
        if (openCount > 1) {
          // Close excess open accordions
          const header = item.querySelector('.accordion-header');
          if (header) {
            header.click();
          }
        }
      }
    });
  }, 500);
});
