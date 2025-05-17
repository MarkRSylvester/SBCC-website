// Diagnostic script to check accordion behavior
(function() {
  console.log('Running accordion diagnostic...');
  
  // Check for existing accordion scripts
  const scripts = document.querySelectorAll('script');
  console.log(`Found ${scripts.length} scripts on the page`);
  
  scripts.forEach((script, index) => {
    if (script.src && script.src.includes('accordion')) {
      console.log(`Script ${index}: ${script.src}`);
    } else if (script.textContent && script.textContent.includes('accordion')) {
      console.log(`Inline script ${index} contains accordion code`);
    }
  });
  
  // Check active accordion classes
  const accordionItems = document.querySelectorAll('.accordion-item');
  console.log(`Found ${accordionItems.length} accordion items`);
  
  accordionItems.forEach((item, index) => {
    console.log(`Accordion ${index} (${item.id || 'unnamed'}):`);
    console.log(`  - Has class 'active': ${item.classList.contains('active')}`);
    console.log(`  - Has class 'open': ${item.classList.contains('open')}`);
    
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');
    
    if (header) {
      console.log(`  - Has header: yes`);
      console.log(`  - Header has click handler: ${header.onclick !== null}`);
    } else {
      console.log(`  - Has header: no`);
    }
    
    if (content) {
      console.log(`  - Content display: ${window.getComputedStyle(content).display}`);
      console.log(`  - Content max-height: ${window.getComputedStyle(content).maxHeight}`);
      console.log(`  - Content overflow: ${window.getComputedStyle(content).overflow}`);
    } else {
      console.log(`  - Has content: no`);
    }
  });
  
  // Look for click handlers on accordion headers
  console.log('Checking for click handlers...');
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  console.log(`Found ${accordionHeaders.length} accordion headers`);
  console.log('Try manually clicking accordions to see if they work');
})();
