console.log("Add Signature Meal script loaded");
document.addEventListener('DOMContentLoaded', function() {
  // Wait for everything else to load
  setTimeout(function() {
    console.log("Attempting to add Signature Meal accordion");
    
    // Define HTML for the new accordion
    var signatureMealHTML = `
    <div class="accordion-item" id="signature-meal-accordion">
      <div class="accordion-header">
        <h3>Signature Meal Program</h3>
        <div class="accordion-icon"></div>
      </div>
      <div class="accordion-content">
        <p class="section-intro">Transform your everyday dining with chef-crafted meals delivered to your home on a schedule that suits your lifestyle. Our Signature Meal Program brings the expertise of Santa Barbara's finest culinary artists to your family table without the planning, shopping, or preparation.</p>
        
        <div class="category-grid">
          <div class="category-card">
            <h4 class="category-title">Personalized Menus</h4>
            <div class="divider"></div>
            <ul class="event-list">
              <li>Tailored to your household's preferences, dietary needs, and schedule</li>
              <li>Customized to match your taste preferences</li>
              <li>Adaptable for different family members' needs</li>
              <li>Rotating seasonal specialties to keep meals exciting</li>
            </ul>
          </div>
          
          <div class="category-card">
            <h4 class="category-title">Seasonal Ingredients</h4>
            <div class="divider"></div>
            <ul class="event-list">
              <li>Fresh, locally-sourced produce and premium ingredients</li>
              <li>Menu options that change with the seasons</li>
              <li>Support for local farmers and producers</li>
              <li>Peak-of-freshness flavors that elevate everyday dining</li>
            </ul>
          </div>
        </div>
        
        <div class="category-grid">
          <div class="category-card">
            <h4 class="category-title">Flexible Scheduling</h4>
            <div class="divider"></div>
            <ul class="event-list">
              <li>Choose from 2, 3, or 5 meals per week</li>
              <li>Easy adjustments as your needs change</li>
              <li>Consistent delivery on your preferred days</li>
              <li>Pause or modify service around travel plans</li>
            </ul>
          </div>
          
          <div class="category-card">
            <h4 class="category-title">Dietary Accommodations</h4>
            <div class="divider"></div>
            <ul class="event-list">
              <li>Skilled preparation for various dietary needs</li>
              <li>Clear labeling of allergens and dietary compliance</li>
              <li>Specialized chef matching based on your requirements</li>
              <li>No compromise on flavor, regardless of dietary restrictions</li>
            </ul>
          </div>
        </div>
        
        <div class="category-grid">
          <div class="category-card">
            <h4 class="category-title">Convenience Features</h4>
            <div class="divider"></div>
            <ul class="event-list">
              <li>Ready to heat and serve meals</li>
              <li>Chef's notes on presentation and optional finishing touches</li>
              <li>No planning, shopping, or preparation required</li>
              <li>Pre-prepared meals that maintain restaurant quality</li>
              <li>Elegant packaging that minimizes environmental impact</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    `;
    
    // Find the position to insert - after Beyond the Table and before Culinary Experiences or FAQ
    var beyondTable = document.getElementById('beyond-table-accordion');
    var culinaryExperiences = document.getElementById('culinary-experiences-accordion');
    var faq = document.getElementById('faq-accordion');
    
    // Find which element to insert the new accordion before
    var insertBefore = culinaryExperiences || faq;
    
    if (beyondTable && insertBefore) {
      console.log("Found appropriate insertion points");
      
      // Check if signature meal accordion already exists
      if (!document.getElementById('signature-meal-accordion')) {
        console.log("Creating temporary container");
        var temp = document.createElement('div');
        temp.innerHTML = signatureMealHTML.trim();
        
        console.log("Inserting signature meal accordion");
        beyondTable.parentNode.insertBefore(temp.firstChild, insertBefore);
        
        console.log("Added signature meal accordion successfully");
        
        // Reinitialize the accordion behavior
        var header = document.querySelector('#signature-meal-accordion .accordion-header');
        if (header) {
          header.addEventListener('click', function() {
            var accordionItem = this.closest('.accordion-item');
            accordionItem.classList.toggle('active');
            accordionItem.classList.toggle('open');
            
            var content = accordionItem.querySelector('.accordion-content');
            if (content) {
              if (accordionItem.classList.contains('active') || accordionItem.classList.contains('open')) {
                content.style.display = 'block';
                content.style.height = 'auto';
                content.style.maxHeight = '80vh';
                content.style.opacity = '1';
                content.style.visibility = 'visible';
                content.style.overflow = 'auto';
                content.style.padding = '20px';
              } else {
                content.style.display = 'none';
                content.style.height = '0';
                content.style.maxHeight = '0';
                content.style.opacity = '0';
                content.style.visibility = 'hidden';
                content.style.overflow = 'hidden';
                content.style.padding = '0';
              }
            }
          });
        }
      } else {
        console.log("Signature meal accordion already exists");
      }
    } else {
      console.log("Could not find appropriate insertion points");
      console.log("Beyond Table:", !!beyondTable);
      console.log("Insert Before:", !!insertBefore);
    }
  }, 1500); // Wait 1.5 seconds for everything else to load
});
