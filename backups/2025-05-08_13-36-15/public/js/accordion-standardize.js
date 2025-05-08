// Standardized styling for all accordions
const accordionStandardizeCSS = `
/* Base accordion styling */
.accordion-item {
  margin-bottom: 1rem !important;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid #d0d0d0;
  transition: all 0.3s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: relative;
  background-color: #f3f7ff;
}

/* Left border styling */
.accordion-item:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 6px;
  background-color: #3E78B2;
  z-index: 1;
}

/* Header styling */
.accordion-header {
  background-color: transparent;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
  border-left: none;
}

.accordion-header:hover {
  background-color: #e1ecff;
}

.accordion-header h3 {
  font-family: 'Playfair Display', serif;
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: #2a4374;
  line-height: 1;
}

/* Standardize all chevron icons */
.accordion-icon {
  transition: transform 0.3s ease;
}

.accordion-icon svg {
  width: 16px;
  height: 16px;
}

/* Set all icons to use the same chevron */
.accordion-icon svg path {
  d: path("M8 12L16 4L14.59 2.58L8 9.17L1.41 2.58L0 4L8 12Z");
  fill: #2a4374;
}

/* Rotate icon when accordion is active */
.accordion-item.active .accordion-icon {
  transform: rotate(180deg);
}

/* Content area styling */
.accordion-content {
  padding: 0;
  max-height: 0;
  overflow: hidden;
  transition: all 0.3s ease;
}

.accordion-item.active .accordion-content {
  padding: 1.5rem 2rem !important;
  max-height: 600px;
}

/* Make sure description text has consistent styling */
.accordion-content p {
  color: #555555;
  line-height: 1.7;
  margin-bottom: 30px;
  font-size: 16px;
  font-family: 'Inter', sans-serif;
  max-width: 100%;
}

/* Section intro styling */
.section-intro {
  text-align: center;
  margin-bottom: 1.5rem;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  line-height: 1.7;
  color: #333333;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

/* Special handling for Beyond the Table fixed header */
#beyond-table-accordion .fixed-header {
  position: sticky;
  top: 0;
  background-color: #f3f7ff;
  z-index: 10;
  padding: 1rem 2rem 0.75rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* Ensure consistent styling for service categories */
.service-categories {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 1rem;
}

.category-tab {
  background-color: transparent;
  border: 1px solid #1D3557;
  color: #1D3557;
  font-family: 'Playfair Display', serif;
  font-size: 14px;
  padding: 8px 16px;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-tab:hover {
  background-color: rgba(29, 53, 87, 0.1);
}

.category-tab.active {
  background-color: #1D3557;
  color: white;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .accordion-item.active .accordion-content {
    padding: 1.25rem 1.5rem !important;
  }
  
  .accordion-header h3 {
    font-size: 16px;
  }
}
`;

// Standardize all accordions
document.addEventListener('DOMContentLoaded', function() {
  // Wait for everything to load
  setTimeout(standardizeAllAccordions, 1000);
});

function standardizeAllAccordions() {
  // Add the standardized CSS
  const styleElement = document.createElement('style');
  styleElement.textContent = accordionStandardizeCSS;
  document.head.appendChild(styleElement);
  
  // 1. First, make sure all chevrons are the same
  standardizeChevrons();
  
  // 2. Ensure all accordions are closed by default
  ensureAllClosed();
  
  // 3. Add/update proper descriptions
  updateAccordionDescriptions();
  
  // 4. Re-initialize click events for consistent behavior
  reinitializeAccordionEvents();
}

// Standardize all chevron icons
function standardizeChevrons() {
  const allIcons = document.querySelectorAll('.accordion-header .accordion-icon');
  
  allIcons.forEach(icon => {
    icon.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 12L16 4L14.59 2.58L8 9.17L1.41 2.58L0 4L8 12Z" fill="#2a4374"/>
      </svg>
    `;
  });
}

// Ensure all accordions start closed
function ensureAllClosed() {
  const allAccordions = document.querySelectorAll('.accordion-item');
  
  allAccordions.forEach(accordion => {
    accordion.classList.remove('active');
    
    const header = accordion.querySelector('.accordion-header');
    if (header) {
      header.setAttribute('aria-expanded', 'false');
    }
    
    const icon = accordion.querySelector('.accordion-icon');
    if (icon) {
      icon.style.transform = 'rotate(0deg)';
    }
  });
}

// Update accordion descriptions
function updateAccordionDescriptions() {
  // Gatherings & Celebrations description
  const gatheringsAccordion = document.getElementById('gatherings-accordion');
  if (gatheringsAccordion) {
    const content = gatheringsAccordion.querySelector('.accordion-content');
    if (content) {
      if (!content.querySelector('.section-intro')) {
        content.insertAdjacentHTML('afterbegin', `
          <p class="section-intro">
            Whether you're hosting an intimate dinner or a milestone celebration, our chefs craft custom menus that bring your vision to life. We take care of every detail—so you can relax, connect, and savor the moment.
          </p>
        `);
      }
    }
  }
}

// Reinitialize accordion click events
function reinitializeAccordionEvents() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  accordionHeaders.forEach(header => {
    // Remove existing listeners by cloning and replacing
    const newHeader = header.cloneNode(true);
    header.parentNode.replaceChild(newHeader, header);
    
    // Add new click listener
    newHeader.addEventListener('click', function() {
      const accordionItem = this.closest('.accordion-item');
      
      // Toggle active class
      accordionItem.classList.toggle('active');
      
      // Toggle aria-expanded for accessibility
      const expanded = accordionItem.classList.contains('active');
      this.setAttribute('aria-expanded', expanded);
      
      // Rotate icon
      const icon = this.querySelector('.accordion-icon');
      if (icon) {
        icon.style.transform = expanded ? 'rotate(180deg)' : 'rotate(0deg)';
      }
    });
  });
} 