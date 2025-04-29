// Santa Barbara Chef Collective
// Main JavaScript functionality

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  initializeMobileMenu();
  initializeModals();
  initializeSectionReveal();
  initializeHeaderScroll();
  initializeFormInteractions();
  initializeAccordion();
});

// Mobile menu toggle
function initializeMobileMenu() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const body = document.body;
  
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      body.classList.toggle('no-scroll');
    });
    
    // Close menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('open');
        mobileMenu.classList.remove('open');
        body.classList.remove('no-scroll');
      });
    });
  }
}

// Header scroll effect
function initializeHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
}

// Modal functionality
function initializeModals() {
  const modalTriggers = document.querySelectorAll('[data-modal]');
  const modalClose = document.querySelectorAll('.modal-close');
  const modals = document.querySelectorAll('.modal');
  const body = document.body;

  // Open modal when trigger is clicked
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const modalId = trigger.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add('open');
        body.classList.add('no-scroll'); // Prevent background scrolling
        
        // Set focus to first focusable element for accessibility
        const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusableElements.length > 0) {
          focusableElements[0].focus();
        }
      }
    });
  });

  // Close modal when close button is clicked
  modalClose.forEach(close => {
    close.addEventListener('click', () => {
      const modal = close.closest('.modal');
      if (modal) {
        closeModal(modal);
      }
    });
  });

  // Close modal when clicking outside content
  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  // Close modal with ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const openModal = document.querySelector('.modal.open');
      if (openModal) {
        closeModal(openModal);
      }
    }
  });
  
  // Helper function to close a modal
  function closeModal(modal) {
    modal.classList.remove('open');
    body.classList.remove('no-scroll');
    
    // Return focus to the element that opened the modal
    const modalId = modal.id;
    const trigger = document.querySelector(`[data-modal="${modalId}"]`);
    if (trigger) {
      trigger.focus();
    }
  }
  
  // Form validation
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      let valid = true;
      const requiredFields = form.querySelectorAll('[required]');
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          valid = false;
          field.parentElement.classList.add('error');
          
          // Add error message if not exists
          if (!field.parentElement.querySelector('.error-message')) {
            const errorMsg = document.createElement('div');
            errorMsg.className = 'error-message';
            errorMsg.textContent = 'This field is required';
            field.parentElement.appendChild(errorMsg);
          }
        } else {
          field.parentElement.classList.remove('error');
          const errorMsg = field.parentElement.querySelector('.error-message');
          if (errorMsg) {
            errorMsg.remove();
          }
        }
      });
      
      // Prevent form submission if validation fails
      if (!valid) {
        e.preventDefault();
        
        // Focus the first invalid field
        const firstInvalid = form.querySelector('.error input, .error select, .error textarea');
        if (firstInvalid) {
          firstInvalid.focus();
        }
      }
    });
  });
  
  // Explore options click handling
  const exploreOptions = document.querySelectorAll('.explore-option');
  exploreOptions.forEach(option => {
    option.addEventListener('click', () => {
      const href = option.getAttribute('data-href');
      if (href) {
        window.location.href = href;
      }
    });
  });
}

// Section reveal on scroll
function initializeSectionReveal() {
  const sections = document.querySelectorAll('.intro-section, .featured-chefs, .testimonials');
  
  const revealSection = () => {
    const windowHeight = window.innerHeight;
    
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop < windowHeight * 0.75) {
        section.classList.add('visible');
      }
    });
  };
  
  // Run on load and scroll
  window.addEventListener('scroll', revealSection);
  window.addEventListener('resize', revealSection);
  revealSection(); // Initial check on page load
}

// Add extra styling for inputs on focus
function initializeFormInteractions() {
  const formInputs = document.querySelectorAll('input, select, textarea');
  
  formInputs.forEach(input => {
    // Add focused class when focused
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });
    
    // Remove focused class when blurred
    input.addEventListener('blur', () => {
      input.parentElement.classList.remove('focused');
    });
    
    // Add has-value class when input has a value
    input.addEventListener('input', () => {
      if (input.value.trim() !== '') {
        input.parentElement.classList.add('has-value');
      } else {
        input.parentElement.classList.remove('has-value');
      }
    });
    
    // Check initial value
    if (input.value.trim() !== '') {
      input.parentElement.classList.add('has-value');
    }
  });
}

// Accordion Menu functionality (for use in future components)
function initializeAccordion() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const accordionItem = header.parentElement;
      const isOpen = accordionItem.classList.contains('open');
      
      // Close all items
      document.querySelectorAll('.accordion-item').forEach(item => {
        item.classList.remove('open');
        const content = item.querySelector('.accordion-content');
        content.style.maxHeight = null;
      });
      
      // Open the clicked item if it wasn't already open
      if (!isOpen) {
        accordionItem.classList.add('open');
        const content = accordionItem.querySelector('.accordion-content');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
}

// Helper function to validate date (for event booking)
function validateEventDate(dateInput) {
  const selectedDate = new Date(dateInput.value);
  const today = new Date();
  const minDate = new Date();
  minDate.setDate(today.getDate() + 14); // Minimum 14 days in advance
  
  if (selectedDate < minDate) {
    // Date is too soon
    const errorMsg = document.createElement('div');
    errorMsg.className = 'error-message';
    errorMsg.textContent = 'Please select a date at least 14 days from today';
    
    // Remove any existing error message
    const existingError = dateInput.parentElement.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }
    
    dateInput.parentElement.appendChild(errorMsg);
    dateInput.parentElement.classList.add('error');
    return false;
  } else {
    // Date is valid
    const existingError = dateInput.parentElement.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }
    dateInput.parentElement.classList.remove('error');
    return true;
  }
} 