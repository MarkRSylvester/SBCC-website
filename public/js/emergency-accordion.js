
// Function to add CSS for accordion styling
function addAccordionCSS() {
  console.log('Adding accordion CSS styling');
  
  // Create link element
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/css/accordion-fix.css';
  link.id = 'accordion-fix-css';
  
  // Add to head if it doesn't exist already
  if (!document.getElementById('accordion-fix-css')) {
    document.head.appendChild(link);
    console.log('Accordion CSS added to head');
  }
}

// Call the function to add CSS
addAccordionCSS();

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
// Debug function to log accordion content
function debugAccordionContent() {
  setTimeout(function() {
    console.log('Debugging accordion content');
    
    // Find Gatherings accordion
    const gatheringsAccordion = document.querySelector('[id="gatherings-accordion"]');
    if (gatheringsAccordion) {
      console.log('Found Gatherings accordion:', gatheringsAccordion);
      
      // Find accordion content
      const content = gatheringsAccordion.querySelector('.accordion-content');
      if (content) {
        console.log('Accordion content HTML:', content.innerHTML.substring(0, 300) + '...');
        
        // Log content height
        console.log('Content height:', content.scrollHeight + 'px');
        
        // Force display
        content.style.maxHeight = '1000px';
        content.style.overflowY = 'auto';
        content.style.display = 'block';
        content.style.visibility = 'visible';
        content.style.opacity = '1';
        
        // Hide the Plan Your Gathering button
        const buttons = content.querySelectorAll('button');
        buttons.forEach(button => {
          console.log('Found button:', button.textContent);
          button.style.display = 'none';
        });
      } else {
        console.log('No accordion content found');
      }
    } else {
      console.log('Could not find Gatherings accordion');
    }
  }, 1000); // Delay to ensure DOM is ready
}

// Call debug function
debugAccordionContent();


// Debug and fix function
function fixAccordionHeights() {
  console.log('Fixing accordion heights and visibility');
  
  // Wait for DOM to be fully loaded
  setTimeout(function() {
    // Fix all accordion items
    document.querySelectorAll('.accordion-item').forEach(function(item) {
      // Get the content div
      const content = item.querySelector('.accordion-content');
      if (content) {
        console.log('Fixing accordion content in:', item.id || 'unnamed accordion');
        
        // Force content to be visible
        content.style.display = 'block';
        content.style.visibility = 'visible';
        content.style.opacity = '1';
        content.style.height = 'auto';
        content.style.minHeight = '300px';
        content.style.maxHeight = '80vh';
        content.style.overflow = 'auto';
        
        // Hide Plan Your Gathering button if found
        const buttons = content.querySelectorAll('button');
        buttons.forEach(button => {
          if (button.textContent.includes('Gathering')) {
            console.log('Hiding button:', button.textContent);
            button.style.display = 'none';
          }
        });
        
        // Check if this is an active accordion
        if (item.classList.contains('active') || item.classList.contains('open')) {
          console.log('This accordion is already open');
        } else {
          console.log('This accordion is closed - no fixes needed yet');
        }
      }
    });
    
    // Extra fix for the Gatherings accordion specifically
    const gatheringsAccordion = document.querySelector('#gatherings-accordion');
    if (gatheringsAccordion) {
      const content = gatheringsAccordion.querySelector('.accordion-content');
      if (content) {
        console.log('Special fix for Gatherings accordion');
        
        // Force it to be expanded
        gatheringsAccordion.classList.add('active', 'open');
        
        // Ensure content is visible with enough space
        content.style.display = 'block';
        content.style.visibility = 'visible';
        content.style.opacity = '1';
        content.style.height = 'auto';
        content.style.minHeight = '500px';
        content.style.maxHeight = '80vh';
        content.style.overflow = 'auto';
        
        // Force display all children
        Array.from(content.children).forEach(child => {
          child.style.display = 'block';
          child.style.visibility = 'visible';
          child.style.opacity = '1';
        });
      }
    }
  }, 1000); // Wait 1 second for everything to load
}

// Run the function
fixAccordionHeights();

// Also run it when an accordion is clicked
document.addEventListener('click', function(e) {
  if (e.target.closest('.accordion-header')) {
    console.log('Accordion clicked - running fixes in 500ms');
    setTimeout(fixAccordionHeights, 500);
  }
});

