/**
 * Add smooth scrolling and fix iOS issues
 */
document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for accordion content
  function addSmoothScrolling() {
    document.querySelectorAll('.accordion-header').forEach(function(header) {
      header.addEventListener('click', function() {
        const item = this.closest('.accordion-item');
        
        if (!item.classList.contains('active')) {
          // Wait for the content to be visible
          setTimeout(function() {
            const headerRect = header.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // If header is not fully visible in the viewport, scroll to it
            if (headerRect.top < 0 || headerRect.bottom > windowHeight) {
              header.scrollIntoView({
                behavior: 'smooth', 
                block: 'start'
              });
            }
          }, 300);
        }
      });
    });
  }
  
  // Fix iOS scrolling issues
  function fixIOSIssues() {
    // Check if iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    
    if (isIOS) {
      // Add iOS-specific styles
      const style = document.createElement('style');
      style.textContent = `
        .modal-content {
          -webkit-overflow-scrolling: touch;
        }
        
        .accordion-content {
          -webkit-overflow-scrolling: touch;
        }
      `;
      document.head.appendChild(style);
    }
  }
  
  addSmoothScrolling();
  fixIOSIssues();
});
