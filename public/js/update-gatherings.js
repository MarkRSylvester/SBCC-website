/**
 * Update Gatherings & Celebrations content with complete content
 */
document.addEventListener('DOMContentLoaded', function() {
  const gatheringsAccordion = document.getElementById('gatherings-accordion');
  if (!gatheringsAccordion) return;
  
  const gatheringsContent = `
    <p class="section-intro">
      From intimate dinner parties to milestone celebrations, our chefs create custom menus that reflect your vision and delight your guests. We handle everything from menu planning to execution, allowing you to be fully present as a host.
    </p>
    
    <div class="category-grid">
      <!-- Dinner Parties -->
      <div class="category-card">
        <h4 class="category-title">Dinner Parties</h4>
        <div class="divider"></div>
        <ul class="event-list">
          <li>Fresh, colorful cooking with customized menu experiences</li>
          <li>Options for coursed meals or family-style serving</li>
          <li>All-inclusive service with shopping, preparation, cooking, and clean-up</li>
          <li>Pricing based on group size, starting at $155-$190 per person</li>
          <li>Perfect for birthdays, reunions, and special gatherings</li>
        </ul>
      </div>
      
      <!-- Date Night -->
      <div class="category-card">
        <h4 class="category-title">Date Night</h4>
        <div class="divider"></div>
        <ul class="event-list">
          <li>Exclusive dining experience perfect for couples</li>
          <li>Intimate table settings with candles and ambient touches</li>
          <li>Customized menu based on your preferences</li>
          <li>Expert wine pairing recommendations</li>
          <li>Turn your home into a private restaurant for a romantic evening</li>
          <li>Ideal for anniversaries, proposals, or simply quality time together</li>
        </ul>
      </div>
      
      <!-- Special Occasions -->
      <div class="category-card">
        <h4 class="category-title">Special Occasions</h4>
        <div class="divider"></div>
        <ul class="event-list">
          <li>Celebrations for birthdays, anniversaries, or achievements</li>
          <li>Menus tailored to honor the occasion</li>
          <li>Memorable culinary experiences from first toast to final dessert</li>
          <li>Personalized touches that make the day extraordinary</li>
        </ul>
      </div>
      
      <!-- Corporate Events -->
      <div class="category-card">
        <h4 class="category-title">Corporate Events</h4>
        <div class="divider"></div>
        <ul class="event-list">
          <li>Professional catering for business gatherings</li>
          <li>Executive lunches, client meetings, team celebrations</li>
          <li>Sophisticated experiences reflecting your company's standards</li>
          <li>Impressive presentations that elevate your business events</li>
        </ul>
      </div>
      
      <!-- Holiday Celebrations -->
      <div class="category-card">
        <h4 class="category-title">Holiday Celebrations</h4>
        <div class="divider"></div>
        <ul class="event-list">
          <li>Stress-free seasonal menus with professional service</li>
          <li>Perfect for Thanksgiving, Christmas, or any holiday tradition</li>
          <li>Allows hosts to relax and enjoy precious time with family and friends</li>
          <li>Traditional favorites with creative chef-inspired touches</li>
        </ul>
      </div>
      
      <!-- Milestone Celebrations -->
      <div class="category-card">
        <h4 class="category-title">Milestone Celebrations</h4>
        <div class="divider"></div>
        <ul class="event-list">
          <li>Honoring life's significant moments (graduations, retirements, promotions)</li>
          <li>Menus crafted to celebrate achievements and create lasting memories</li>
          <li>Thoughtful presentations that mark the importance of the occasion</li>
        </ul>
      </div>
      
      <!-- Additional categories from Google Doc -->
      <div class="category-card">
        <h4 class="category-title">Bridal Events</h4>
        <div class="divider"></div>
        <ul class="event-list">
          <li>Culinary experiences for pre and post-wedding celebrations</li>
          <li>Engagement parties, bridal showers, rehearsal dinners, post-wedding brunches</li>
          <li>Elegant execution for important wedding journey moments</li>
          <li>Beautiful presentations worthy of these once-in-a-lifetime occasions</li>
        </ul>
      </div>
      
      <div class="category-card">
        <h4 class="category-title">Cocktail Parties</h4>
        <div class="divider"></div>
        <ul class="event-list">
          <li>Chef-crafted hors d'oeuvres with custom cocktail pairings</li>
          <li>Beautiful presentation with inventive flavor combinations</li>
          <li>Perfect atmosphere for mingling and conversation</li>
          <li>Sophisticated bite-sized creations that impress guests</li>
        </ul>
      </div>
      
      <div class="category-card">
        <h4 class="category-title">Family Gatherings</h4>
        <div class="divider"></div>
        <ul class="event-list">
          <li>Thoughtfully prepared dishes that bring generations together</li>
          <li>Family-style service encouraging connection and conversation</li>
          <li>Menus honoring family culinary traditions while pleasing diverse palates</li>
          <li>Creating moments that strengthen family bonds through shared meals</li>
        </ul>
      </div>
      
      <div class="category-card">
        <h4 class="category-title">Wine Dinners</h4>
        <div class="divider"></div>
        <ul class="event-list">
          <li>Multi-course menus paired with curated wines</li>
          <li>Educational and sensory tasting journeys</li>
          <li>Chef and wine expert collaboration for harmonious pairings</li>
          <li>Opportunities to explore varietals and vintages from Santa Barbara County and beyond</li>
        </ul>
      </div>
      
      <div class="category-card">
        <h4 class="category-title">Al Fresco Dining</h4>
        <div class="divider"></div>
        <ul class="event-list">
          <li>Outdoor experiences celebrating Santa Barbara's natural beauty</li>
          <li>From beach picnics to garden parties</li>
          <li>Seasonal, locally-sourced ingredients in stunning settings</li>
          <li>Taking advantage of our region's perfect climate and magnificent landscapes</li>
        </ul>
      </div>
    </div>
  `;
  
  const contentDiv = gatheringsAccordion.querySelector('.accordion-content');
  if (contentDiv) {
    contentDiv.innerHTML = gatheringsContent;
  }
});
