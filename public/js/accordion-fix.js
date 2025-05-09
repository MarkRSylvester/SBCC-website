// Define the CSS fixes as a constant
const accordionFixCSS = `
/* Ensure all accordions start closed by default */
.accordion-item .accordion-content {
  max-height: 0 !important;
  padding: 0 !important;
  overflow: hidden !important;
  transition: max-height 0.3s ease, padding 0.3s ease !important;
}

/* Only expand accordions that are explicitly activated */
.accordion-item.active .accordion-content {
  max-height: 600px !important;
  padding: 1.5rem 2rem !important;
  overflow-y: auto !important;
}

/* Make sure all accordions have chevron icons */
.accordion-header .accordion-icon {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  transition: transform 0.3s ease !important;
}

/* Ensure consistent rotation for all accordion chevrons */
.accordion-item .accordion-header .accordion-icon {
  transform: rotate(0deg) !important;
}

.accordion-item.active .accordion-header .accordion-icon {
  transform: rotate(180deg) !important;
}

/* Fix for minus icons in Beyond the Table */
.accordion-item .minus-icon,
.accordion-item button.icon {
  display: none !important;
}

/* Additional specific fix for FAQ and Beyond the Table accordions */
#beyond-table-accordion .accordion-content,
#faq-accordion .accordion-content {
  max-height: 0 !important;
  padding: 0 !important;
  overflow: hidden !important;
}

#beyond-table-accordion.active .accordion-content,
#faq-accordion.active .accordion-content {
  max-height: 600px !important;
  padding: 1.5rem 2rem !important;
  overflow-y: auto !important;
}

/* Ensure accordion headers always have a chevron */
.accordion-header:not(:has(.accordion-icon)) {
  position: relative;
}

.accordion-header:not(:has(.accordion-icon))::after {
  content: '';
  display: block;
  width: 16px;
  height: 16px;
  background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 12L16 4L14.59 2.58L8 9.17L1.41 2.58L0 4L8 12Z' fill='%232a4374'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  transition: transform 0.3s ease;
}

.accordion-item.active .accordion-header:not(:has(.accordion-icon))::after {
  transform: rotate(180deg);
}
`;

// Brand new accordion implementation based on the actual HTML structure
document.addEventListener('DOMContentLoaded', function() {
  console.log("New accordion implementation loading");
  
  // Target the exact HTML structure I see in your screenshots
  // Each accordion has a div.accordion-item with an h3 title and a +/- button
  
  // Find all h3 elements inside elements with blue left borders
  document.querySelectorAll('h3').forEach(heading => {
    console.log("Found heading:", heading.textContent.trim());
    
    // Make it clickable
    heading.style.cursor = 'pointer';
    
    // Add click handler
    heading.addEventListener('click', function() {
      console.log("Clicked heading:", this.textContent.trim());
      
      // Find the content div (it's the next element after the h3)
      const contentDiv = this.nextElementSibling;
      if (!contentDiv) {
        console.log("No content div found");
        return;
      }
      
      // Toggle visibility
      const isVisible = contentDiv.style.display !== 'none';
      
      if (isVisible) {
        // Hide it
        contentDiv.style.display = 'none';
        // Update plus/minus if it exists
        const icon = this.querySelector('span, .accordion-icon');
        if (icon) icon.textContent = '+';
      } else {
        // Show it
        contentDiv.style.display = 'block';
        // Update plus/minus if it exists
        const icon = this.querySelector('span, .accordion-icon');
        if (icon) icon.textContent = '-';
      }
    });
  });
  
  // Initialize all accordions to be closed by default
  document.querySelectorAll('h3').forEach(heading => {
    const contentDiv = heading.nextElementSibling;
    if (contentDiv && contentDiv.tagName !== 'H3') {
      contentDiv.style.display = 'none';
    }
  });
  
  console.log("New accordion implementation loaded");
});

// Close all accordions
function closeAllAccordions() {
  const allAccordions = document.querySelectorAll('.accordion-item');
  
  allAccordions.forEach(accordion => {
    accordion.classList.remove('active');
    
    // Update ARIA attributes
    const header = accordion.querySelector('.accordion-header');
    if (header) {
      header.setAttribute('aria-expanded', 'false');
    }
    
    // Reset icon rotation
    const icon = accordion.querySelector('.accordion-icon');
    if (icon) {
      icon.textContent = '+';
    }
  });
}

// Add missing chevrons to accordion headers
function addMissingChevrons() {
  const headers = document.querySelectorAll('.accordion-header:not(:has(.accordion-icon))');
  
  headers.forEach(header => {
    const iconDiv = document.createElement('div');
    iconDiv.className = 'accordion-icon';
    iconDiv.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 12L16 4L14.59 2.58L8 9.17L1.41 2.58L0 4L8 12Z" fill="#2a4374"/>
      </svg>
    `;
    
    header.appendChild(iconDiv);
  });
}

// Reinitialize click handlers for all accordions
function reinitializeAccordionHandlers() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  accordionHeaders.forEach(header => {
    // Remove existing listeners by cloning and replacing
    const newHeader = header.cloneNode(true);
    header.parentNode.replaceChild(newHeader, header);
    
    // Add new click listener
    newHeader.addEventListener('click', function() {
      const accordionItem = this.closest('.accordion-item');
      const isActive = accordionItem.classList.contains('active');
      
      // Close all accordions first
      closeAllAccordions();
      
      // If this wasn't active before, open it
      if (!isActive) {
        accordionItem.classList.add('active');
        this.setAttribute('aria-expanded', 'true');
        
        // Rotate icon
        const icon = this.querySelector('.accordion-icon');
        if (icon) {
          icon.style.transform = 'rotate(180deg)';
        }
      }
    });
  });
} 