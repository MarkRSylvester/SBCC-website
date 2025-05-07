// Universal accordion fix for all accordions
document.addEventListener('DOMContentLoaded', function() {
  console.log("Applying universal accordion fix");
  
  // Find all accordion items/headers
  const accordionItems = document.querySelectorAll('.accordion-item');
  const accordionHeaders = document.querySelectorAll('.accordion-header, [class*="accordion"] > h3');
  
  console.log("Found accordion items:", accordionItems.length);
  console.log("Found accordion headers:", accordionHeaders.length);
  
  // Apply consistent height to all accordion headers
  accordionHeaders.forEach(header => {
    header.style.height = '45px';
    header.style.minHeight = '45px';
    header.style.maxHeight = '45px';
    header.style.cursor = 'pointer';
    header.style.display = 'flex';
    header.style.alignItems = 'center';
    header.style.justifyContent = 'space-between';
    header.style.padding = '0 20px';
    
    // Clear any existing click handlers
    const newHeader = header.cloneNode(true);
    header.parentNode.replaceChild(newHeader, header);
    
    // Add new click handler
    newHeader.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      // Find the accordion container
      const container = this.closest('.accordion-item') || 
                       this.closest('[class*="accordion"]') || 
                       this.parentElement;
      
      if (container) {
        // Toggle active/open class
        container.classList.toggle('active');
        container.classList.toggle('open');
        
        // Find content area
        const content = container.querySelector('.accordion-content') || 
                       container.querySelector('[class*="content"]') || 
                       Array.from(container.children).find(el => 
                         el !== this && !el.classList.contains('accordion-header')
                       );
        
        if (content) {
          // Apply appropriate styles based on state
          if (container.classList.contains('active') || container.classList.contains('open')) {
            content.style.display = 'block';
            content.style.maxHeight = '400px';
            content.style.height = 'auto';
            content.style.opacity = '1';
            content.style.visibility = 'visible';
            content.style.padding = '20px';
            content.style.overflow = 'auto';
            content.style.scrollbarWidth = 'thin';
          } else {
            content.style.maxHeight = '0';
            content.style.height = '0';
            content.style.opacity = '0';
            content.style.visibility = 'hidden';
            content.style.padding = '0 20px';
            content.style.overflow = 'hidden';
          }
        }
        
        // Rotate icon if present
        const icon = this.querySelector('.accordion-icon, [class*="icon"], svg, .plus');
        if (icon) {
          icon.style.transform = container.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0)';
          icon.style.transition = 'transform 0.3s ease';
        }
      }
    });
  });
  
  // Apply custom scrollbar styles
  const style = document.createElement('style');
  style.textContent = `
    .accordion-content::-webkit-scrollbar,
    [class*="accordion"] [class*="content"]::-webkit-scrollbar {
      width: 8px;
    }
    
    .accordion-content::-webkit-scrollbar-track,
    [class*="accordion"] [class*="content"]::-webkit-scrollbar-track {
      background: #f5f5f5;
      border-radius: 4px;
    }
    
    .accordion-content::-webkit-scrollbar-thumb,
    [class*="accordion"] [class*="content"]::-webkit-scrollbar-thumb {
      background-color: #1D3557;
      border-radius: 4px;
      border: 2px solid #f5f5f5;
    }
    
    .accordion-header, 
    [class*="accordion"] > h3 {
      cursor: pointer;
    }
  `;
  document.head.appendChild(style);
  
  console.log("Universal accordion fix applied");
}); 