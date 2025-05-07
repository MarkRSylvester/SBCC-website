// Fix for all accordions to open and close properly
document.addEventListener("DOMContentLoaded", function() {
  console.log("Applying accordion fix...");
  
  function fixAllAccordions() {
    // Find all accordion items
    const accordionItems = document.querySelectorAll('.accordion-item');
    console.log("Found accordion items:", accordionItems.length);
    
    accordionItems.forEach(item => {
      // Find the header
      const header = item.querySelector('.accordion-header');
      if (header) {
        // Remove existing event listeners
        const newHeader = header.cloneNode(true);
        header.parentNode.replaceChild(newHeader, header);
        
        // Add clean click handler
        newHeader.onclick = function(e) {
          e.preventDefault();
          e.stopPropagation();
          console.log("Accordion clicked:", newHeader.textContent.trim());
          
          // Toggle active class
          item.classList.toggle('active');
          
          // Find and toggle content area
          const content = item.querySelector('.accordion-content');
          if (content) {
            if (item.classList.contains('active')) {
              console.log("Opening accordion");
              content.style.display = 'block';
              content.style.maxHeight = '500px';
              content.style.height = 'auto';
              content.style.padding = '20px';
              content.style.overflow = 'auto';
            } else {
              console.log("Closing accordion");
              content.style.maxHeight = '0';
              content.style.height = '0';
              content.style.padding = '0 20px';
              content.style.overflow = 'hidden';
            }
          }
          
          // Rotate the accordion icon if present
          const icon = newHeader.querySelector('.accordion-icon');
          if (icon) {
            icon.style.transform = item.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0)';
          }
        };
      }
      
      // Ensure content area has the right initial state
      const content = item.querySelector('.accordion-content');
      if (content) {
        if (!item.classList.contains('active')) {
          content.style.maxHeight = '0';
          content.style.height = '0';
          content.style.padding = '0 20px';
          content.style.overflow = 'hidden';
        } else {
          content.style.display = 'block';
          content.style.maxHeight = '500px';
          content.style.height = 'auto';
          content.style.padding = '20px';
          content.style.overflow = 'auto';
        }
      }
    });
  }
  
  // Run immediately
  fixAllAccordions();
  
  // Also run after a short delay to catch dynamically loaded content
  setTimeout(fixAllAccordions, 1000);
}); 