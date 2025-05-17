document.addEventListener('DOMContentLoaded', function() {
  // Fix modal opening
  const fixModals = function() {
    const modalTriggers = document.querySelectorAll('[data-modal-target]');
    const modals = document.querySelectorAll('.modal');
    
    modalTriggers.forEach(trigger => {
      trigger.addEventListener('click', function(e) {
        e.preventDefault();
        const modalId = this.getAttribute('data-modal-target');
        const modal = document.getElementById(modalId);
        
        if (modal) {
          modal.classList.add('open');
          document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        }
      });
    });
    
    // Close modals with the close button
    const closeButtons = document.querySelectorAll('.modal-close');
    closeButtons.forEach(button => {
      button.addEventListener('click', function() {
        const modal = this.closest('.modal');
        if (modal) {
          modal.classList.remove('open');
          document.body.style.overflow = ''; // Re-enable scrolling
        }
      });
    });
    
    // Close modals when clicking outside
    modals.forEach(modal => {
      modal.addEventListener('click', function(e) {
        if (e.target === this) {
          this.classList.remove('open');
          document.body.style.overflow = ''; // Re-enable scrolling
        }
      });
    });
    
    // Close modals with ESC key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        modals.forEach(modal => {
          modal.classList.remove('open');
        });
        document.body.style.overflow = ''; // Re-enable scrolling
      }
    });
  };
  
  // Call the function
  fixModals();
});
