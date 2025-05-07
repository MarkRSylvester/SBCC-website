// Fix the Beyond the Table accordion
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(fixBeyondTableAccordion, 500);
});

function fixBeyondTableAccordion() {
  // Get the Beyond the Table accordion
  const beyondTableAccordion = document.getElementById('beyond-table-accordion');
  
  if (!beyondTableAccordion) return;
  
  // Get the accordion content
  const accordionContent = beyondTableAccordion.querySelector('.accordion-content');
  
  if (!accordionContent) return;
  
  // Check if we need to create the sticky header
  if (!beyondTableAccordion.querySelector('.sticky-header-container')) {
    // Create the sticky header container
    const stickyHeader = document.createElement('div');
    stickyHeader.className = 'sticky-header-container';
    
    // Create the service categories
    const serviceCategories = document.createElement('div');
    serviceCategories.className = 'service-categories';
    
    // Add the category tabs
    serviceCategories.innerHTML = `
      <button class="category-tab active" data-category="culinary">Culinary Enhancements</button>
      <button class="category-tab" data-category="dining">Dining Environment</button>
      <button class="category-tab" data-category="educational">Educational Experiences</button>
      <button class="category-tab" data-category="specialty">Specialty Services</button>
    `;
    
    // Add the service categories to the sticky header
    stickyHeader.appendChild(serviceCategories);
    
    // Find where to insert the sticky header
    // If there's a section-intro, insert before it, otherwise at the beginning
    const sectionIntro = accordionContent.querySelector('.section-intro');
    
    if (sectionIntro) {
      accordionContent.insertBefore(stickyHeader, sectionIntro);
    } else {
      accordionContent.insertBefore(stickyHeader, accordionContent.firstChild);
    }
    
    // Initialize tab functionality
    initializeAccordionTabs();
  } else {
    // Update the text of the culinary enhancement tab
    const culinaryTab = beyondTableAccordion.querySelector('.category-tab[data-category="culinary"]');
    if (culinaryTab) {
      culinaryTab.textContent = 'Culinary Enhancements';
    }
  }
  
  // Fix the chevron to match other accordions
  const accordionIcon = beyondTableAccordion.querySelector('.accordion-icon');
  if (accordionIcon) {
    accordionIcon.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 12L16 4L14.59 2.58L8 9.17L1.41 2.58L0 4L8 12Z" fill="#2a4374"/>
      </svg>
    `;
  }
}

// Initialize accordion tabs
function initializeAccordionTabs() {
  const beyondTableAccordion = document.getElementById('beyond-table-accordion');
  if (!beyondTableAccordion) return;
  
  const categoryTabs = beyondTableAccordion.querySelectorAll('.category-tab');
  const serviceSections = beyondTableAccordion.querySelectorAll('.service-section');
  
  categoryTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Remove active class from all tabs
      categoryTabs.forEach(t => t.classList.remove('active'));
      
      // Add active class to clicked tab
      this.classList.add('active');
      
      // Get category
      const category = this.getAttribute('data-category');
      
      // Hide all service sections
      serviceSections.forEach(section => {
        section.classList.remove('active');
      });
      
      // Show selected service section
      const selectedSection = beyondTableAccordion.querySelector(
        `.service-section[data-category="${category}"]`
      );
      if (selectedSection) {
        selectedSection.classList.add('active');
      }
    });
  });
} 