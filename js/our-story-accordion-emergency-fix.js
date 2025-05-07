// Emergency direct fix for Our Story accordion
(function() {
  // Run immediately
  applyDirectFix();
  
  // And again after a delay to catch dynamically loaded content
  setTimeout(applyDirectFix, 1000);
  
  function applyDirectFix() {
    console.log("EMERGENCY DIRECT FIX FOR OUR STORY");
    
    // Find accordion by text content
    document.querySelectorAll('h3, .accordion-header, [class*="accordion"]').forEach(element => {
      if (element.textContent.trim() === "Our Story") {
        console.log("FOUND OUR STORY ELEMENT:", element);
        
        // Get closest container - search for multiple possible parent selectors
        const container = element.closest('.accordion-item') || 
                         element.closest('[class*="accordion"]') ||
                         element.parentElement.parentElement;
        
        if (container) {
          console.log("FOUND CONTAINER:", container);
          
          // Find the content area - try multiple possible selectors
          let content = container.querySelector('.accordion-content') || 
                       container.querySelector('[class*="content"]');
                       
          // If not found, look for the next sibling element after the header
          if (!content) {
            let header = element.closest('.accordion-header') || element;
            content = header.nextElementSibling;
            console.log("FOUND CONTENT THROUGH SIBLING:", content);
          }
          
          if (content) {
            // Override any existing click handlers
            const clickTargets = [element, element.parentElement];
            
            clickTargets.forEach(target => {
              // Remove existing event listeners by cloning and replacing
              if (target && target.parentNode) {
                const clone = target.cloneNode(true);
                target.parentNode.replaceChild(clone, target);
                
                // Now add our click handler
                clone.addEventListener('click', function(e) {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log("DIRECT CLICK HANDLER EXECUTED");
                  
                  // Toggle manually instead of using classList
                  if (container.getAttribute('data-expanded') === 'true') {
                    container.setAttribute('data-expanded', 'false');
                    
                    // Force the content closed
                    content.style.display = 'none';
                    content.style.height = '0';
                    content.style.maxHeight = '0';
                    content.style.overflow = 'hidden';
                    content.style.padding = '0';
                    
                    console.log("CLOSING ACCORDION");
                  } else {
                    container.setAttribute('data-expanded', 'true');
                    
                    // Force the content open
                    content.style.display = 'block';
                    content.style.height = 'auto';
                    content.style.maxHeight = '500px';
                    content.style.overflow = 'auto';
                    content.style.padding = '20px';
                    
                    console.log("OPENING ACCORDION");
                  }
                  
                  return false;
                });
                
                console.log("DIRECT CLICK HANDLER INSTALLED ON:", clone);
              }
            });
            
            // Initialize closed state
            container.setAttribute('data-expanded', 'false');
            content.style.display = 'none';
            content.style.height = '0';
            content.style.maxHeight = '0';
            content.style.overflow = 'hidden';
            content.style.padding = '0';
          }
        }
      }
    });
  }
})(); 