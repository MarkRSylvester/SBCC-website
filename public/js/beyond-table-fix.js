// CSS to fix the Beyond the Table accordion structure
const fixBeyondTableCSS = `
/* Beyond the Table specific fixes */

/* Ensure the accordion content has proper overflow handling */
#beyond-table-accordion .accordion-content {
  max-height: 600px;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: thin;
  scrollbar-color: #A2A284 #f3f7ff;
  padding: 0 !important;
  position: relative;
}

/* Fixed header that stays in place when scrolling */
#beyond-table-accordion .fixed-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #f3f7ff;
  padding: 1.5rem 2rem 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* Style the intro text */
#beyond-table-accordion .section-intro {
  text-align: center;
  margin-bottom: 1.5rem;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  line-height: 1.7;
  color: #333333;
}

/* Style the category navigation bubbles */
#beyond-table-accordion .service-categories {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 0.5rem;
}

#beyond-table-accordion .category-tab {
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

#beyond-table-accordion .category-tab:hover {
  background-color: rgba(29, 53, 87, 0.1);
}

#beyond-table-accordion .category-tab.active {
  background-color: #1D3557;
  color: white;
}

/* Scrollable content area */
#beyond-table-accordion .scrollable-content {
  padding: 0 2rem 2rem;
}

/* Service sections */
#beyond-table-accordion .service-section {
  display: none;
}

#beyond-table-accordion .service-section.active {
  display: block;
  animation: fadeIn 0.5s ease;
}

/* Custom scrollbar styling */
#beyond-table-accordion .accordion-content::-webkit-scrollbar {
  width: 8px;
}

#beyond-table-accordion .accordion-content::-webkit-scrollbar-track {
  background: #f3f7ff;
  border-radius: 10px;
}

#beyond-table-accordion .accordion-content::-webkit-scrollbar-thumb {
  background-color: #A2A284;
  border-radius: 10px;
  border: 2px solid #f3f7ff;
}

#beyond-table-accordion .accordion-content::-webkit-scrollbar-thumb:hover {
  background-color: #8a8a70;
}

/* Animation for the service cards */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Fix for mobile view */
@media (max-width: 768px) {
  #beyond-table-accordion .fixed-header {
    padding: 1rem 1.5rem 0.75rem;
  }
  
  #beyond-table-accordion .scrollable-content {
    padding: 0 1.5rem 1.5rem;
  }
  
  #beyond-table-accordion .category-tab {
    font-size: 12px;
    padding: 6px 12px;
  }
}
`;

// Fix the Beyond the Table accordion
document.addEventListener('DOMContentLoaded', function() {
  // Wait for everything to load
  setTimeout(fixBeyondTableAccordion, 800);
});

