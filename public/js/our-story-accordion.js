// Initialize the Our Story accordion
document.addEventListener('DOMContentLoaded', function() {
  const accordionItems = document.querySelectorAll('.accordion-item');
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  // Initially close all accordions
  accordionItems.forEach(item => {
    item.classList.remove('active');
    const content = item.querySelector('.accordion-content');
    content.style.maxHeight = '0';
    content.style.padding = '0';
  });
  
  // Add click event to all headers
  accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const parentItem = this.parentElement;
      const content = parentItem.querySelector('.accordion-content');
      
      // If this accordion is already active, close it
      if (parentItem.classList.contains('active')) {
        parentItem.classList.remove('active');
        content.style.maxHeight = '0';
        content.style.padding = '0';
      } else {
        // Close all accordions
        accordionItems.forEach(item => {
          item.classList.remove('active');
          const itemContent = item.querySelector('.accordion-content');
          itemContent.style.maxHeight = '0';
          itemContent.style.padding = '0';
        });
        
        // Open this accordion
        parentItem.classList.add('active');
        content.style.padding = '20px';
        content.style.maxHeight = '2000px'; // Large enough to fit all content
      }
    });
  });
  
  // Fix for any duplicate accordions - remove them
  const storyAccordions = document.querySelectorAll('#our-story-accordion');
  if (storyAccordions.length > 1) {
    // Keep only the first one, remove others
    for (let i = 1; i < storyAccordions.length; i++) {
      storyAccordions[i].parentNode.removeChild(storyAccordions[i]);
    }
  }
}); 