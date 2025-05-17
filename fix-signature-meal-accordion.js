// Script to specifically fix the Signature Meal Program accordion
document.addEventListener('DOMContentLoaded', function() {
  // Function to find the Signature Meal Program accordion by its text content
  function findSignatureMealAccordion() {
    // Try to find by exact accordion title
    const allAccordionHeaders = document.querySelectorAll('.accordion-header h3');
    for (const header of allAccordionHeaders) {
      if (header.textContent.includes('Signature Meal') || 
          header.textContent.includes('Signature')) {
        return header.closest('.accordion-item');
      }
    }
    
    // If not found by title, try to find by content
    const allAccordionContents = document.querySelectorAll('.accordion-content');
    for (const content of allAccordionContents) {
      if (content.textContent.includes('Signature Meal') || 
          content.textContent.includes('Signature')) {
        return content.closest('.accordion-item');
      }
    }
    
    // If still not found, look for any terms related to meal programs
    for (const content of allAccordionContents) {
      if (content.textContent.includes('meal') || 
          content.textContent.includes('program') || 
          content.textContent.includes('weekly')) {
        return content.closest('.accordion-item');
      }
    }
    
    return null;
  }
  
  // Function to set up the scroll handler
  function setupSignatureAccordionHandler() {
    // Find the accordion
    const signatureAccordion = findSignatureMealAccordion();
    if (!signatureAccordion) {
      console.error('Signature Meal Program accordion not found');
      // List all accordion headers for debugging
      const headers = Array.from(document.querySelectorAll('.accordion-header h3'))
        .map(h => h.textContent.trim());
      console.log('Available accordion headers:', headers);
      return;
    }
    
    console.log('Found Signature Meal Program accordion:', signatureAccordion.id);
    
    // Get the accordion header
    const header = signatureAccordion.querySelector('.accordion-header');
    if (!header) {
      console.error('Signature accordion header not found');
      return;
    }
    
    // Add a special click handler
    header.addEventListener('click', function() {
      // Check if this accordion is now open
      setTimeout(function() {
        if (signatureAccordion.classList.contains('active') || 
            signatureAccordion.classList.contains('open')) {
          // Find the modal content
          const modalContent = signatureAccordion.closest('.modal-content');
          if (!modalContent) {
            console.error('Modal content not found');
            return;
          }
          
          // Calculate the position to scroll to
          const scrollTo = signatureAccordion.offsetTop - 20;
          
          // Force scroll to the top of this accordion
          console.log('Scrolling to Signature accordion at position:', scrollTo);
          modalContent.scrollTo({
            top: scrollTo,
            behavior: 'smooth'
          });
        }
      }, 100); // Short delay to ensure the accordion has opened
    });
    
    console.log('Added special handler for Signature Meal Program accordion');
  }
  
  // Set up handler when the page loads
  setTimeout(setupSignatureAccordionHandler, 500);
  
  // Also set up when a modal opens
  document.querySelectorAll('[data-modal-target]').forEach(function(trigger) {
    trigger.addEventListener('click', function() {
      setTimeout(setupSignatureAccordionHandler, 600);
    });
  });
});
