/**
 * Validate content and fix any remaining issues
 */
document.addEventListener('DOMContentLoaded', function() {
  // Wait for everything to load
  setTimeout(function() {
    // Make sure content is visible in accordions when needed
    document.querySelectorAll('.accordion-item.active .accordion-content').forEach(function(content) {
      content.style.display = 'block';
      content.style.maxHeight = 'none';
      content.style.height = 'auto';
      content.style.padding = '1.5rem';
      content.style.overflow = 'visible';
    });
    
    // Verify FAQ content
    const faqContent = document.querySelector('#faq-accordion .accordion-content');
    if (faqContent && !faqContent.querySelector('.faq-grid')) {
      // Re-inject if missing
      const script = document.createElement('script');
      script.src = 'js/faq-format-fix.js';
      document.body.appendChild(script);
    }
    
    // Make sure grids are properly displayed
    document.querySelectorAll('.category-grid').forEach(function(grid) {
      grid.style.display = 'grid';
      grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
      grid.style.gap = '1.5rem';
    });
    
    // Fix any category cards that might be misaligned
    document.querySelectorAll('.category-card').forEach(function(card) {
      card.style.height = '100%';
      card.style.display = 'flex';
      card.style.flexDirection = 'column';
    });
    
    console.log('Content validation complete');
  }, 1000);
});
