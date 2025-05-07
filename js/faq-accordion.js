// Initialize the FAQ accordion
document.addEventListener('DOMContentLoaded', function() {
  // Add a small delay to ensure DOM is fully loaded
  setTimeout(() => {
    // Initialize accordion functionality
    initializeAccordion();
    
    // Initialize FAQ items
    initializeFAQItems();
  }, 500);
});

// Initialize accordion functionality
function initializeAccordion() {
  const accordionHeaders = document.querySelectorAll('#faq-accordion .accordion-header');
  
  accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const accordionItem = this.closest('.accordion-item');
      
      // Toggle active class
      accordionItem.classList.toggle('active');
      
      // Toggle aria-expanded for accessibility
      const expanded = accordionItem.classList.contains('active');
      this.setAttribute('aria-expanded', expanded);
      
      // Close all FAQ items when accordion is closed
      if (!expanded) {
        const allFaqItems = accordionItem.querySelectorAll('.faq-item');
        allFaqItems.forEach(item => {
          item.classList.remove('active');
        });
      }
    });
  });
  
  // Add FAQ item click handlers
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
      const faqItem = this.closest('.faq-item');
      faqItem.classList.toggle('active');
    });
  });
}

// Initialize FAQ items
function initializeFAQItems() {
  const faqQuestions = document.querySelectorAll('#faq-accordion .faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', function(e) {
      // Prevent event from bubbling up to accordion header
      e.stopPropagation();
      
      const faqItem = this.closest('.faq-item');
      const accordionItem = this.closest('.accordion-item');
      
      // Only proceed if accordion is active
      if (!accordionItem.classList.contains('active')) return;
      
      // Check if this item is already active
      const isActive = faqItem.classList.contains('active');
      
      // Close all FAQ items
      const allItems = document.querySelectorAll('#faq-accordion .faq-item');
      allItems.forEach(item => {
        item.classList.remove('active');
      });
      
      // If the clicked item wasn't active before, make it active
      if (!isActive) {
        faqItem.classList.add('active');
      }
      
      // Update aria-expanded
      this.setAttribute('aria-expanded', !isActive);
    });
  });
} 