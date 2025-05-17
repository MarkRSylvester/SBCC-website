# Save this implementation to a file
cat > ./new-modal-implementation.sh << 'EOT'
#!/bin/bash

echo "=== Creating new modal implementation ==="

# 1. Create the CSS file with perfect styling
cat > ./public/css/montecito-modal.css << 'CSS_EOT'
/* Montecito Modal - Award-worthy modal implementation */

/* Modal Container */
.montecito-modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(29, 53, 87, 0.4); /* Navy with transparency */
  z-index: 1000;
  opacity: 0;
  transition: opacity 0.3s ease;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(3px);
}

.montecito-modal.open {
  display: flex;
  opacity: 1;
}

/* Modal Content */
.montecito-modal-content {
  position: relative;
  background-color: #F9F7F2; /* Cream */
  margin: 0 auto;
  width: 90%;
  max-width: 900px;
  max-height: 85vh;
  overflow-y: auto;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(29, 53, 87, 0.15);
  padding: 2rem;
  transform: translateY(20px);
  opacity: 0;
  transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1), 
              opacity 0.4s cubic-bezier(0.19, 1, 0.22, 1);
  will-change: transform, opacity;
}

.montecito-modal.open .montecito-modal-content {
  transform: translateY(0);
  opacity: 1;
}

/* Custom Scrollbar */
.montecito-modal-content::-webkit-scrollbar {
  width: 8px;
}

.montecito-modal-content::-webkit-scrollbar-track {
  background: rgba(230, 219, 201, 0.4); /* Sand with transparency */
  border-radius: 4px;
}

.montecito-modal-content::-webkit-scrollbar-thumb {
  background: rgba(71, 121, 181, 0.5); /* Mediterranean Blue with transparency */
  border-radius: 4px;
}

.montecito-modal-content::-webkit-scrollbar-thumb:hover {
  background: rgba(71, 121, 181, 0.7);
}

/* Modal Close Button */
.montecito-modal-close {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  font-size: 1.5rem;
  color: #1D3557; /* Navy */
  background: transparent;
  border: none;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.montecito-modal-close:hover {
  background-color: rgba(230, 219, 201, 0.5); /* Sand with transparency */
  transform: rotate(90deg);
}

/* Modal Title */
.montecito-modal-title {
  font-family: 'Playfair Display', serif;
  font-weight: 600;
  font-size: 1.75rem;
  color: #1D3557; /* Navy */
  margin-bottom: 1.5rem;
  text-align: center;
}

/* Accordion Container */
.montecito-accordion-container {
  margin-top: 1rem;
}

/* Accordion Item */
.montecito-accordion-item {
  margin-bottom: 0.75rem;
  border-left: 4px solid #1D3557; /* Navy */
  border-radius: 0 8px 8px 0;
  overflow: hidden;
  background-color: #FFFFFF;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
}

/* Accordion Header */
.montecito-accordion-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f4f8fd;
  padding: 1rem 1.25rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  position: relative;
  border-radius: 0 8px 8px 0;
}

.montecito-accordion-header:hover {
  background-color: #e6eef8;
}

.montecito-accordion-header:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(to right, rgba(71, 121, 181, 0.1), rgba(71, 121, 181, 0));
  opacity: 0;
  transition: opacity 0.2s ease;
}

.montecito-accordion-item.active .montecito-accordion-header:after {
  opacity: 1;
}

/* Accordion Title */
.montecito-accordion-title {
  font-family: 'Playfair Display', serif;
  font-weight: 500;
  font-size: 1.1rem;
  color: #1D3557; /* Navy */
}

/* Accordion Icon */
.montecito-accordion-icon {
  width: 24px;
  height: 24px;
  position: relative;
  transition: transform 0.3s ease;
}

.montecito-accordion-icon svg {
  width: 100%;
  height: 100%;
  fill: none;
  stroke: #1D3557; /* Navy */
  stroke-width: 2;
}

.montecito-accordion-item.active .montecito-accordion-icon {
  transform: rotate(180deg);
}

/* Accordion Content */
.montecito-accordion-content {
  padding: 0;
  height: 0;
  opacity: 0;
  overflow: hidden;
  transition: height 0.3s ease-in-out, opacity 0.3s ease, padding 0.2s ease;
}

.montecito-accordion-item.active .montecito-accordion-content {
  padding: 1.25rem;
  height: auto;
  max-height: 400px;
  overflow-y: auto;
  opacity: 1;
}

/* Content inside accordions */
.montecito-accordion-content p {
  margin-top: 0;
  line-height: 1.6;
  color: #333333;
}

.montecito-accordion-content h3 {
  font-family: 'Playfair Display', serif;
  color: #1D3557; /* Navy */
  margin-top: 0;
}

/* Category Grid */
.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.25rem;
  margin-top: 1rem;
}

.category-card {
  background-color: #F9F7F2; /* Cream */
  border-radius: 6px;
  padding: 1.25rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.category-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
}

