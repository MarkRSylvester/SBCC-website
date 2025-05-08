// Accordion functionality with only one open at a time
// This script is specific to #explore-modal

document.addEventListener('DOMContentLoaded', function() {
  // Initialize - ensure only one accordion is open initially
  const accordionItems = document.querySelectorAll('#explore-modal .accordion-item');
  let hasOpenAccordion = false;
  
  accordionItems.forEach(item => {
    if (item.classList.contains('active') || item.classList.contains('open')) {
      if (hasOpenAccordion) {
        // If we already have an open accordion, close this one
        item.classList.remove('active', 'open');
        const content = item.querySelector('.accordion-content');
        if (content) {
          content.style.display = 'none';
          content.style.maxHeight = '0';
          content.style.padding = '0';
        }
      } else {
        // This is the first open accordion, keep it open
        hasOpenAccordion = true;
      }
    }
  });
  
  // Add click handlers to all accordion headers
  document.querySelectorAll('#explore-modal .accordion-header').forEach(header => {
    header.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const clickedItem = this.closest('.accordion-item');
      const isOpen = clickedItem.classList.contains('active');
      
      // Close all accordions
      accordionItems.forEach(item => {
        // Remove active/open classes
        item.classList.remove('active', 'open');
        
        // Hide content
        const content = item.querySelector('.accordion-content');
        if (content) {
          content.style.display = 'none';
          content.style.maxHeight = '0';
          content.style.padding = '0';
        }
        
        // Reset icon rotation if present
        const icon = item.querySelector('.accordion-icon');
        if (icon) {
          icon.style.transform = 'rotate(0)';
        }
      });
      
      // If the clicked item wasn't already open, open it
      if (!isOpen) {
        // Add active/open classes
        clickedItem.classList.add('active', 'open');
        
        // Show content
        const content = clickedItem.querySelector('.accordion-content');
        if (content) {
          content.style.display = 'block';
          content.style.maxHeight = '500px';
          content.style.padding = '20px';
        }
        
        // Rotate icon if present
        const icon = clickedItem.querySelector('.accordion-icon');
        if (icon) {
          icon.style.transform = 'rotate(180deg)';
        }
      }
    });
  });
  
  console.log('Accordion functionality initialized with only one open at a time');

  // === DEBUGGING CODE ===
  console.log('Accordion items found:', document.querySelectorAll('#explore-modal .accordion-item').length);
  console.log('Elements with class accordion-item:', document.querySelectorAll('.accordion-item').length);
  const modalContent = document.querySelector('#explore-modal .modal-content');
  if (modalContent) {
    console.log('Direct children of modal content:', modalContent.children.length);
  }
  console.log('Elements with "story", "chef", or "menu" in ID:', document.querySelectorAll('[id*="story"], [id*="chef"], [id*="menu"]').length);

  // MutationObserver to detect if elements are being removed from the modal
  if (modalContent) {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.removedNodes.length) {
          console.log('Elements removed from modal:', mutation.removedNodes);
        }
      });
    });
    observer.observe(modalContent, {
      childList: true,
      subtree: true
    });
  }

  // === ADDITIONAL DIAGNOSTICS ===
  // Print the HTML of the modal content
  if (modalContent) {
    console.log('Modal content HTML:', modalContent.innerHTML);
  }

  // Check for elements with accordion-like classes or IDs
  console.log('Elements with accordion-like classes:', document.querySelectorAll('[class*="accordion"], [id*="accordion"]').length);
  // Check for header/content structure
  console.log('Elements with header/content structure:', document.querySelectorAll('.modal-content > div > div').length);

  // Check for elements containing "The Chefs" and "The Menus"
  console.log('Elements containing "The Chefs":', Array.from(document.querySelectorAll('#explore-modal *')).filter(el => el.textContent.includes('The Chefs')).length);
  console.log('Elements containing "The Menus":', Array.from(document.querySelectorAll('#explore-modal *')).filter(el => el.textContent.includes('The Menus')).length);

  // Fetch and log the content of open-accordions.js
  fetch('js/open-accordions.js')
    .then(response => response.text())
    .then(text => console.log('Content of open-accordions.js:', text));
}); 