function fixBeyondTableAccordion() {
  // Get the Beyond the Table accordion
  const beyondTableAccordion = document.getElementById('beyond-table-accordion');
  
  if (!beyondTableAccordion) return;
  
  // Add the CSS styles
  const styleElement = document.createElement('style');
  styleElement.textContent = fixBeyondTableCSS;
  document.head.appendChild(styleElement);
  
  // Get the accordion content
  const accordionContent = beyondTableAccordion.querySelector('.accordion-content');
  if (!accordionContent) return;
  
  // Remove any existing service-categories to prevent duplicates
  const existingCategories = accordionContent.querySelectorAll('.service-categories');
  existingCategories.forEach(el => el.remove());
  
  // Save the original content before replacing
  const originalContent = accordionContent.innerHTML;
  
  // Extract the intro text
  let introText = "Extend your culinary experience beyond the dining table with our comprehensive suite of complementary offerings designed to enhance every aspect of your gathering.";
  
  // Try to extract the intro text from the original content
  const introMatch = originalContent.match(/<p[^>]*>(Extend your culinary experience[^<]+)<\/p>/i);
  if (introMatch && introMatch[1]) {
    introText = introMatch[1].trim();
  }
  
  // Create the new structure with fixed header
  accordionContent.innerHTML = `
    <div class="fixed-header">
      <p class="section-intro">
        ${introText}
      </p>
      <div class="service-categories">
        <button class="category-tab active" data-category="culinary">Culinary Enhancements</button>
        <button class="category-tab" data-category="dining">Dining Environment</button>
        <button class="category-tab" data-category="educational">Educational Experiences</button>
        <button class="category-tab" data-category="specialty">Specialty Services</button>
      </div>
    </div>
    <div class="scrollable-content">
      <!-- Culinary Enhancements Section -->
      <div class="service-section active" data-category="culinary">
        <div class="category-grid">
          <!-- Wine Pairing -->
          <div class="category-card" data-card-category="wine">
            <h4 class="category-title">Wine Pairing Guidance</h4>
            <div class="divider"></div>
            <ul class="event-list">
              <li>Expert wine recommendations tailored to your menu</li>
              <li>Curated selections from local Santa Barbara vineyards</li>
              <li>In-home wine tasting experiences with sommeliers</li>
              <li>Custom flight creation for multi-course experiences</li>
              <li>Pricing: From complimentary guidance to full sommelier service</li>
            </ul>
            <div class="expand-button">
              <span>Show More</span>
              <span class="expand-icon">▼</span>
            </div>
          </div>
          
          <!-- Craft Cocktail Service -->
          <div class="category-card" data-card-category="cocktail">
            <h4 class="category-title">Craft Cocktail Service</h4>
            <div class="divider"></div>
            <ul class="event-list">
              <li>Personalized signature cocktail development</li>
              <li>Professional mixologists for on-site preparation</li>
              <li>Locally-sourced artisanal ingredients and spirits</li>
              <li>Non-alcoholic craft beverage options</li>
              <li>Pricing: From $15 per person, plus mixologist fee</li>
            </ul>
            <div class="expand-button">
              <span>Show More</span>
              <span class="expand-icon">▼</span>
            </div>
          </div>

          <!-- Menu Customization -->
          <div class="category-card" data-card-category="menu">
            <h4 class="category-title">Custom Menu Development</h4>
            <div class="divider"></div>
            <ul class="event-list">
              <li>Bespoke menu creation beyond our standard offerings</li>
              <li>Heritage recipe adaptation from family cookbooks</li>
              <li>Themed menu conceptualization for special occasions</li>
              <li>Multiple consultation sessions with your chef</li>
              <li>Pricing: From $150 for custom menu development</li>
            </ul>
            <div class="expand-button">
              <span>Show More</span>
              <span class="expand-icon">▼</span>
            </div>
          </div>

          <!-- Specialty Ingredients -->
          <div class="category-card" data-card-category="ingredients">
            <h4 class="category-title">Specialty Ingredient Sourcing</h4>
            <div class="divider"></div>
            <ul class="event-list">
              <li>Rare and seasonal ingredient procurement</li>
              <li>Direct farm relationships for peak-season produce</li>
              <li>Sustainable seafood sourced from local fishermen</li>
              <li>Artisanal cheese and charcuterie selection</li>
              <li>Pricing: Based on market prices plus 15% sourcing fee</li>
            </ul>
            <div class="expand-button">
              <span>Show More</span>
              <span class="expand-icon">▼</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Dining Environment Section -->
      <div class="service-section" data-category="dining">
        <div class="category-grid">
          <!-- Table Setting -->
          <div class="category-card" data-card-category="tablesetting">
            <h4 class="category-title">Table Setting & Styling</h4>
            <div class="divider"></div>
            <ul class="event-list">
              <li>Elegant table design customized to your occasion</li>
              <li>Premium linens, dinnerware, and glassware</li>
              <li>Seasonal floral arrangements from local growers</li>
              <li>Ambient lighting to create the perfect atmosphere</li>
              <li>Pricing: From $15 per guest for essentials to $60+ for luxury</li>
            </ul>
            <div class="expand-button">
              <span>Show More</span>
              <span class="expand-icon">▼</span>
            </div>
          </div>

          <!-- Floral Design -->
          <div class="category-card" data-card-category="floral">
            <h4 class="category-title">Custom Floral Design</h4>
            <div class="divider"></div>
            <ul class="event-list">
              <li>Consultation with professional floral designers</li>
              <li>Locally-sourced, seasonal blooms and greenery</li>
              <li>Coordinated arrangements for tables and living spaces</li>
              <li>Take-home arrangements for guests as favors</li>
              <li>Pricing: From $150 for essential arrangements</li>
            </ul>
            <div class="expand-button">
              <span>Show More</span>
              <span class="expand-icon">▼</span>
            </div>
          </div>

          <!-- Music & Ambiance -->
          <div class="category-card" data-card-category="music">
            <h4 class="category-title">Music & Ambient Design</h4>
            <div class="divider"></div>
            <ul class="event-list">
              <li>Curated playlists tailored to your event</li>
              <li>Live musician recommendations and booking</li>
              <li>Professional sound equipment setup</li>
              <li>Custom lighting design for indoor and outdoor spaces</li>
              <li>Pricing: From $75 for playlist creation to $250+ for full ambiance design</li>
            </ul>
            <div class="expand-button">
              <span>Show More</span>
              <span class="expand-icon">▼</span>
            </div>
          </div>

          <!-- Private Venue Selection -->
          <div class="category-card" data-card-category="venue">
            <h4 class="category-title">Private Venue Coordination</h4>
            <div class="divider"></div>
            <ul class="event-list">
              <li>Access to exclusive Santa Barbara properties</li>
              <li>Private vineyard, estate, and beach locations</li>
              <li>Coordination with venue management</li>
              <li>Setup and breakdown logistics</li>
              <li>Pricing: Complimentary consultation; booking fees vary by venue</li>
            </ul>
            <div class="expand-button">
              <span>Show More</span>
              <span class="expand-icon">▼</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Educational Experiences Section -->
      <div class="service-section" data-category="educational">
        <div class="category-grid">
          <!-- Cooking Lessons -->
          <div class="category-card" data-card-category="cooking">
            <h4 class="category-title">Interactive Cooking Lessons</h4>
            <div class="divider"></div>
            <ul class="event-list">
              <li>Hands-on instruction for specific techniques or dishes</li>
              <li>Professional culinary methods and chef shortcuts</li>
              <li>Market tours and ingredient selection guidance</li>
              <li>Recipe packets to recreate dishes at home</li>
              <li>Pricing: From $75 for focus sessions to $275 for market tours</li>
            </ul>
            <div class="expand-button">
              <span>Show More</span>
              <span class="expand-icon">▼</span>
            </div>
          </div>

          <!-- Wine Education -->
          <div class="category-card" data-card-category="wineedu">
            <h4 class="category-title">Wine Education Workshops</h4>
            <div class="divider"></div>
            <ul class="event-list">
              <li>Expert-led tastings focused on regions or varietals</li>
              <li>Food and wine pairing principles</li>
              <li>Santa Barbara wine country exploration</li>
              <li>Blind tasting experiences for groups</li>
              <li>Pricing: From $125 per person for guided experiences</li>
            </ul>
            <div class="expand-button">
              <span>Show More</span>
              <span class="expand-icon">▼</span>
            </div>
          </div>

          <!-- Chef Demonstrations -->
          <div class="category-card" data-card-category="demo">
            <h4 class="category-title">Chef Demonstrations</h4>
            <div class="divider"></div>
            <ul class="event-list">
              <li>Live cooking presentations by our expert chefs</li>
              <li>Specialty technique showcases</li>
              <li>Interactive Q&A with culinary professionals</li>
              <li>Tastings of demonstrated dishes</li>
              <li>Pricing: From $250 for an hour-long demonstration</li>
            </ul>
            <div class="expand-button">
              <span>Show More</span>
              <span class="expand-icon">▼</span>
            </div>
          </div>

          <!-- Culinary Team Building -->
          <div class="category-card" data-card-category="teambuilding">
            <h4 class="category-title">Culinary Team Building</h4>
            <div class="divider"></div>
            <ul class="event-list">
              <li>Collaborative cooking challenges for groups</li>
              <li>Customized activities for corporate teams</li>
              <li>Competitive or cooperative cooking formats</li>
              <li>Facilitated discussion of team dynamics</li>
              <li>Pricing: From $150 per person for group experiences</li>
            </ul>
            <div class="expand-button">
              <span>Show More</span>
              <span class="expand-icon">▼</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Specialty Services Section -->
      <div class="service-section" data-category="specialty">
        <div class="category-grid">
          <!-- Produce Boxes -->
          <div class="category-card" data-card-category="produce">
            <h4 class="category-title">Seasonal Produce Boxes</h4>
            <div class="divider"></div>
            <ul class="event-list">
              <li>Hand-selected produce from local organic farms</li>
              <li>Artisanal oils, vinegars, and specialty items</li>
              <li>Chef-created recipes utilizing seasonal ingredients</li>
              <li>Information on featured farms and producers</li>
              <li>Pricing: From $45 weekly for essentials to $125 for gourmet</li>
            </ul>
            <div class="expand-button">
              <span>Show More</span>
              <span class="expand-icon">▼</span>
            </div>
          </div>

          <!-- Photography -->
          <div class="category-card" data-card-category="photo">
            <h4 class="category-title">Culinary Photography</h4>
            <div class="divider"></div>
            <ul class="event-list">
              <li>Professional documentation of your culinary experience</li>
              <li>Editorial-quality food and ambiance photography</li>
              <li>Digital gallery delivered after your event</li>
              <li>Print packages available for keepsakes</li>
              <li>Pricing: From $350 for essential coverage</li>
            </ul>
            <div class="expand-button">
              <span>Show More</span>
              <span class="expand-icon">▼</span>
            </div>
          </div>

          <!-- Cookbook Creation -->
          <div class="category-card" data-card-category="cookbook">
            <h4 class="category-title">Custom Cookbook Creation</h4>
            <div class="divider"></div>
            <ul class="event-list">
              <li>Personalized recipe collection from your events</li>
              <li>Professional design and food photography</li>
              <li>Family recipe preservation and modernization</li>
              <li>Printed and digital formats available</li>
              <li>Pricing: From $500 for basic collections to $2,000+ for deluxe editions</li>
            </ul>
            <div class="expand-button">
              <span>Show More</span>
              <span class="expand-icon">▼</span>
            </div>
          </div>

          <!-- Gift Curation -->
          <div class="category-card" data-card-category="gifts">
            <h4 class="category-title">Culinary Gift Curation</h4>
            <div class="divider"></div>
            <ul class="event-list">
              <li>Custom guest favors for special occasions</li>
              <li>Artisanal food gift packages for corporate clients</li>
              <li>Seasonal gift boxes featuring local producers</li>
              <li>Personalized chef-selected kitchen tools</li>
              <li>Pricing: From $35 per person for curated gift packages</li>
            </ul>
            <div class="expand-button">
              <span>Show More</span>
              <span class="expand-icon">▼</span>
            </div>
          </div>

          <!-- Nutrition Consultation -->
          <div class="category-card" data-card-category="nutrition">
            <h4 class="category-title">Nutritional Consultation</h4>
            <div class="divider"></div>
            <ul class="event-list">
              <li>Specialized menu planning with nutritional experts</li>
              <li>Dietary-specific meal programs and guidance</li>
              <li>Ingredient education and shopping guidance</li>
              <li>Personalized wellness cooking strategies</li>
              <li>Pricing: From $175 for initial consultation</li>
            </ul>
            <div class="expand-button">
              <span>Show More</span>
              <span class="expand-icon">▼</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Initialize the category tabs
  initializeCategoryTabs();
  
  // Initialize expandable cards
  initializeExpandableCards();
}

// Initialize category tabs
function initializeCategoryTabs() {
  const beyondTableAccordion = document.getElementById('beyond-table-accordion');
  if (!beyondTableAccordion) return;
  
  const categoryTabs = beyondTableAccordion.querySelectorAll('.category-tab');
  const serviceSections = beyondTableAccordion.querySelectorAll('.service-section');
  
  categoryTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Remove active class from all tabs
      categoryTabs.forEach(t => t.classList.remove('active'));
      
      // Add active class to clicked tab
      this.classList.add('active');
      
      // Get category
      const category = this.getAttribute('data-category');
      
      // Hide all service sections
      serviceSections.forEach(section => {
        section.classList.remove('active');
      });
      
      // Show selected service section
      const selectedSection = beyondTableAccordion.querySelector(
        `.service-section[data-category="${category}"]`
      );
      if (selectedSection) {
        selectedSection.classList.add('active');
      }
    });
  });
}

// Initialize expandable cards
function initializeExpandableCards() {
  const cards = document.querySelectorAll('.category-card');
  
  cards.forEach(card => {
    // Add click handler to the entire card
    card.addEventListener('click', (e) => {
      e.stopPropagation();
      
      // Close any other expanded cards
      cards.forEach(otherCard => {
        if (otherCard !== card && otherCard.classList.contains('expanded')) {
          otherCard.classList.remove('expanded');
          const otherButton = otherCard.querySelector('.expand-button span');
          if (otherButton) {
            otherButton.textContent = 'Show More';
          }
        }
      });
      
      // Toggle current card
      const isExpanded = card.classList.contains('expanded');
      card.classList.toggle('expanded');
      
      // Update button text
      const buttonText = card.querySelector('.expand-button span');
      if (buttonText) {
        buttonText.textContent = isExpanded ? 'Show More' : 'Show Less';
      }
      
      // Scroll into view if expanded and not fully visible
      if (!isExpanded) {
        const cardRect = card.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (cardRect.bottom > windowHeight) {
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });
    
    // Prevent expand button from triggering twice
    const expandButton = card.querySelector('.expand-button');
    if (expandButton) {
      expandButton.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }
  });
} 