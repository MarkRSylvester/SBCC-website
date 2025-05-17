console.log("Chefs script loaded");
document.addEventListener('DOMContentLoaded', function() {
  var chefsContent = document.querySelector('#our-chefs-accordion .accordion-content');
  
  if (chefsContent) {
    chefsContent.innerHTML = `
      <p class="section-intro">Our community of talented chefs brings diverse culinary backgrounds and specialties to your table. Each chef is personally vetted for their expertise, creativity, and genuine love of hospitality.</p>
      
      <div class="chef-grid">
        <div class="chef-card">
          <div class="chef-image">
            <div class="placeholder-image"></div>
          </div>
          <h3 class="chef-name">Chef Michael</h3>
          <p class="chef-specialty">California Coastal Cuisine</p>
          <p class="chef-bio">Specializing in fresh, sustainable seafood and seasonal produce from local farmers markets.</p>
        </div>
        
        <div class="chef-card">
          <div class="chef-image">
            <div class="placeholder-image"></div>
          </div>
          <h3 class="chef-name">Chef Isabella</h3>
          <p class="chef-specialty">Mediterranean Fusion</p>
          <p class="chef-bio">Blending traditional Mediterranean techniques with Santa Barbara's finest ingredients.</p>
        </div>
        
        <div class="chef-card">
          <div class="chef-image">
            <div class="placeholder-image"></div>
          </div>
          <h3 class="chef-name">Chef Thomas</h3>
          <p class="chef-specialty">Farm-to-Table</p>
          <p class="chef-bio">Creating memorable dining experiences with hyperlocal ingredients and French training.</p>
        </div>
      </div>
      
      <div class="section-divider"></div>
      
      <div class="dynamic-content-note">
        <p>Our full chef roster will be available soon, featuring detailed profiles, specialties, and sample menus from each of our culinary artists.</p>
      </div>
    `;
  }
});
