console.log("Culinary Experiences script loaded - NEW");
document.addEventListener('DOMContentLoaded', function() {
  console.log("Culinary Experiences DOM loaded");

  // Find the accordion container
  var accordionContainer = document.querySelector('.accordion-container');
  console.log("Accordion container found:", !!accordionContainer);

  if (accordionContainer) {
    // Check if our accordion already exists
    var existingAccordion = document.getElementById('culinary-experiences-accordion');
    
    if (!existingAccordion) {
      console.log("Creating new Culinary Experiences accordion");
      
      // Create the new accordion item
      var newAccordion = document.createElement('div');
      newAccordion.className = 'accordion-item';
      newAccordion.id = 'culinary-experiences-accordion';
      
      newAccordion.innerHTML = `
        <div class="accordion-header">
          <h3>Culinary Experiences</h3>
          <div class="accordion-icon"></div>
        </div>
        <div class="accordion-content"></div>
      `;
      
      // Add it to the container - at the end, before the FAQ accordion
      var faqAccordion = document.getElementById('faq-accordion');
      
      if (faqAccordion) {
        console.log("Inserting before FAQ accordion");
        accordionContainer.insertBefore(newAccordion, faqAccordion);
      } else {
        console.log("Appending to accordion container");
        accordionContainer.appendChild(newAccordion);
      }
      
      console.log("Created Culinary Experiences accordion");
    } else {
      console.log("Culinary Experiences accordion already exists");
    }
  } else {
    console.log("Could not find accordion container");
  }
  
  // Now find and update the content
  var expContent = document.querySelector('#culinary-experiences-accordion .accordion-content');
  console.log("Content element found:", !!expContent);
  
  if (expContent) {
    expContent.innerHTML = `
      <p class="section-intro">Hands-on cooking instruction customized to your interests and skill level, led by our expert chefs in the comfort of your home or rental. These immersive experiences blend education with enjoyment, leaving you with skills that last a lifetime.</p>
      
      <div class="category-grid">
        <div class="category-card">
          <h4 class="category-title">Format Options</h4>
          <div class="divider"></div>
          <ul class="event-list">
            <li>One-on-one personal instruction</li>
            <li>Group classes for friends, family, or team-building</li>
            <li>Market tours featuring Santa Barbara's stunning farmers markets</li>
            <li>Specialized technique workshops</li>
          </ul>
        </div>
        
        <div class="category-card">
          <h4 class="category-title">Features</h4>
          <div class="divider"></div>
          <ul class="event-list">
            <li>Professional culinary methods and chef shortcuts</li>
            <li>Ingredient selection guidance</li>
            <li>Recipe packets to recreate dishes at home</li>
            <li>Focus sessions on specific techniques or cuisines</li>
            <li>Custom menus based on your skill level and interests</li>
            <li>Wine or cocktail pairings to complement the cooking experience</li>
          </ul>
        </div>
      </div>
      
      <div class="category-grid">
        <div class="category-card">
          <h4 class="category-title">Benefits</h4>
          <div class="divider"></div>
          <ul class="event-list">
            <li>Elevate your kitchen confidence</li>
            <li>Learn to create restaurant-quality dishes</li>
            <li>Understand the philosophy behind great cooking</li>
            <li>Connect with local ingredients and producers</li>
            <li>Create memorable experiences with loved ones</li>
            <li>Develop a deeper appreciation for culinary arts</li>
          </ul>
        </div>
        
        <div class="category-card">
          <h4 class="category-title">Pricing</h4>
          <div class="divider"></div>
          <p>Our culinary experiences start at $75 for basic sessions and range up to $275 for comprehensive experiences with market tours. Each experience is customized to your specific interests and skill level.</p>
        </div>
      </div>
    `;
    console.log("Updated Culinary Experiences content");
  } else {
    console.log("Could not find Culinary Experiences content element");
  }
});
