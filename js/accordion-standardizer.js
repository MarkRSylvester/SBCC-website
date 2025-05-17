document.addEventListener('DOMContentLoaded', function() {
  // Get all accordion headers
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  // Add event listeners and ensure consistent structure
  accordionHeaders.forEach(header => {
    // Get parent accordion item
    const accordionItem = header.closest('.accordion-item');
    
    // Make sure each accordion header has an icon
    if (!header.querySelector('.accordion-icon')) {
      const icon = document.createElement('div');
      icon.className = 'accordion-icon';
      header.appendChild(icon);
    }
    
    // Add click event to toggle active state
    header.addEventListener('click', function() {
      // Toggle active class
      accordionItem.classList.toggle('active');
      accordionItem.classList.toggle('open');
      
      // Update accessibility attributes
      const expanded = accordionItem.classList.contains('active');
      header.setAttribute('aria-expanded', expanded);
      
      // Control the content visibility
      const content = accordionItem.querySelector('.accordion-content');
      if (content) {
        if (expanded) {
          content.style.display = 'block';
          content.style.height = 'auto';
          content.style.maxHeight = '80vh';
          content.style.opacity = '1';
          content.style.visibility = 'visible';
          content.style.overflow = 'auto';
          content.style.padding = '20px';
        } else {
          content.style.display = '';
          content.style.height = '';
          content.style.maxHeight = '';
          content.style.opacity = '';
          content.style.visibility = '';
          content.style.overflow = '';
          content.style.padding = '';
        }
      }
    });
  });
  
  // Add icons to any accordion headers that don't have them
  function addIconsToAccordion(accordionId) {
    const accordion = document.querySelector('#' + accordionId);
    if (accordion) {
      const header = accordion.querySelector('.accordion-header');
      if (header && !header.querySelector('.accordion-icon')) {
        const icon = document.createElement('div');
        icon.className = 'accordion-icon';
        header.appendChild(icon);
      }
    }
  }
  
  // Update specific accordions
  addIconsToAccordion('our-chefs-accordion');
  addIconsToAccordion('our-menus-accordion');
  addIconsToAccordion('faq-accordion');
});
