// Add scrolling functionality to open accordions
document.addEventListener("DOMContentLoaded", function() {
  console.log("Applying accordion scrolling fix...");
  
  function addScrollingToAccordions() {
    // Find all accordion content areas
    const accordionContents = document.querySelectorAll('.accordion-content');
    console.log("Found accordion content areas:", accordionContents.length);
    
    accordionContents.forEach(content => {
      // Apply scrolling styles
      Object.assign(content.style, {
        maxHeight: content.closest('.accordion-item')?.classList.contains('active') ? '400px' : '0',
        overflowY: 'auto',
        overflowX: 'hidden',
        transition: 'max-height 0.3s ease, padding 0.3s ease'
      });
      
      // Add custom scrollbar styling
      const style = document.createElement('style');
      style.textContent = `
        .accordion-content::-webkit-scrollbar {
          width: 8px;
        }
        
        .accordion-content::-webkit-scrollbar-track {
          background: #f5f5f5;
          border-radius: 4px;
        }
        
        .accordion-content::-webkit-scrollbar-thumb {
          background-color: #1D3557;
          border-radius: 4px;
          border: 2px solid #f5f5f5;
        }
        
        .accordion-content::-webkit-scrollbar-thumb:hover {
          background-color: #4779B5;
        }
        
        .accordion-content {
          scrollbar-width: thin;
          scrollbar-color: #1D3557 #f5f5f5;
        }
      `;
      document.head.appendChild(style);
      
      // Ensure open accordions have proper scroll height
      const accordionItem = content.closest('.accordion-item');
      if (accordionItem && accordionItem.classList.contains('active')) {
        content.style.maxHeight = '400px';
        content.style.overflowY = 'auto';
      }
    });
    
    // Update accordion click handlers to manage scrolling
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
      header.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const item = this.closest('.accordion-item');
        if (!item) return;
        
        item.classList.toggle('active');
        
        const content = item.querySelector('.accordion-content');
        if (content) {
          if (item.classList.contains('active')) {
            content.style.maxHeight = '400px';
            content.style.padding = '20px';
            content.style.overflowY = 'auto';
          } else {
            content.style.maxHeight = '0';
            content.style.padding = '0 20px';
            content.style.overflowY = 'hidden';
          }
        }
        
        // Toggle icon rotation if present
        const icon = this.querySelector('.accordion-icon');
        if (icon) {
          icon.style.transform = item.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0)';
        }
      };
    });
  }
  
  // Run immediately
  addScrollingToAccordions();
  
  // Also run after a delay to ensure it catches dynamic content
  setTimeout(addScrollingToAccordions, 1000);
}); 