/**
 * Santa Barbara Chef Collective
 * Consolidated Accordion System
 * 
 * This script handles all accordion functionality throughout the site.
 * It replaces all previous accordion scripts to eliminate conflicts.
 */

document.addEventListener('DOMContentLoaded', function() {
  initAccordions();
});

/**
 * Initialize all accordions
 */
function initAccordions() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  // Close all accordions by default
  closeAllAccordions();
  
  // Add click event listeners to accordion headers
  accordionHeaders.forEach(header => {
    header.addEventListener('click', function(event) {
      event.preventDefault();
      
      const accordionItem = this.closest('.accordion-item');
      const isActive = accordionItem.classList.contains('active');
      
      // Close all accordions
      closeAllAccordions();
      
      // If the clicked accordion wasn't already active, open it
      if (!isActive) {
        openAccordion(accordionItem);
      }
    });
  });
}

/**
 * Open a specific accordion
 */
function openAccordion(accordionItem) {
  // Add active class
  accordionItem.classList.add('active');
  
  // Find content element
  const content = accordionItem.querySelector('.accordion-content');
  if (!content) return;
  
  // Make content visible
  content.style.display = 'block';
  content.style.maxHeight = content.scrollHeight + 'px';
  content.style.padding = '20px';
  content.style.overflow = 'auto';
  
  // Check if content is scrollable and add indicator if needed
  setTimeout(() => {
    if (content.scrollHeight > content.clientHeight) {
      content.classList.add('scrollable');
    } else {
      content.classList.remove('scrollable');
    }
  }, 50);
}

/**
 * Close all accordions
 */
function closeAllAccordions() {
  const accordionItems = document.querySelectorAll('.accordion-item');
  
  accordionItems.forEach(item => {
    // Remove active class
    item.classList.remove('active');
    
    // Hide content
    const content = item.querySelector('.accordion-content');
    if (!content) return;
    
    content.style.display = 'none';
    content.style.maxHeight = null;
    content.style.overflow = 'hidden';
  });
}

// Export functions for potential external use
window.sbccAccordion = {
  init: initAccordions,
  open: openAccordion,
  closeAll: closeAllAccordions
};
