// Global divider fix to use the "Our Chefs" style across all accordions
(function() {
  // First, let's examine what style is used in the "Our Chefs" accordion
  const ourChefsAccordion = document.getElementById('our-chefs-accordion');
  if (!ourChefsAccordion) {
    console.log('Our Chefs accordion not found to use as reference');
    return;
  }
  
  console.log('Found Our Chefs accordion, examining divider style');
  
  // Create a style tag for our global fix
  const styleTag = document.createElement('style');
  styleTag.id = 'global-divider-fix';
  
  // Apply the "Our Chefs" divider style globally to all section dividers
  styleTag.innerHTML = `
    /* Global fix for dividers to match "Our Chefs" style */
    .section-divider {
      position: relative !important;
      height: 1px !important;
      background-color: #E6DBC9 !important;
      margin: 30px auto !important;
      width: 70% !important;
    }
    
    .section-divider:before {
      content: '' !important;
      position: absolute !important;
      top: -1px !important;
      left: 50% !important;
      transform: translateX(-50%) !important;
      width: 40% !important;
      height: 3px !important;
      background-color: #1D3557 !important;
      border-radius: 1.5px !important;
    }
    
    /* Also fix any alternate divider implementations */
    .divider, 
    .category-divider,
    .content-divider,
    .separator,
    .section-separator {
      position: relative !important;
      height: 1px !important;
      background-color: #E6DBC9 !important;
      margin: 20px 0 !important;
      width: 100% !important;
    }
    
    .divider:before,
    .category-divider:before,
    .content-divider:before,
    .separator:before,
    .section-separator:before {
      content: '' !important;
      position: absolute !important;
      top: -1px !important;
      left: 0 !important;
      width: 30% !important;
      height: 2px !important;
      background-color: #4779B5 !important;
      border-radius: 1px !important;
    }
  `;
  
  // Add style to document head
  document.head.appendChild(styleTag);
  console.log('Global divider styles applied');
  
  // Now specifically fix the Our Story accordion content, keeping everything else the same
  const ourStoryAccordion = document.getElementById('our-story-accordion');
  if (!ourStoryAccordion) {
    console.log('Our Story accordion not found');
    return;
  }
  
  const content = ourStoryAccordion.querySelector('.accordion-content');
  if (!content) {
    console.log('Our Story accordion content not found');
    return;
  }
  
  // Look for any existing dividers in Our Story and update them
  const existingDividers = content.querySelectorAll('div[style*="linear-gradient"]');
  existingDividers.forEach(divider => {
    // Replace gradient dividers with the standard section-divider class
    const newDivider = document.createElement('div');
    newDivider.className = 'section-divider';
    divider.parentNode.replaceChild(newDivider, divider);
  });
  
  // Also fix any direct divider elements that might be using different styles
  const directDividers = content.querySelectorAll('.section-divider, .divider');
  directDividers.forEach(divider => {
    // Make sure they have the right class
    divider.className = 'section-divider';
    // Clear any inline styles that might override our global styles
    divider.removeAttribute('style');
  });
  
  // Fix the Our Story content structure if needed
  const whatMakesDifferentSection = content.querySelector('h4:contains("What Makes Us Different")');
  const founderStorySection = content.querySelector('h4:contains("Our Founder\'s Story")');
  const processSection = content.querySelector('h4:contains("The Process")');
  
  // Make sure dividers exist between sections
  if (whatMakesDifferentSection && founderStorySection) {
    // Check if there's a divider between them
    let dividerExists = false;
    let currentEl = whatMakesDifferentSection;
    while (currentEl && currentEl !== founderStorySection) {
      if (currentEl.classList && currentEl.classList.contains('section-divider')) {
        dividerExists = true;
        break;
      }
      currentEl = currentEl.nextElementSibling;
    }
    
    if (!dividerExists) {
      // Add a divider between What Makes Us Different and Our Founder's Story
      const newDivider = document.createElement('div');
      newDivider.className = 'section-divider';
      founderStorySection.parentNode.insertBefore(newDivider, founderStorySection);
    }
  }
  
  if (founderStorySection && processSection) {
    // Check if there's a divider between them
    let dividerExists = false;
    let currentEl = founderStorySection;
    while (currentEl && currentEl !== processSection) {
      if (currentEl.classList && currentEl.classList.contains('section-divider')) {
        dividerExists = true;
        break;
      }
      currentEl = currentEl.nextElementSibling;
    }
    
    if (!dividerExists) {
      // Add a divider between Our Founder's Story and The Process
      const newDivider = document.createElement('div');
      newDivider.className = 'section-divider';
      processSection.parentNode.insertBefore(newDivider, processSection);
    }
  }
  
  // Reduce text size in the Our Story section only
  const allParagraphs = content.querySelectorAll('p:not(.section-intro):not(.founder-signature)');
  allParagraphs.forEach(p => {
    p.style.fontSize = '0.9rem';
  });
  
  console.log('Our Story accordion content updated with consistent dividers');
  
  // Finally, let's fix any other accordion dividers to ensure consistency
  const allAccordions = document.querySelectorAll('.accordion-item');
  allAccordions.forEach(accordion => {
    if (accordion.id === 'our-chefs-accordion' || accordion.id === 'our-story-accordion') {
      return; // Already fixed
    }
    
    const accordionContent = accordion.querySelector('.accordion-content');
    if (!accordionContent) return;
    
    // Find and fix any non-standard dividers
    const nonStandardDividers = accordionContent.querySelectorAll('div[style*="linear-gradient"], .divider:not(.section-divider), .separator, .content-divider');
    nonStandardDividers.forEach(divider => {
      // Replace with standard section-divider
      const newDivider = document.createElement('div');
      newDivider.className = 'section-divider';
      divider.parentNode.replaceChild(newDivider, divider);
    });
  });
  
  console.log('Global divider fix completed');
})();
