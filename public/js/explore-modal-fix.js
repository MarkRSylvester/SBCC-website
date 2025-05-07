// Simple solution to fix the Just Exploring modal opening
document.addEventListener("DOMContentLoaded", function() {
  console.log("Applying modal fix...");
  
  // Find all buttons that should open the Just Exploring modal
  const exploreButtons = document.querySelectorAll('button[data-modal="explore"], [data-modal="explore-modal"], a[href="#explore"], .cta-button.tertiary');
  
  console.log("Found explore buttons:", exploreButtons.length);
  
  exploreButtons.forEach(button => {
    // Clean up any existing event listeners
    const newButton = button.cloneNode(true);
    button.parentNode.replaceChild(newButton, button);
    
    // Add a simple direct click handler
    newButton.onclick = function(e) {
      e.preventDefault();
      console.log("Explore button clicked");
      
      // Find the modal - try different possible selectors
      const modal = document.getElementById('explore-modal') || 
                    document.getElementById('explore') || 
                    document.querySelector('.modal[id*="explore"]');
      
      if (modal) {
        console.log("Found explore modal, opening");
        modal.style.display = 'block';
        modal.style.visibility = 'visible';
        modal.style.opacity = '1';
        modal.classList.add('open', 'active');
        
        // Prevent scrolling on body
        document.body.style.overflow = 'hidden';
        
        // Add close functionality to any close buttons
        const closeButtons = modal.querySelectorAll('.modal-close, .close-button, [data-close]');
        closeButtons.forEach(closeBtn => {
          closeBtn.onclick = function() {
            modal.style.display = 'none';
            modal.style.visibility = 'hidden';
            modal.style.opacity = '0';
            modal.classList.remove('open', 'active');
            document.body.style.overflow = '';
          };
        });
        
        // Add click outside to close
        modal.onclick = function(event) {
          if (event.target === modal) {
            modal.style.display = 'none';
            modal.style.visibility = 'hidden';
            modal.style.opacity = '0';
            modal.classList.remove('open', 'active');
            document.body.style.overflow = '';
          }
        };
      } else {
        console.error("Modal not found!");
      }
    };
  });
}); 