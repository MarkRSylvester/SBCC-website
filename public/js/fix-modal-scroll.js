// Simple fix to prevent modal scrolling when accordions toggle
document.addEventListener('DOMContentLoaded', function() {
  console.log("🔧 Modal scroll fix initializing");
  
  // Get the modal content
  const modalContent = document.querySelector('#explore-modal .modal-content');
  if (!modalContent) {
    console.error("❌ Modal content not found");
    return;
  }
  
  // Listen for before and after accordion toggles
  let lastScrollPosition = 0;
  
  // Find all accordion headers
  const headers = document.querySelectorAll('.accordion-header');
  
  // Add scroll position preserving
  headers.forEach(header => {
    // Save scroll position before click
    header.addEventListener('mousedown', function() {
      lastScrollPosition = modalContent.scrollTop;
      console.log(`📌 Saved scroll position: ${lastScrollPosition}`);
    });
    
    // Restore scroll position after any class changes
    // Create a mutation observer
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          // Small delay to let content render
          setTimeout(function() {
            console.log(`🔄 Restoring scroll position: ${lastScrollPosition}`);
            modalContent.scrollTop = lastScrollPosition;
          }, 10);
        }
      });
    });
    
    // Start observing the accordion item
    const accordion = header.closest('.accordion-item');
    if (accordion) {
      observer.observe(accordion, { attributes: true });
    }
  });
  
  console.log("✅ Modal scroll fix initialized");
});
