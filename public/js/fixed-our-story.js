// Execute as soon as script loads
(function() {
  // Function that runs as soon as possible and again when DOM is loaded
  function fixStoryAccordion() {
    console.log('Attempting to fix Our Story accordion formatting...');
    
    // Get the accordion
    const ourStoryAccordion = document.getElementById('our-story-accordion');
    if (!ourStoryAccordion) {
      console.log('Our Story accordion not found yet, will retry...');
      return; // Will retry on DOMContentLoaded
    }

    // 1. First, ensure our styles are added for the accordion content
    let styleEl = document.getElementById('our-story-fix-styles');
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'our-story-fix-styles';
      styleEl.innerHTML = `
        /* Fix Our Story Accordion */
        #our-story-accordion .accordion-content h4 {
          font-size: 1.1rem !important;
          text-align: center !important;
          font-family: 'Playfair Display', serif !important;
          color: #1D3557 !important;
          margin: 30px 0 20px !important;
          position: relative !important;
        }
        
        #our-story-accordion .accordion-content h4:after {
          content: '' !important;
          position: absolute !important;
          bottom: -10px !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
          width: 60px !important;
          height: 2px !important;
          background-color: #1D3557 !important;
        }
        
        /* Rectangular cards styling like The Process section */
        #our-story-accordion .what-makes-different .story-card,
        #our-story-accordion .process-step {
          background-color: #F9F7F2 !important;
          border-radius: 5px !important;
          border-left: 3px solid #1D3557 !important;
          padding: 20px !important;
          margin-bottom: 15px !important;
          box-shadow: 0 2px 6px rgba(0,0,0,0.05) !important;
        }
        
        /* Make founder story single column */
        #our-story-accordion .founder-content {
          display: flex !important;
          flex-direction: column !important;
        }
        
        #our-story-accordion .founder-image {
          margin: 0 auto 20px !important;
          max-width: 300px !important;
        }
        
        #our-story-accordion .founder-image img {
          width: 100% !important;
          height: auto !important;
          border-radius: 5px !important;
        }
        
        #our-story-accordion .founder-text p {
          margin-bottom: 15px !important;
        }
        
        /* Tablet/desktop view for founder section */
        @media (min-width: 768px) {
          #our-story-accordion .founder-content {
            flex-direction: row !important;
            align-items: flex-start !important;
          }
          
          #our-story-accordion .founder-image {
            flex: 0 0 300px !important;
            margin: 0 25px 0 0 !important;
          }
        }
      `;
      document.head.appendChild(styleEl);
      console.log('Added custom styling for Our Story accordion');
    }
    
    // 2. Find the content section and fix specific parts
    const content = ourStoryAccordion.querySelector('.accordion-content');
    if (!content) {
      console.log('Content section not found');
      return;
    }
    
    // 3. Now let's fix the specific sections
    
    // First, look for the "What Makes Us Different" section
    let whatMakesDifferentHeader = Array.from(content.querySelectorAll('h4')).find(h => 
      h.textContent.includes('What Makes Us Different'));
    
    if (whatMakesDifferentHeader) {
      // Get the parent div to reconstruct this section
      const parentDiv = whatMakesDifferentHeader.parentElement;
      
      // Create the "What Makes Us Different" section with cards
      const whatMakesDifferentHTML = `
        <h4>What Makes Us Different</h4>
        <div class="what-makes-different">
          <div class="story-card">
            <h5>Global Talent, Local Roots</h5>
            <p>From Michelin-trained masters to creative culinary artisans, our chefs bring world-class skill to Santa Barbara tables. Every chef is personally vetted and selected not just for talent, but for hospitality and heart.</p>
          </div>
          
          <div class="story-card">
            <h5>Connecting Great Chefs with Great Clients</h5>
            <p>Our platform makes it easy to browse and connect with top local chefs. Every detail is handled with care, so you can focus on the experience, not the logistics.</p>
          </div>
          
          <div class="story-card">
            <h5>Celebrating Local Flavor</h5>
            <p>We partner with Santa Barbara farmers, fishers, and foragers to create dishes that reflect the vibrant spirit of the Central Coast. Every meal is a celebration of community, seasonality, and creativity.</p>
          </div>
        </div>
        <div class="section-divider"></div>
      `;
      
      // Try to replace this section and surrounding content
      if (parentDiv) {
        // Find where to insert 
        parentDiv.innerHTML = whatMakesDifferentHTML;
        console.log('Updated What Makes Us Different section');
      }
    }
    
    // Next, fix the Our Founder's Story section
    let founderHeader = Array.from(content.querySelectorAll('h4')).find(h => 
      h.textContent.includes("Our Founder's Story"));
    
    if (founderHeader) {
      // Get the parent div to reconstruct this section
      const parentDiv = founderHeader.parentElement;
      
      // Create the Founder section with correct structure
      const founderHTML = `
        <h4>Our Founder's Story</h4>
        <div class="founder-content">
          <div class="founder-image">
            <img src="/SBCC-Images/coco-portrait.jpg" alt="Coco, Founder of Santa Barbara Chef Collective">
          </div>
          <div class="founder-text">
            <p>I had the joy of being a private yacht chef for eight years, cooking for royalty, celebrities, and adventurers while sailing the globe. But my passion for food began earlier, in the fresh markets of France, where I fell in love with seasonal ingredients, aged cheeses, and the art of gathering.</p>
            <p>Motivated by that culture, I trained at Tante Marie's in San Francisco and have never stopped cooking since. From buying octopus in a Greek village to slicing fresh-caught sashimi in Alaska, I've always believed food should reflect where you are and who you're with.</p>
            <p>Now rooted in Santa Barbara and close to family, I cook for local events and gatherings using vibrant, organic California ingredients. I specialize in Mediterranean and raw cuisine and love meals that make you feel great, body and soul.</p>
            <p>Founding the Chef Collective let me bring together a team of chefs who care deeply about food, craft, and connection. I'm so glad you're here.</p>
            <p class="founder-signature">— Coco</p>
          </div>
        </div>
        <div class="section-divider"></div>
      `;
      
      // Try to replace this section
      if (parentDiv) {
        parentDiv.innerHTML = founderHTML;
        console.log('Updated Our Founder\'s Story section');
      }
    }
    
    console.log('Our Story accordion update completed');
  }
  
  // Try to run immediately
  fixStoryAccordion();
  
  // Also run when DOM is fully loaded
  document.addEventListener('DOMContentLoaded', fixStoryAccordion);
  
  // And once more after a delay to ensure everything is loaded
  setTimeout(fixStoryAccordion, 1000);
})();
