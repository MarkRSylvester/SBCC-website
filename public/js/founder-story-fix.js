document.addEventListener('DOMContentLoaded', function() {
  // Fix for the founder's story paragraph spacing
  function fixFounderStory() {
    // Find the founder-text div
    const founderText = document.querySelector('.founder-text');
    if (founderText) {
      // Get all paragraphs
      const paragraphs = founderText.querySelectorAll('p');
      
      // Apply spacing to each paragraph
      paragraphs.forEach((p, index) => {
        // Add margin to all paragraphs except the last one
        if (index < paragraphs.length - 1) {
          p.style.marginBottom = '16px';
          p.style.display = 'block';
        }
        
        // If it's the signature paragraph
        if (p.classList.contains('founder-signature')) {
          p.style.marginTop = '16px';
          p.style.textAlign = 'right';
          p.style.display = 'block';
        }
      });
      
      console.log('Founder story paragraph spacing fixed');
    } else {
      console.log('Founder text element not found');
    }
  }
  
  // Try to fix immediately
  fixFounderStory();
  
  // Also try after a short delay to ensure the DOM is fully rendered
  setTimeout(fixFounderStory, 500);
  
  // Also try after the modal is opened
  document.querySelectorAll('[data-modal-target="explore-modal"]').forEach(trigger => {
    trigger.addEventListener('click', function() {
      setTimeout(fixFounderStory, 300);
    });
  });
  
  // Fix after accordions are opened
  document.querySelectorAll('#our-story-accordion .accordion-header').forEach(header => {
    header.addEventListener('click', function() {
      setTimeout(fixFounderStory, 300);
    });
  });
});
