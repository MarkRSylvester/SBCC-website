document.addEventListener('DOMContentLoaded', function() {
  // Wait for modal to be fully loaded before manipulating
  const modalOpenButton = document.querySelector('[data-modal="explore"]');
  
  if (modalOpenButton) {
    modalOpenButton.addEventListener('click', function() {
      // Wait for modal to open
      setTimeout(setupAccordions, 500);
    });
  }
  
  function setupAccordions() {
    // Find the modal content
    const modalContent = document.querySelector('#explore-modal .modal-content');
    if (!modalContent) {
      return;
    }
    
    // Find the Our Story accordion (our reference point)
    const ourStoryAccordion = document.querySelector('#our-story-accordion');
    if (!ourStoryAccordion) {
      return;
    }
    
    // Remove any test accordions or elements
    const testElements = modalContent.querySelectorAll(
      '#our-chefs-accordion, .test-element, [style*="red"], [style*="yellow"], [style*="blue"]'
    );
    
    testElements.forEach(element => {
      element.parentNode.removeChild(element);
    });
    
    // Define all the accordions we want to add
    const accordionsToAdd = [
      {
        id: 'our-chefs-accordion',
        title: 'The Chefs',
        content: `
          <p class="section-intro">Our curated selection of Santa Barbara's finest culinary artists brings world-class skill to your table.</p>
          <div class="chef-grid">
            <div class="chef-card">
              <h4>Mediterranean Specialists</h4>
              <p>Chefs with extensive experience in coastal Mediterranean cuisines, from Spanish tapas to Greek mezze to Southern Italian seafood traditions.</p>
            </div>
            <div class="chef-card">
              <h4>Farm-to-Table Experts</h4>
              <p>Chefs who specialize in hyperlocal, seasonal cooking that showcases the bounty of Santa Barbara's farms, orchards, and vineyards.</p>
            </div>
            <div class="chef-card">
              <h4>Global Fusion Artists</h4>
              <p>Chefs trained in multiple culinary traditions who create innovative dishes blending techniques and flavors from diverse cultures.</p>
            </div>
            <div class="chef-card">
              <h4>Plant-Based Innovators</h4>
              <p>Chefs dedicated to crafting vibrant, satisfying plant-forward meals that celebrate vegetables in creative and unexpected ways.</p>
            </div>
          </div>
        `
      },
      {
        id: 'our-menus-accordion',
        title: 'The Menus',
        content: `
          <p class="section-intro">Our menus are fully customizable, but we've created these popular collections to inspire your culinary journey.</p>
          <div class="menu-grid">
            <div class="menu-card">
              <h4>Coastal Mediterranean</h4>
              <p>Bright flavors inspired by the sea-kissed cultures of Greece, Southern Italy, and the Spanish coast. Features local seafood, vibrant vegetables, and sun-drenched herbs.</p>
            </div>
            <div class="menu-card">
              <h4>Santa Barbara Harvest</h4>
              <p>A celebration of our region's bounty, with locally-sourced ingredients from farmers, fishers, and foragers. Menus change with the seasons to highlight the freshest offerings.</p>
            </div>
            <div class="menu-card">
              <h4>Global Exploration</h4>
              <p>An adventure for the palate featuring perfectly executed dishes from various world cuisines, from Japanese izakaya fare to Moroccan tagines to French classics.</p>
            </div>
            <div class="menu-card">
              <h4>Plant-Forward Feast</h4>
              <p>Vegetable-centered dining that satisfies and surprises, with options ranging from completely plant-based to flexitarian with thoughtful seafood or meat accents.</p>
            </div>
          </div>
        `
      }
    ];
    
    // Add each accordion after the Our Story accordion
    let previousAccordion = ourStoryAccordion;
    
    accordionsToAdd.forEach(accordionData => {
      // Check if it already exists
      const existing = document.getElementById(accordionData.id);
      if (existing) {
        previousAccordion = existing;
        return;
      }
      
      // Create new accordion
      const accordion = document.createElement('div');
      accordion.className = 'accordion-item';
      accordion.id = accordionData.id;
      
      accordion.innerHTML = `
        <div class="accordion-header">
          <h3>${accordionData.title}</h3>
          <div class="accordion-icon">+</div>
        </div>
        <div class="accordion-content">
          ${accordionData.content}
        </div>
      `;
      
      // Insert after the previous accordion
      previousAccordion.parentNode.insertBefore(accordion, previousAccordion.nextSibling);
      
      // Update previous accordion reference
      previousAccordion = accordion;
    });
    
    // Reinitialize accordion functionality
    
    // Use the existing accordion script logic to handle clicks
    document.querySelectorAll('#explore-modal .accordion-header').forEach(header => {
      // Remove existing listeners by cloning
      const newHeader = header.cloneNode(true);
      if (header.parentNode) {
        header.parentNode.replaceChild(newHeader, header);
        
        // Add click handler
        newHeader.addEventListener('click', function() {
          const accordionItems = document.querySelectorAll('#explore-modal .accordion-item');
          const clickedItem = this.closest('.accordion-item');
          const isOpen = clickedItem.classList.contains('active');
          
          // Close all accordions
          accordionItems.forEach(item => {
            item.classList.remove('active', 'open');
            const content = item.querySelector('.accordion-content');
            if (content) {
              content.style.display = 'none';
              content.style.maxHeight = '0';
              content.style.padding = '0';
            }
            
            const icon = item.querySelector('.accordion-icon');
            if (icon) {
              icon.style.transform = 'rotate(0)';
            }
          });
          
          // If the clicked item wasn't already open, open it
          if (!isOpen) {
            clickedItem.classList.add('active', 'open');
            
            const content = clickedItem.querySelector('.accordion-content');
            if (content) {
              content.style.display = 'block';
              content.style.maxHeight = '500px';
              content.style.padding = '20px';
            }
            
            const icon = clickedItem.querySelector('.accordion-icon');
            if (icon) {
              icon.style.transform = 'rotate(180deg)';
            }
          }
        });
      }
    });
  }
  
  // Also run on page load in case modal is already open
  setTimeout(setupAccordions, 1000);
}); 