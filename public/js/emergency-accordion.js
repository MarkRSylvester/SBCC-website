// Simple emergency accordion fix
document.addEventListener('DOMContentLoaded', function() {
  console.log('Emergency accordion fix running');
  
  // Add click handlers to all accordion headers
  document.querySelectorAll('.accordion-header').forEach(function(header) {
    header.addEventListener('click', function(e) {
      // Stop any other event handlers
      e.preventDefault();
      e.stopPropagation();
      
      console.log('Accordion clicked:', this.textContent.trim());
      
      // Get the accordion item
      const item = this.closest('.accordion-item');
      
      // Toggle active class
      const wasActive = item.classList.contains('active');
      
      // First close all accordions
      document.querySelectorAll('.accordion-item').forEach(function(accordionItem) {
        accordionItem.classList.remove('active', 'open');
        
        // Hide content
        const content = accordionItem.querySelector('.accordion-content');
        if (content) {
          content.style.display = 'none';
          content.style.maxHeight = '0px';
        }
      });
      
      // If this wasn't active before, open it
      if (!wasActive) {
        item.classList.add('active', 'open');
        
        // Show content
        const content = item.querySelector('.accordion-content');
        if (content) {
          content.style.display = 'block';
          content.style.maxHeight = '2000px'; // Large enough for any content
          
          console.log('Displaying content:', content.innerHTML.substring(0, 100) + '...');
        }
      }
    }, true); // Use capture phase to run before other handlers
  });
  
  console.log('Emergency accordion fix complete');
});