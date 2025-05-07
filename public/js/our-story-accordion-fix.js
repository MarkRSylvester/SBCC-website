// Direct fix for Our Story accordion specifically
document.addEventListener("DOMContentLoaded", function() {
  // Run immediately and after a short delay to catch all cases
  fixOurStoryAccordion();
  setTimeout(fixOurStoryAccordion, 1000);
  
  function fixOurStoryAccordion() {
    console.log("Fixing Our Story accordion specifically");
    
    // Find the Our Story accordion by text content
    const headers = document.querySelectorAll('.accordion-header, [class*="accordion"] h3');
    
    headers.forEach(header => {
      const headerText = header.textContent.trim();
      if (headerText === "Our Story") {
        console.log("Found Our Story header");
        
        // Clear existing click handlers by cloning
        const newHeader = header.cloneNode(true);
        header.parentNode.replaceChild(newHeader, header);
        
        // Find the parent accordion item
        const accordion = newHeader.closest('.accordion-item') || 
                           newHeader.parentElement.closest('[class*="accordion"]');
        
        if (accordion) {
          console.log("Found accordion container");
          
          // Find the content area
          const content = accordion.querySelector('.accordion-content') || 
                          accordion.querySelector('[class*="content"]');
          
          if (content) {
            console.log("Found content area");
            
            // Set specific inline styles for the content
            Object.assign(content.style, {
              transition: 'all 0.3s ease',
              overflow: 'auto'
            });
            
            // Create direct click handler for header
            newHeader.addEventListener('click', function(e) {
              e.preventDefault();
              e.stopPropagation();
              console.log("Our Story header clicked");
              
              // Toggle active state
              accordion.classList.toggle('active');
              
              // Apply appropriate styles based on state
              if (accordion.classList.contains('active')) {
                console.log("Opening accordion");
                Object.assign(content.style, {
                  maxHeight: '400px',
                  height: 'auto',
                  display: 'block',
                  padding: '20px',
                  overflowY: 'auto'
                });
                
                // Force browser to recognize height change
                content.scrollTop = 0;
              } else {
                console.log("Closing accordion");
                Object.assign(content.style, {
                  maxHeight: '0',
                  height: '0',
                  padding: '0 20px',
                  overflow: 'hidden'
                });
              }
            });
            
            console.log("Installed click handler");
          }
        }
      }
    });
  }
}); 