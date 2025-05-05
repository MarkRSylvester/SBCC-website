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
  const hamburgerMenu = document.getElementById('hamburgerMenu');
  const body = document.body;
  
  if (hamburgerMenu) {
    hamburgerMenu.addEventListener('click', () => {
      hamburgerMenu.classList.toggle('active');
      body.classList.toggle('no-scroll');
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

  // Open modal
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = trigger.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      if (modal) {
        openModal(modal);
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

  // Close modal when clicking outside
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
}

function openModal(modal) {
  // First close any open modals
  const openModals = document.querySelectorAll('.modal');
  openModals.forEach(m => {
    m.style.display = 'none';
  });

  // Then open the requested modal
  modal.style.display = 'flex';
  document.body.classList.add('modal-open');
  
  // Set focus to first focusable element
  const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  if (focusableElements.length > 0) {
    focusableElements[0].focus();
  }
  
  // Log for debugging
  console.log('Opening modal:', modal.id);
}

function closeModal(modal) {
  if (!modal) return;
  
  modal.style.display = 'none';
  document.body.classList.remove('modal-open');
  
  // Log for debugging
  console.log('Closing modal:', modal.id);
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
      const isOpen = accordionItem.classList.contains('active');
      const content = accordionItem.querySelector('.accordion-content');
      
      // Close all items
      document.querySelectorAll('.accordion-item').forEach(item => {
        item.classList.remove('active');
        const otherContent = item.querySelector('.accordion-content');
        if (otherContent) {
          otherContent.style.maxHeight = null;
        }
      });
      
      // Open the clicked item if it wasn't already open
      if (!isOpen) {
        accordionItem.classList.add('active');
        if (content) {
          content.style.maxHeight = content.scrollHeight + 'px';
        }
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

// Form validation
document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Basic validation
      let isValid = true;
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      
      // Log form submission
      console.log('Form submitted:', data);
      
      // You would typically send this data to your server here
      alert('Thank you for your submission! We will contact you shortly.');
      
      // Close the modal
      const modal = form.closest('.modal');
      if (modal) {
        closeModal(modal);
      }
      
      // Reset the form
      form.reset();
    });
  });
}); 