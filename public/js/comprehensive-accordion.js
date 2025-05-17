/**
 * Comprehensive Accordion Fix
 * - Scrolls to top of clicked accordion
 * - Closes other open accordions
 * - Handles scrolling behavior properly
 * - Allows closing all accordions
 */

document.addEventListener('DOMContentLoaded', function() {
  // Find all accordion items
  const accordionItems = document.querySelectorAll('.accordion-item');
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  // Function to close all accordions
  function closeAllAccordions() {
    accordionItems.forEach(item => {
      item.classList.remove('active', 'open');
      const content = item.querySelector('.accordion-content');
      if (content) {
        content.style.display = 'none';
        content.style.height = '0';
        content.style.maxHeight = '0';
        content.style.opacity = '0';
        content.style.visibility = 'hidden';
      }
      const icon = item.querySelector('.accordion-icon');
      if (icon) {
        icon.style.transform = 'rotate(0deg)';
      }
    });
  }
  
  // Function to open a specific accordion
  function openAccordion(accordionItem) {
    // Add active and open classes
    accordionItem.classList.add('active', 'open');
    
    // Get the content section
    const content = accordionItem.querySelector('.accordion-content');
    if (content) {
      content.style.display = 'block';
      content.style.height = 'auto';
      content.style.maxHeight = '80vh'; // Allow scrolling
      content.style.opacity = '1';
      content.style.visibility = 'visible';
      content.style.overflow = 'auto';
      content.style.padding = '20px';
    }
    
    // Rotate the icon if present
    const icon = accordionItem.querySelector('.accordion-icon');
    if (icon) {
      icon.style.transform = 'rotate(180deg)';
    }
    
    // Scroll to the top of this accordion after opening
    setTimeout(() => {
      const modalContent = accordionItem.closest('.modal-content');
      const headerHeight = accordionItem.querySelector('.accordion-header').offsetHeight;
      const offsetTop = accordionItem.offsetTop;
      
      if (modalContent) {
        modalContent.scrollTo({
          top: offsetTop - headerHeight,
          behavior: 'smooth'
        });
      }
    }, 50);
  }
  
  // Add click event listeners to all accordion headers
  accordionHeaders.forEach(header => {
    header.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const accordionItem = this.closest('.accordion-item');
      
      // Check if the clicked accordion is already open
      const isOpen = accordionItem.classList.contains('active') || 
                     accordionItem.classList.contains('open');
      
      // Close all accordions first
      closeAllAccordions();
      
      // If the clicked accordion wasn't open, open it. Otherwise, it stays closed
      if (!isOpen) {
        openAccordion(accordionItem);
      }
    });
  });
  
  // Make sure the initial state is correct
  document.querySelectorAll('.accordion-item.active, .accordion-item.open').forEach(item => {
    const content = item.querySelector('.accordion-content');
    if (content) {
      content.style.display = 'block';
      content.style.height = 'auto';
      content.style.maxHeight = '80vh';
      content.style.opacity = '1';
      content.style.visibility = 'visible';
      content.style.overflow = 'auto';
      content.style.padding = '20px';
    }
  });
});
