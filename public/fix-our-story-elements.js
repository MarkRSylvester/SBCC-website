// Clean, targeted fix for Our Story dividers and text size
(function() {
  console.log('Starting targeted Our Story fix');
  
  // 1. Find Our Story accordion
  const ourStoryAccordion = document.getElementById('our-story-accordion');
  if (!ourStoryAccordion) {
    console.error('Our Story accordion not found');
    return;
  }
  
  // 2. Get its content
  const content = ourStoryAccordion.querySelector('.accordion-content');
  if (!content) {
    console.error('Our Story content not found');
    return;
  }
  
  // 3. Find all potential dividers in Our Story
  const currentDividers = content.querySelectorAll('[style*="gradient"], .divider, div[style*="height: 1px"]');
  console.log(`Found ${currentDividers.length} potential dividers to fix`);
  
  // 4. Replace each with simple section-divider
  currentDividers.forEach(div => {
    // Create new simple divider
    const newDivider = document.createElement('div');
    newDivider.className = 'section-divider';
    
    // Replace the old one with the new one
    if (div.parentNode) {
      div.parentNode.replaceChild(newDivider, div);
      console.log('Replaced a divider');
    }
  });
  
  // 5. Ensure we have section dividers in the right places
  const sections = content.querySelectorAll('h4');
  console.log(`Found ${sections.length} section headers`);
  
  // Add dividers before each section (except the first one)
  for (let i = 1; i < sections.length; i++) {
    const section = sections[i];
    
    // Check if there's already a divider right before this section
    let prevSibling = section.previousElementSibling;
    let dividerExists = false;
    
    while (prevSibling && !dividerExists) {
      if (prevSibling.classList && prevSibling.classList.contains('section-divider')) {
        dividerExists = true;
      }
      prevSibling = prevSibling.previousElementSibling;
    }
    
    if (!dividerExists) {
      // Create a new divider
      const newDivider = document.createElement('div');
      newDivider.className = 'section-divider';
      
      // Insert before the section header
      section.parentNode.insertBefore(newDivider, section);
      console.log('Added a missing divider');
    }
  }
  
  // 6. Make text smaller
  const paragraphs = content.querySelectorAll('p');
  console.log(`Found ${paragraphs.length} paragraphs`);
  
  paragraphs.forEach(p => {
    p.style.fontSize = '0.9rem';
    console.log('Fixed paragraph text size');
  });
  
  // 7. Add CSS to ensure dividers look right
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    /* Ensure section dividers look right */
    .section-divider {
      position: relative;
      height: 1px;
      background-color: #E6DBC9;
      margin: 30px auto;
      width: 70%;
    }
    
    .section-divider:before {
      content: '';
      position: absolute;
      top: -1px;
      left: 50%;
      transform: translateX(-50%);
      width: 40%;
      height: 3px;
      background-color: #1D3557;
      border-radius: 1.5px;
    }
  `;
  document.head.appendChild(styleEl);
  
  console.log('Our Story fix completed');
})();
