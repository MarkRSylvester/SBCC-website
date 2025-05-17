console.log("Menus script loaded");
document.addEventListener('DOMContentLoaded', function() {
  var menusContent = document.querySelector('#our-menus-accordion .accordion-content');
  
  if (menusContent) {
    menusContent.innerHTML = `
      <p class="section-intro">From Mediterranean-inspired feasts to farm-to-table California cuisine, our diverse menu offerings can be customized to match your preferences and occasion. Our chefs source the finest local ingredients to create memorable dining experiences.</p>
      
      <div class="menu-categories">
        <div class="menu-category">
          <div class="menu-header">
            <h3>Farm to Table</h3>
            <div class="menu-accent" style="background-color: #aee0a1;"></div>
          </div>
          <p>Celebrating the freshest seasonal produce from Santa Barbara County farms with emphasis on sustainable ingredients and vibrant flavors.</p>
        </div>
        
        <div class="menu-category">
          <div class="menu-header">
            <h3>Coastal Mediterranean</h3>
            <div class="menu-accent" style="background-color: #a8caff;"></div>
          </div>
          <p>Inspired by the coastal cuisines of Spain, France, Italy, and Greece, featuring fresh seafood and local California ingredients.</p>
        </div>
        
        <div class="menu-category">
          <div class="menu-header">
            <h3>Mexican Heritage</h3>
            <div class="menu-accent" style="background-color: #f8caa5;"></div>
          </div>
          <p>Authentic regional Mexican cuisine highlighting traditional techniques, housemade tortillas, and vibrant, complex moles and salsas.</p>
        </div>
        
        <div class="menu-category">
          <div class="menu-header">
            <h3>Asian Fusion</h3>
            <div class="menu-accent" style="background-color: #caf2e6;"></div>
          </div>
          <p>Creative combinations of Japanese, Korean, and Southeast Asian flavors using local California ingredients and traditional techniques.</p>
        </div>
      </div>
      
      <div class="section-divider"></div>
      
      <div class="dynamic-content-note">
        <p>Our complete menu collection will be available soon, featuring detailed descriptions, seasonal specialties, and sample menus from each culinary category.</p>
      </div>
    `;
  }
});
