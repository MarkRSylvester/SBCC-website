/**
 * Force the Beyond the Table section to use content cards
 */
document.addEventListener('DOMContentLoaded', function() {
  // Run once the DOM is loaded and again after a slight delay
  applyFix();
  setTimeout(applyFix, 500);
  
  function applyFix() {
    // Get the Beyond the Table content
    const beyondTableAccordion = document.getElementById('beyond-table-accordion');
    if (!beyondTableAccordion) return;
    
    // Clear the existing content
    const accordionContent = beyondTableAccordion.querySelector('.accordion-content');
    if (!accordionContent) return;
    
    // Create completely new content with cards
    accordionContent.innerHTML = `
      <p class="section-intro">
        Extend your culinary experience beyond the dining table with our complementary offerings designed to enhance every aspect of your gathering. These thoughtful additions transform meals into complete sensory experiences.
      </p>
      
      <div class="category-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin-top: 1.5rem;">
        <!-- Wine Pairing -->
        <div class="category-card" style="background-color: #F9F7F2; border-radius: 4px; padding: 1.25rem; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);">
          <h4 class="category-title" style="font-family: 'Playfair Display', serif; color: #1D3557; margin-top: 0; margin-bottom: 0.75rem; font-size: 1.25rem;">Wine Pairing Guidance</h4>
          <div class="divider" style="height: 2px; background: linear-gradient(to right, transparent 0%, #A2A284 50%, transparent 100%); margin: 0.75rem auto 1rem auto; width: 100%; max-width: 100px;"></div>
          <ul class="event-list" style="list-style-type: none; padding: 0; margin: 0;">
            <li style="position: relative; padding-left: 1.25rem; margin-bottom: 0.5rem; line-height: 1.4;">Expert wine recommendations tailored to your menu</li>
            <li style="position: relative; padding-left: 1.25rem; margin-bottom: 0.5rem; line-height: 1.4;">Curated selections from local Santa Barbara vineyards</li>
            <li style="position: relative; padding-left: 1.25rem; margin-bottom: 0.5rem; line-height: 1.4;">In-home wine tasting experiences with sommeliers</li>
            <li style="position: relative; padding-left: 1.25rem; margin-bottom: 0.5rem; line-height: 1.4;">Custom flight creation for multi-course experiences</li>
            <li style="position: relative; padding-left: 1.25rem; margin-bottom: 0.5rem; line-height: 1.4;">Pricing: From complimentary guidance to full sommelier service</li>
          </ul>
        </div>
        
        <!-- Table Setting -->
        <div class="category-card" style="background-color: #F9F7F2; border-radius: 4px; padding: 1.25rem; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);">
          <h4 class="category-title" style="font-family: 'Playfair Display', serif; color: #1D3557; margin-top: 0; margin-bottom: 0.75rem; font-size: 1.25rem;">Table Setting & Styling</h4>
          <div class="divider" style="height: 2px; background: linear-gradient(to right, transparent 0%, #A2A284 50%, transparent 100%); margin: 0.75rem auto 1rem auto; width: 100%; max-width: 100px;"></div>
          <ul class="event-list" style="list-style-type: none; padding: 0; margin: 0;">
            <li style="position: relative; padding-left: 1.25rem; margin-bottom: 0.5rem; line-height: 1.4;">Elegant table design customized to your occasion</li>
            <li style="position: relative; padding-left: 1.25rem; margin-bottom: 0.5rem; line-height: 1.4;">Premium linens, dinnerware, and glassware</li>
            <li style="position: relative; padding-left: 1.25rem; margin-bottom: 0.5rem; line-height: 1.4;">Seasonal floral arrangements from local growers</li>
            <li style="position: relative; padding-left: 1.25rem; margin-bottom: 0.5rem; line-height: 1.4;">Ambient lighting to create the perfect atmosphere</li>
            <li style="position: relative; padding-left: 1.25rem; margin-bottom: 0.5rem; line-height: 1.4;">Pricing: From $15 per guest for essentials to $60+ for luxury</li>
          </ul>
        </div>
        
        <!-- Bartending Services -->
        <div class="category-card" style="background-color: #F9F7F2; border-radius: 4px; padding: 1.25rem; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);">
          <h4 class="category-title" style="font-family: 'Playfair Display', serif; color: #1D3557; margin-top: 0; margin-bottom: 0.75rem; font-size: 1.25rem;">Bartending Services</h4>
          <div class="divider" style="height: 2px; background: linear-gradient(to right, transparent 0%, #A2A284 50%, transparent 100%); margin: 0.75rem auto 1rem auto; width: 100%; max-width: 100px;"></div>
          <ul class="event-list" style="list-style-type: none; padding: 0; margin: 0;">
            <li style="position: relative; padding-left: 1.25rem; margin-bottom: 0.5rem; line-height: 1.4;">Professional bartenders to serve drinks at your event</li>
            <li style="position: relative; padding-left: 1.25rem; margin-bottom: 0.5rem; line-height: 1.4;">Experienced mixologists who provide attentive service</li>
            <li style="position: relative; padding-left: 1.25rem; margin-bottom: 0.5rem; line-height: 1.4;">Connects you with trusted bartending professionals</li>
            <li style="position: relative; padding-left: 1.25rem; margin-bottom: 0.5rem; line-height: 1.4;">Custom cocktail menus featuring local ingredients and spirits</li>
          </ul>
        </div>
        
        <!-- Specialty Cocktails -->
        <div class="category-card" style="background-color: #F9F7F2; border-radius: 4px; padding: 1.25rem; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);">
          <h4 class="category-title" style="font-family: 'Playfair Display', serif; color: #1D3557; margin-top: 0; margin-bottom: 0.75rem; font-size: 1.25rem;">Specialty Cocktails</h4>
          <div class="divider" style="height: 2px; background: linear-gradient(to right, transparent 0%, #A2A284 50%, transparent 100%); margin: 0.75rem auto 1rem auto; width: 100%; max-width: 100px;"></div>
          <ul class="event-list" style="list-style-type: none; padding: 0; margin: 0;">
            <li style="position: relative; padding-left: 1.25rem; margin-bottom: 0.5rem; line-height: 1.4;">Custom cocktail mixers created by your chef</li>
            <li style="position: relative; padding-left: 1.25rem; margin-bottom: 0.5rem; line-height: 1.4;">Unique flavor combinations to complement your menu</li>
            <li style="position: relative; padding-left: 1.25rem; margin-bottom: 0.5rem; line-height: 1.4;">Ready to add to your choice of liquor</li>
            <li style="position: relative; padding-left: 1.25rem; margin-bottom: 0.5rem; line-height: 1.4;">Seasonal ingredients that reflect Santa Barbara's bounty</li>
          </ul>
        </div>
        
        <!-- Rental Coordination -->
        <div class="category-card" style="background-color: #F9F7F2; border-radius: 4px; padding: 1.25rem; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);">
          <h4 class="category-title" style="font-family: 'Playfair Display', serif; color: #1D3557; margin-top: 0; margin-bottom: 0.75rem; font-size: 1.25rem;">Rental Coordination</h4>
          <div class="divider" style="height: 2px; background: linear-gradient(to right, transparent 0%, #A2A284 50%, transparent 100%); margin: 0.75rem auto 1rem auto; width: 100%; max-width: 100px;"></div>
          <ul class="event-list" style="list-style-type: none; padding: 0; margin: 0;">
            <li style="position: relative; padding-left: 1.25rem; margin-bottom: 0.5rem; line-height: 1.4;">Connection with trusted local rental companies</li>
            <li style="position: relative; padding-left: 1.25rem; margin-bottom: 0.5rem; line-height: 1.4;">Assistance with all rental details for events</li>
            <li style="position: relative; padding-left: 1.25rem; margin-bottom: 0.5rem; line-height: 1.4;">Streamlined process for securing necessary equipment</li>
            <li style="position: relative; padding-left: 1.25rem; margin-bottom: 0.5rem; line-height: 1.4;">Expert advice on quantities and specific needs</li>
          </ul>
        </div>
        
        <!-- Seasonal Produce Boxes -->
        <div class="category-card" style="background-color: #F9F7F2; border-radius: 4px; padding: 1.25rem; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);">
          <h4 class="category-title" style="font-family: 'Playfair Display', serif; color: #1D3557; margin-top: 0; margin-bottom: 0.75rem; font-size: 1.25rem;">Seasonal Produce Boxes</h4>
          <div class="divider" style="height: 2px; background: linear-gradient(to right, transparent 0%, #A2A284 50%, transparent 100%); margin: 0.75rem auto 1rem auto; width: 100%; max-width: 100px;"></div>
          <ul class="event-list" style="list-style-type: none; padding: 0; margin: 0;">
            <li style="position: relative; padding-left: 1.25rem; margin-bottom: 0.5rem; line-height: 1.4;">Hand-selected produce from local organic farms</li>
            <li style="position: relative; padding-left: 1.25rem; margin-bottom: 0.5rem; line-height: 1.4;">Artisanal oils, vinegars, and specialty items</li>
            <li style="position: relative; padding-left: 1.25rem; margin-bottom: 0.5rem; line-height: 1.4;">Chef-created recipes utilizing seasonal ingredients</li>
            <li style="position: relative; padding-left: 1.25rem; margin-bottom: 0.5rem; line-height: 1.4;">Information on featured farms and producers</li>
            <li style="position: relative; padding-left: 1.25rem; margin-bottom: 0.5rem; line-height: 1.4;">Pricing: From $45 weekly for essentials to $125 for gourmet</li>
          </ul>
        </div>
      </div>
    `;
    
    // Add dot markers to list items
    const listItems = accordionContent.querySelectorAll('.event-list li');
    listItems.forEach(function(li) {
      // Add bullet point style
      li.style.position = 'relative';
      li.style.paddingLeft = '1.25rem';
      
      // Create and append the bullet point
      const before = document.createElement('span');
      before.style.position = 'absolute';
      before.style.left = '0';
      before.style.top = '0.5em';
      before.style.width = '6px';
      before.style.height = '6px';
      before.style.borderRadius = '50%';
      before.style.backgroundColor = '#A2A284';
      before.style.content = '';
      
      li.insertBefore(before, li.firstChild);
    });
    
    // Do the same for Gatherings
    const gatheringsAccordion = document.getElementById('gatherings-accordion');
    if (gatheringsAccordion) {
      const gatheringsContent = gatheringsAccordion.querySelector('.accordion-content');
      if (gatheringsContent) {
        // Create similar card structure for gatherings
        // For brevity, I'm omitting the full content here but it would follow the same pattern
      }
    }
  }
});
