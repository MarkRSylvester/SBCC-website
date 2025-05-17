// Fix ONLY for text size in Our Story accordion
(function() {
  console.log('Starting Our Story text size fix...');
  
  // Find the Our Story accordion
  const ourStoryAccordion = document.getElementById('our-story-accordion');
  if (!ourStoryAccordion) {
    console.log('Our Story accordion not found');
    return;
  }
  
  // Find all paragraph elements in Our Story content
  const content = ourStoryAccordion.querySelector('.accordion-content');
  if (!content) {
    console.log('Accordion content not found');
    return;
  }
  
  // Add style specifically for Our Story paragraphs
  const styleEl = document.createElement('style');
  styleEl.id = 'our-story-text-fix';
  styleEl.textContent = `
    /* Smaller text size for Our Story paragraphs */
    #our-story-accordion .accordion-content p {
      font-size: 0.9rem;
    }
  `;
  
  // Append styles to head
  document.head.appendChild(styleEl);
  console.log('Our Story text size fix added');
})();
