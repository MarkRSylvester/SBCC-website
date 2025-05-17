// Simple script to scroll to the top of opened accordions
document.addEventListener('DOMContentLoaded', function() {
  // Function to scroll to an element
  function scrollToElement(element) {
    if (!element) return;
    
    // Find the modal content container
    const modalContent = element.closest('.modal-content');
    if (!modalContent) return;
    
    // Calculate scroll position (element top position minus some padding)
    const scrollTop = element.offsetTop - 20;
    
    // Scroll the modal content
    modalContent.scrollTo({
      top: scrollTop,
      behavior: 'smooth'
    });
    
    console.log('Scrolled to position:', scrollTop);
  }
  
  // Function to watch for class changes on accordions
  function watchAccordions() {
    // Set up a mutation observer to watch for class changes
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        // Check if the class list was modified
        if (mutation.attributeName === 'class') {
          const accordionItem = mutation.target;
          
          // Check if this accordion was just opened
          if (accordionItem.classList.contains('active') || 
              accordionItem.classList.contains('open')) {
            // Scroll to this accordion
            setTimeout(function() {
              scrollToElement(accordionItem);
            }, 10);
          }
        }
      });
    });
    
    // Observe all accordion items
    document.querySelectorAll('.accordion-item').forEach(function(accordionItem) {
      observer.observe(accordionItem, { attributes: true });
    });
    
    // Also watch for clicks on accordion headers as a fallback
    document.querySelectorAll('.accordion-header').forEach(function(header) {
      header.addEventListener('click', function() {
        const accordionItem = this.closest('.accordion-item');
        if (accordionItem && 
            (accordionItem.classList.contains('active') || 
             accordionItem.classList.contains('open'))) {
          setTimeout(function() {
            scrollToElement(accordionItem);
          }, 50);
        }
      });
    });
    
    console.log('Accordion scroll watching initialized');
  }
  
  // Set up the watchers when the page loads
  watchAccordions();
  
  // Also reinitialize when modals open
  document.querySelectorAll('[data-modal-target]').forEach(function(trigger) {
    trigger.addEventListener('click', function() {
      // Wait for modal to open
      setTimeout(watchAccordions, 300);
    });
  });
});