.category-title {
  color: #1D3557; /* Navy */
  font-family: 'Playfair Display', serif;
  margin-top: 0;
  margin-bottom: 0.75rem;
  font-size: 1.1rem;
}

.divider {
  height: 2px;
  background-color: #4779B5; /* Mediterranean Blue */
  width: 50px;
  margin-bottom: 1rem;
}

/* Contact Button */
.montecito-contact-btn {
  margin: 1.5rem auto 0;
  display: block;
  padding: 0.75rem 1.5rem;
  background-color: #1D3557; /* Navy */
  color: white;
  border: none;
  border-radius: 4px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}

.montecito-contact-btn:hover {
  background-color: #4779B5; /* Mediterranean Blue */
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .montecito-modal-content {
    padding: 1.5rem;
    width: 95%;
  }
  
  .montecito-modal-title {
    font-size: 1.5rem;
  }
  
  .category-grid {
    grid-template-columns: 1fr;
  }
  
  .montecito-accordion-header {
    padding: 0.875rem 1rem;
  }
  
  .montecito-accordion-title {
    font-size: 1rem;
  }
  
  .montecito-accordion-item.active .montecito-accordion-content {
    max-height: 500px; /* Allow more space on mobile for scrolling */
  }
}
CSS_EOT

# 2. Create the JavaScript implementation
cat > ./public/js/montecito-modal.js << 'JS_EOT'
/**
 * Montecito Modal - Award-worthy modal and accordion implementation
 * Santa Barbara Chef Collective
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log("✨ Initializing Montecito Modal");
  
  // Step 1: Create the modal structure
  function createModalStructure() {
    // Extract content from existing modal
    const existingModal = document.querySelector('#explore-modal');
    const existingAccordions = document.querySelectorAll('.accordion-item');
    
    if (!existingModal || existingAccordions.length === 0) {
      console.error("❌ Could not find existing modal or accordions");
      return false;
    }
    
    // Create new modal container
    const newModal = document.createElement('div');
    newModal.id = 'montecito-modal';
    newModal.className = 'montecito-modal';
    newModal.setAttribute('role', 'dialog');
    newModal.setAttribute('aria-modal', 'true');
    newModal.setAttribute('aria-labelledby', 'montecito-modal-title');
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'montecito-modal-content';
    
    // Create close button
    const closeButton = document.createElement('button');
    closeButton.className = 'montecito-modal-close';
    closeButton.innerHTML = '&times;';
    closeButton.setAttribute('aria-label', 'Close modal');
    
    // Create title
    const title = document.createElement('h2');
    title.id = 'montecito-modal-title';
    title.className = 'montecito-modal-title';
    title.textContent = 'Explore Our Services';
    
    // Create accordion container
    const accordionContainer = document.createElement('div');
    accordionContainer.className = 'montecito-accordion-container';
    
    // Create new accordions
    existingAccordions.forEach(oldAccordion => {
      // Get the title and content
      const oldTitle = oldAccordion.querySelector('.accordion-title')?.textContent || 
                       oldAccordion.querySelector('h3')?.textContent || 
                       'Section';
      
      const oldContent = oldAccordion.querySelector('.accordion-content')?.innerHTML || '';
      
      // Create accordion item
      const accordionItem = document.createElement('div');
      accordionItem.className = 'montecito-accordion-item';
      accordionItem.id = oldAccordion.id + '-new' || 'accordion-' + Math.random().toString(36).substr(2, 9);
      
      // Create accordion header
      const accordionHeader = document.createElement('div');
      accordionHeader.className = 'montecito-accordion-header';
      accordionHeader.setAttribute('role', 'button');
      accordionHeader.setAttribute('aria-expanded', 'false');
      accordionHeader.setAttribute('aria-controls', accordionItem.id + '-content');
      accordionHeader.setAttribute('tabindex', '0');
      
      // Create accordion title
      const accordionTitle = document.createElement('span');
      accordionTitle.className = 'montecito-accordion-title';
      accordionTitle.textContent = oldTitle;
      
      // Create accordion icon
      const accordionIcon = document.createElement('span');
      accordionIcon.className = 'montecito-accordion-icon';
      accordionIcon.innerHTML = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 8L10 12L14 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      
      // Create accordion content
      const accordionContent = document.createElement('div');
      accordionContent.className = 'montecito-accordion-content';
      accordionContent.id = accordionItem.id + '-content';
      accordionContent.innerHTML = oldContent;
      accordionContent.setAttribute('role', 'region');
      accordionContent.setAttribute('aria-labelledby', accordionHeader.id);
      
      // Assemble accordion
      accordionHeader.appendChild(accordionTitle);
      accordionHeader.appendChild(accordionIcon);
      accordionItem.appendChild(accordionHeader);
      accordionItem.appendChild(accordionContent);
      
      // Add to container
      accordionContainer.appendChild(accordionItem);
    });
    
    // Create contact button (at the bottom of modal)
    const contactButton = document.createElement('button');
    contactButton.className = 'montecito-contact-btn';
    contactButton.textContent = 'Contact Us';
    
    // Assemble modal
    modalContent.appendChild(closeButton);
    modalContent.appendChild(title);
    modalContent.appendChild(accordionContainer);
    modalContent.appendChild(contactButton);
    newModal.appendChild(modalContent);
    
    // Add to body
    document.body.appendChild(newModal);
    
    return {
      modal: newModal,
      closeButton: closeButton,
      accordions: accordionContainer.querySelectorAll('.montecito-accordion-item'),
      contactButton: contactButton
    };
  }
  
  // Step 2: Setup event handlers
  function setupEventHandlers(elements) {
    const { modal, closeButton, accordions, contactButton } = elements;
    
    // Close button
    closeButton.addEventListener('click', function() {
      closeModal(modal);
    });
    
    // Close when clicking outside
    modal.addEventListener('click', function(event) {
      if (event.target === modal) {
        closeModal(modal);
      }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && modal.classList.contains('open')) {
        closeModal(modal);
      }
    });
    
    // Accordion click handlers
    accordions.forEach(accordion => {
      const header = accordion.querySelector('.montecito-accordion-header');
      const content = accordion.querySelector('.montecito-accordion-content');
      
      if (header && content) {
        header.addEventListener('click', function() {
          toggleAccordion(accordion);
        });
        
        // Keyboard support
        header.addEventListener('keydown', function(event) {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleAccordion(accordion);
          }
        });
      }
    });
    
    // Connect contact button to existing contact functionality
    const originalContactButton = document.getElementById('contact-us');
    if (originalContactButton && contactButton) {
      contactButton.addEventListener('click', function() {
        closeModal(modal);
        setTimeout(() => {
          originalContactButton.click();
        }, 300);
      });
    }
    
    // Connect explore buttons to new modal
    const exploreButtons = document.querySelectorAll('[data-modal="explore-modal"]');
    exploreButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        openModal(modal);
      });
    });
  }
  
  // Helper: Open modal
  function openModal(modal) {
    modal.style.display = 'flex';
    setTimeout(() => {
      modal.classList.add('open');
    }, 10);
    
    // Focus the first interactive element
    setTimeout(() => {
      const firstFocusable = modal.querySelector('button, [tabindex="0"]');
      if (firstFocusable) {
        firstFocusable.focus();
      }
    }, 300);
    
    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
  }
  
  // Helper: Close modal
  function closeModal(modal) {
    modal.classList.remove('open');
    setTimeout(() => {
      modal.style.display = 'none';
    }, 300);
    
    // Restore body scrolling
    document.body.style.overflow = '';
  }
  
  // Helper: Toggle accordion
  function toggleAccordion(accordion) {
    const isActive = accordion.classList.contains('active');
    const header = accordion.querySelector('.montecito-accordion-header');
    const content = accordion.querySelector('.montecito-accordion-content');
    
    // First close all other accordions
    const allAccordions = document.querySelectorAll('.montecito-accordion-item');
    allAccordions.forEach(item => {
      if (item !== accordion && item.classList.contains('active')) {
        item.classList.remove('active');
        const itemHeader = item.querySelector('.montecito-accordion-header');
        if (itemHeader) {
          itemHeader.setAttribute('aria-expanded', 'false');
        }
      }
    });
    
    // Then toggle this one
    if (!isActive) {
      accordion.classList.add('active');
      if (header) {
        header.setAttribute('aria-expanded', 'true');
      }
      
      // Set explicit height for animation
      if (content) {
        // Using scrollHeight allows for smooth transition to actual height
        const contentHeight = content.scrollHeight;
        content.style.height = `${contentHeight}px`;
        
        // Reset height to auto after transition to allow for content changes
        setTimeout(() => {
          content.style.height = 'auto';
        }, 300);
      }
    } else {
      if (content) {
        // Set explicit height before transition
        content.style.height = `${content.scrollHeight}px`;
        
        // Force reflow
        content.offsetHeight;
        
        // Set height to 0 for transition
        content.style.height = '0';
      }
      
      setTimeout(() => {
        accordion.classList.remove('active');
        if (header) {
          header.setAttribute('aria-expanded', 'false');
        }
      }, 10);
    }
  }
  
  // Initialize the modal
  const elements = createModalStructure();
  if (elements) {
    setupEventHandlers(elements);
    console.log("✅ Montecito Modal initialized");
  }
});
JS_EOT

# 3. Add links to HTML file
grep -q "montecito-modal.css" ./public/index.html || sed -i '' '/<\/head>/i \
    <link rel="stylesheet" href="css/montecito-modal.css">' ./public/index.html

grep -q "montecito-modal.js" ./public/index.html || sed -i '' '/<\/body>/i \
    <script src="js/montecito-modal.js"></script>' ./public/index.html

echo "=== Implementation complete ==="
echo "The new Montecito Modal has been created. Please refresh your browser to see the changes."
EOT

chmod +x ./new-modal-implementation.sh