/**
 * Clean Duplicates Script - Santa Barbara Chef Collective
 * This script handles both cleaning duplicates and accordion functionality
 */

// Clean up duplicate accordions
function cleanDuplicateAccordions() {
  // Find all "Our Story" accordions
  const storyAccordions = document.querySelectorAll('.accordion-item');
  
  // Keep only the first instance
  if (storyAccordions.length > 1) {
    for (let i = 1; i < storyAccordions.length; i++) {
      storyAccordions[i].remove();
    }
  }
  
  // Check for sand-colored background divs that might contain duplicates
  const sandDivs = document.querySelectorAll('div[style*="background-color: #F5F8FF"]');
  sandDivs.forEach(div => {
    if (div.querySelector('.accordion-item')) {
      div.innerHTML = '';
    }
  });
}

// Initialize accordion functionality
document.addEventListener('DOMContentLoaded', () => {
  // Clean up any duplicate accordions
  cleanDuplicateAccordions();
  
  // Add click handlers to accordion headers
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const accordionItem = header.parentElement;
      const isActive = accordionItem.classList.contains('active');
      
      // Close all accordions
      document.querySelectorAll('.accordion-item').forEach(item => {
        item.classList.remove('active');
      });
      
      // Toggle the clicked accordion
      if (!isActive) {
        accordionItem.classList.add('active');
      }
    });
  });
}); 