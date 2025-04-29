// Modal functionality for Santa Barbara Chef Collective
document.addEventListener('DOMContentLoaded', function() {
  console.log('Modal script loaded successfully');
  
  // Get all elements with data-modal attribute (modal triggers)
  const exploreButton = document.querySelector('[data-modal="explore-modal"]');
  const planEventButton = document.getElementById('plan-event');
  const weeklyMealsButton = document.getElementById('weekly-meals');
  
  // Get all modal elements
  const modals = document.querySelectorAll('.modal');
  
  // Get all close buttons
  const closeButtons = document.querySelectorAll('.modal-close');
  
  // Function to open modal
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      console.log('Opening modal:', modalId);
      modal.classList.add('active');
      document.body.classList.add('modal-open');
    } else {
      console.error('Modal not found:', modalId);
    }
  }
  
  // Function to close modal
  function closeModal() {
    console.log('Closing modals');
    modals.forEach(modal => {
      modal.classList.remove('active');
    });
    document.body.classList.remove('modal-open');
  }
  
  // Add click event to "Just Exploring" button
  if (exploreButton) {
    exploreButton.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Explore button clicked');
      openModal('explore-modal');
    });
  } else {
    console.error('Explore button not found');
  }
  
  // Add click event to "Plan Your Event" button
  if (planEventButton) {
    planEventButton.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Plan Event button clicked');
      openModal('event-modal');
    });
  } else {
    console.error('Plan Event button not found');
  }
  
  // Add click event to "Weekly Meals" button
  if (weeklyMealsButton) {
    weeklyMealsButton.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Weekly Meals button clicked');
      openModal('meals-modal');
    });
  } else {
    console.error('Weekly Meals button not found');
  }
  
  // Add click event to all close buttons
  closeButtons.forEach(button => {
    button.addEventListener('click', function() {
      console.log('Close button clicked');
      closeModal();
    });
  });
  
  // Close modal when clicking outside modal content
  modals.forEach(modal => {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        console.log('Clicked outside modal content');
        closeModal();
      }
    });
  });
  
  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      console.log('Escape key pressed');
      closeModal();
    }
  });
  
  // Initialize accordion functionality
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
      console.log('Accordion header clicked');
      const accordionItem = this.parentElement;
      const isActive = accordionItem.classList.contains('active');
      
      // Close all accordion items
      document.querySelectorAll('.accordion-item').forEach(item => {
        item.classList.remove('active');
      });
      
      // If the clicked item wasn't active, open it
      if (!isActive) {
        accordionItem.classList.add('active');
      }
    });
  });
}); 