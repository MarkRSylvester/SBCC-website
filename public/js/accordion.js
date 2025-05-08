// Improved Accordion functionality
// Clean, isolated toggle logic for all accordions

document.addEventListener('DOMContentLoaded', function() {
  console.log("Accordion script loaded");
  
  // First, force all accordions to be closed and add chevrons
  const allAccordionItems = document.querySelectorAll('.accordion-item');
  console.log(`Found ${allAccordionItems.length} accordion items`);
  
  allAccordionItems.forEach(item => {
    // Remove active/open classes
    item.classList.remove('active', 'open');
    
    // Get the header
    const header = item.querySelector('.accordion-header');
    if (!header) return;
    
    // Force add chevron
    let iconContainer = header.querySelector('.accordion-icon');
    if (!iconContainer) {
      iconContainer = document.createElement('div');
      iconContainer.className = 'accordion-icon';
      header.appendChild(iconContainer);
    }
    
    // Always replace the SVG to ensure it's correct
    iconContainer.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 12L16 4L14.59 2.58L8 9.17L1.41 2.58L0 4L8 12Z" fill="#1D3557"/>
      </svg>
    `;
    
    // Reset content state
    const content = item.querySelector('.accordion-content');
    if (content) {
      content.style.display = 'none';
      content.style.height = '0';
      content.style.maxHeight = '0';
      content.style.padding = '0';
      content.style.overflow = 'hidden';
    }
    
    // Log what we did for debugging
    console.log(`Processed accordion: ${header.textContent.trim()}`);
  });
  
  // Now set up the click handlers
  const allHeaders = document.querySelectorAll('.accordion-header');
  allHeaders.forEach(header => {
    header.addEventListener('click', function(e) {
      // Prevent event from bubbling if clicking inside the header but not on the header itself
      if (e.target !== header && !header.contains(e.target)) return;
      
      const item = this.closest('.accordion-item');
      const content = item.querySelector('.accordion-content');
      const icon = this.querySelector('.accordion-icon svg');
      
      console.log(`Clicked on accordion: ${this.textContent.trim()}`);
      
      // Toggle active state
      const wasActive = item.classList.contains('active');
      item.classList.toggle('active');
      
      // Update content visibility
      if (!wasActive) {
        // Opening
        content.style.display = 'block';
        content.style.height = 'auto';
        content.style.maxHeight = 'none';
        content.style.padding = '20px';
        content.style.overflow = 'auto';
        if (icon) icon.style.transform = 'rotate(180deg)';
      } else {
        // Closing
        content.style.display = 'none';
        content.style.height = '0';
        content.style.maxHeight = '0';
        content.style.padding = '0';
        content.style.overflow = 'hidden';
        if (icon) icon.style.transform = 'rotate(0)';
      }
    });
  });
  
  // STEP 2: Populate accordion content
  populateAccordionContent();
});

// Function to populate all accordion content
function populateAccordionContent() {
  // Beyond the Table content
  const beyondTableContent = `
    <p class="section-intro">
      Extend your culinary experience beyond the dining table with our complementary offerings designed to enhance every aspect of your gathering.
    </p>
    
    <div class="category-grid">
      <!-- Wine Pairing -->
      <div class="category-card" data-category="wine">
        <h4 class="category-title">Wine Pairing Guidance</h4>
        <div class="divider"></div>
        <ul class="event-list">
          <li>Expert wine recommendations tailored to your menu</li>
          <li>Curated selections from local Santa Barbara vineyards</li>
          <li>In-home wine tasting experiences with sommeliers</li>
          <li>Custom flight creation for multi-course experiences</li>
          <li>Pricing: From complimentary guidance to full sommelier service</li>
        </ul>
      </div>
      
      <!-- Table Setting -->
      <div class="category-card" data-category="tablesetting">
        <h4 class="category-title">Table Setting & Styling</h4>
        <div class="divider"></div>
        <ul class="event-list">
          <li>Elegant table design customized to your occasion</li>
          <li>Premium linens, dinnerware, and glassware</li>
          <li>Seasonal floral arrangements from local growers</li>
          <li>Ambient lighting to create the perfect atmosphere</li>
          <li>Pricing: From $15 per guest for essentials to $60+ for luxury</li>
        </ul>
      </div>
      
      <!-- Cooking Lessons -->
      <div class="category-card" data-category="cooking">
        <h4 class="category-title">Interactive Cooking Lessons</h4>
        <div class="divider"></div>
        <ul class="event-list">
          <li>Hands-on instruction for specific techniques or dishes</li>
          <li>Professional culinary methods and chef shortcuts</li>
          <li>Market tours and ingredient selection guidance</li>
          <li>Recipe packets to recreate dishes at home</li>
          <li>Pricing: From $75 for focus sessions to $275 for market tours</li>
        </ul>
      </div>
      
      <!-- Produce Boxes -->
      <div class="category-card" data-category="produce">
        <h4 class="category-title">Seasonal Produce Boxes</h4>
        <div class="divider"></div>
        <ul class="event-list">
          <li>Hand-selected produce from local organic farms</li>
          <li>Artisanal oils, vinegars, and specialty items</li>
          <li>Chef-created recipes utilizing seasonal ingredients</li>
          <li>Information on featured farms and producers</li>
          <li>Pricing: From $45 weekly for essentials to $125 for gourmet</li>
        </ul>
      </div>
    </div>
  `;
  
  // Meet the Chefs content
  const chefsContent = `
    <p class="section-intro">
      Our curated collective brings together Santa Barbara's most talented culinary artists, each with a unique background and signature style that elevates your dining experience.
    </p>
    
    <div class="chef-grid">
      <!-- Chef 1 -->
      <div class="chef-card">
        <div class="chef-image">
          <img src="img/chef-maria.jpg" alt="Chef Maria">
        </div>
        <div class="chef-info">
          <h4 class="chef-name">Chef Maria Sanchez</h4>
          <p class="chef-specialty">Mediterranean & California Coastal</p>
          <p class="chef-bio">Drawing inspiration from her coastal Italian upbringing, Chef Maria infuses local Santa Barbara seafood with Mediterranean traditions. Her approach celebrates the simple elegance of fresh ingredients transformed by time-honored techniques.</p>
          <a href="#" class="chef-link">View Chef Profile</a>
        </div>
      </div>
      
      <!-- Chef 2 -->
      <div class="chef-card">
        <div class="chef-image">
          <img src="img/chef-james.jpg" alt="Chef James">
        </div>
        <div class="chef-info">
          <h4 class="chef-name">Chef James Chen</h4>
          <p class="chef-specialty">Asian Fusion & Farm-to-Table</p>
          <p class="chef-bio">With techniques honed in Michelin-starred kitchens across Asia and California, Chef James brings a precise yet imaginative approach to every dish. His menus feature unexpected flavor combinations while honoring regional ingredients.</p>
          <a href="#" class="chef-link">View Chef Profile</a>
        </div>
      </div>
      
      <!-- Chef 3 -->
      <div class="chef-card">
        <div class="chef-image">
          <img src="img/chef-sophia.jpg" alt="Chef Sophia">
        </div>
        <div class="chef-info">
          <h4 class="chef-name">Chef Sophia Rodriguez</h4>
          <p class="chef-specialty">Modern Mexican & Spanish Influence</p>
          <p class="chef-bio">Chef Sophia's vibrant cuisine reflects her heritage and passion for reimagining traditional recipes. Her sophisticated approach to Latin flavors creates memorable dining experiences that balance authenticity with innovation.</p>
          <a href="#" class="chef-link">View Chef Profile</a>
        </div>
      </div>
      
      <!-- Chef 4 -->
      <div class="chef-card">
        <div class="chef-image">
          <img src="img/chef-thomas.jpg" alt="Chef Thomas">
        </div>
        <div class="chef-info">
          <h4 class="chef-name">Chef Thomas Laurent</h4>
          <p class="chef-specialty">French Classic & Wine Country</p>
          <p class="chef-bio">Classically trained in France and seasoned in Napa Valley, Chef Thomas brings refined technique and an expert understanding of wine pairing to each menu. His creations honor French tradition while embracing Santa Barbara's coastal bounty.</p>
          <a href="#" class="chef-link">View Chef Profile</a>
        </div>
      </div>
    </div>
  `;
  
  // Signature Menus content
  const menusContent = `
    <p class="section-intro">
      Our signature menu collections offer curated culinary experiences designed for various occasions, each showcasing the finest seasonal ingredients from Santa Barbara County.
    </p>
    
    <div class="menu-categories">
      <!-- Menu Category 1 -->
      <div class="menu-category" data-menu="coastal">
        <h4 class="menu-title">Coastal Harvest</h4>
        <div class="divider"></div>
        <p class="menu-description">A celebration of Santa Barbara's pristine coastline featuring the freshest seafood, paired with locally-grown produce. Perfect for summer gatherings and seaside celebrations.</p>
        <div class="menu-highlights">
          <div class="highlight-item">
            <span class="highlight-dot"></span>
            <span class="highlight-text">Uni Butter Crostini with Microgreens</span>
          </div>
          <div class="highlight-item">
            <span class="highlight-dot"></span>
            <span class="highlight-text">Spot Prawn Crudo with Citrus and Avocado</span>
          </div>
          <div class="highlight-item">
            <span class="highlight-dot"></span>
            <span class="highlight-text">Seared Local Halibut with Summer Succotash</span>
          </div>
        </div>
        <a href="#" class="view-menu-btn">View Full Menu</a>
      </div>
      
      <!-- Menu Category 2 -->
      <div class="menu-category" data-menu="vineyard">
        <h4 class="menu-title">Vineyard Table</h4>
        <div class="divider"></div>
        <p class="menu-description">Inspired by Santa Ynez Valley wine country, this menu features robust flavors and wine-friendly dishes perfect for dinner parties and intimate gatherings.</p>
        <div class="menu-highlights">
          <div class="highlight-item">
            <span class="highlight-dot"></span>
            <span class="highlight-text">Wild Mushroom Crostini with Goat Cheese</span>
          </div>
          <div class="highlight-item">
            <span class="highlight-dot"></span>
            <span class="highlight-text">Red Wine Braised Short Ribs with Polenta</span>
          </div>
          <div class="highlight-item">
            <span class="highlight-dot"></span>
            <span class="highlight-text">Local Cheese Selection with Honeycomb</span>
          </div>
        </div>
        <a href="#" class="view-menu-btn">View Full Menu</a>
      </div>
      
      <!-- Menu Category 3 -->
      <div class="menu-category" data-menu="rancho">
        <h4 class="menu-title">Rancho Casual</h4>
        <div class="divider"></div>
        <p class="menu-description">A relaxed, family-style menu honoring California's rancho heritage, featuring elevated comfort foods and shareable dishes for casual gatherings.</p>
        <div class="menu-highlights">
          <div class="highlight-item">
            <span class="highlight-dot"></span>
            <span class="highlight-text">Heirloom Tomato Salad with Burrata</span>
          </div>
          <div class="highlight-item">
            <span class="highlight-dot"></span>
            <span class="highlight-text">Oak-Grilled Tri-Tip with Chimichurri</span>
          </div>
          <div class="highlight-item">
            <span class="highlight-dot"></span>
            <span class="highlight-text">Seasonal Fruit Galette with Lavender Cream</span>
          </div>
        </div>
        <a href="#" class="view-menu-btn">View Full Menu</a>
      </div>
      
      <!-- Menu Category 4 -->
      <div class="menu-category" data-menu="garden">
        <h4 class="menu-title">Garden Celebration</h4>
        <div class="divider"></div>
        <p class="menu-description">A plant-forward menu showcasing the vibrant produce of Santa Barbara's farms. Perfect for health-conscious guests and beautiful outdoor gatherings.</p>
        <div class="menu-highlights">
          <div class="highlight-item">
            <span class="highlight-dot"></span>
            <span class="highlight-text">Watermelon Radish Carpaccio with Citrus</span>
          </div>
          <div class="highlight-item">
            <span class="highlight-dot"></span>
            <span class="highlight-text">Seasonal Vegetable Tart with Herbs</span>
          </div>
          <div class="highlight-item">
            <span class="highlight-dot"></span>
            <span class="highlight-text">Stone Fruit & Berry Pavlova</span>
          </div>
        </div>
        <a href="#" class="view-menu-btn">View Full Menu</a>
      </div>
    </div>
  `;
  
  // Gatherings & Celebrations content
  const gatheringsContent = `
    <p class="section-intro">
      From intimate dinner parties to milestone celebrations, we create custom culinary experiences that reflect your vision and exceed expectations.
    </p>
    
    <div class="event-types-grid">
      <!-- Event Type 1 -->
      <div class="event-type-card">
        <h4 class="event-title">Intimate Dinner Parties</h4>
        <div class="divider"></div>
        <p class="event-description">Transform your home into a private dining sanctuary with a personalized menu and expert service. Perfect for hosting 4-12 guests in your own space.</p>
        <ul class="event-features">
          <li>Custom menu development</li>
          <li>Complete service from arrival to cleanup</li>
          <li>Wine pairing recommendations</li>
          <li>Pricing: From $150 per person</li>
        </ul>
      </div>
      
      <!-- Event Type 2 -->
      <div class="event-type-card">
        <h4 class="event-title">Milestone Celebrations</h4>
        <div class="divider"></div>
        <p class="event-description">Mark life's special moments with exceptional cuisine and service. Ideal for anniversaries, birthdays, and meaningful gatherings of 15-50 guests.</p>
        <ul class="event-features">
          <li>Multi-course menu options</li>
          <li>Custom cocktail programming available</li>
          <li>Staffing solutions for seamless service</li>
          <li>Pricing: From $175 per person</li>
        </ul>
      </div>
      
      <!-- Event Type 3 -->
      <div class="event-type-card">
        <h4 class="event-title">Corporate Events</h4>
        <div class="divider"></div>
        <p class="event-description">Elevate business gatherings with sophisticated cuisine that makes an impression. Suitable for team dinners, client entertainment, and retreats.</p>
        <ul class="event-features">
          <li>Flexible formats from buffet to plated service</li>
          <li>Dietary accommodation for diverse groups</li>
          <li>Schedule-conscious planning</li>
          <li>Pricing: Custom quotes based on requirements</li>
        </ul>
      </div>
      
      <!-- Event Type 4 -->
      <div class="event-type-card">
        <h4 class="event-title">Vacation Home Experiences</h4>
        <div class="divider"></div>
        <p class="event-description">Enhance your Santa Barbara stay with chef-prepared meals delivered or prepared in your rental property. No shopping, cooking, or cleanup required.</p>
        <ul class="event-features">
          <li>Multi-day meal planning available</li>
          <li>Pre-stocked refrigerator options</li>
          <li>Chef prepared meals in your vacation home</li>
          <li>Pricing: From $95 per person per meal</li>
        </ul>
      </div>
    </div>
  `;
  
  // FAQ content
  const faqContent = `
    <div class="faq-container">
      <!-- FAQ Item 1 -->
      <div class="faq-item">
        <h4 class="faq-question">How far in advance should I book a chef?</h4>
        <p class="faq-answer">For optimal availability, we recommend booking 3-4 weeks in advance for dinner parties and 6-8 weeks for larger events or peak season dates (May-September). Last-minute requests can sometimes be accommodated based on chef availability.</p>
      </div>
      
      <!-- FAQ Item 2 -->
      <div class="faq-item">
        <h4 class="faq-question">What is included in the per-person price?</h4>
        <p class="faq-answer">Our per-person pricing typically includes menu planning, grocery shopping, food costs, chef preparation time, cooking, plating, and kitchen cleanup. Service staff, rentals, beverages, and gratuity are priced separately unless specified in a comprehensive package.</p>
      </div>
      
      <!-- FAQ Item 3 -->
      <div class="faq-item">
        <h4 class="faq-question">Can you accommodate dietary restrictions?</h4>
        <p class="faq-answer">Absolutely. Our chefs are experienced in creating exceptional meals for guests with various dietary needs including gluten-free, dairy-free, vegetarian, vegan, and specific allergies. We'll work with you to develop a menu that delights all guests while respecting dietary requirements.</p>
      </div>
      
      <!-- FAQ Item 4 -->
      <div class="faq-item">
        <h4 class="faq-question">Do I need special kitchen equipment?</h4>
        <p class="faq-answer">Most home kitchens have sufficient equipment for our chefs to work with. During the planning process, we'll discuss your available equipment and make recommendations if additional items might be needed. For more elaborate menus or larger parties, we can arrange for rental equipment if necessary.</p>
      </div>
      
      <!-- FAQ Item 5 -->
      <div class="faq-item">
        <h4 class="faq-question">How does payment work?</h4>
        <p class="faq-answer">We typically require a 50% deposit to secure your date and chef, with the balance due three days before your event. For weekly meal services, we offer convenient monthly billing options. We accept all major credit cards and can provide digital invoices for corporate clients.</p>
      </div>
      
      <!-- FAQ Item 6 -->
      <div class="faq-item">
        <h4 class="faq-question">What happens if I need to cancel or reschedule?</h4>
        <p class="faq-answer">For cancellations more than 14 days before your event, deposits are fully refundable. Within 7-14 days, 50% of your deposit is refundable. Cancellations within 7 days are non-refundable due to committed food costs and chef scheduling. Rescheduling requests are accommodated when possible with no additional fee given sufficient notice.</p>
      </div>
    </div>
  `;
  
  // Set content to each accordion section
  const contentMap = {
    'beyond-table-accordion': beyondTableContent,
    'chefs-accordion': chefsContent,
    'menus-accordion': menusContent,
    'gatherings-accordion': gatheringsContent,
    'faq-accordion': faqContent
  };
  
  // Apply content to each accordion
  Object.keys(contentMap).forEach(id => {
    const accordion = document.getElementById(id);
    if (accordion) {
      const contentDiv = accordion.querySelector('.accordion-content');
      if (contentDiv) {
        contentDiv.innerHTML = contentMap[id];
        console.log(`Content added to ${id}`);
      } else {
        console.log(`Could not find content div in ${id}`);
      }
    } else {
      console.log(`Could not find accordion with id ${id}`);
    }
  });
} 