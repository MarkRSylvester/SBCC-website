// Execute immediately when the script loads
(function() {
  console.log('Attempting direct fix to Our Story accordion...');
  
  // Function to apply the fix
  function applyDirectFix() {
    const ourStoryAccordion = document.getElementById('our-story-accordion');
    if (!ourStoryAccordion) {
      console.error('Our Story accordion not found, scheduling retry...');
      // Try again in case the DOM isn't fully loaded
      setTimeout(applyDirectFix, 500);
      return;
    }
    
    // Add direct styles to the accordion
    const styles = document.createElement('style');
    styles.id = 'our-story-direct-styles';
    styles.textContent = `
      /* Ensure our styles take precedence */
      #our-story-accordion .accordion-content h4 {
        font-size: 1.1rem !important;
        margin: 25px 0 15px !important;
        text-align: center !important;
        color: #1D3557 !important;
        font-family: 'Playfair Display', serif !important;
      }
      
      /* Fix grid to single column */
      #our-story-accordion .what-makes-different {
        display: flex !important;
        flex-direction: column !important;
        gap: 15px !important;
        margin: 20px 0 !important;
      }
      
      #our-story-accordion .story-card {
        background-color: #F9F7F2 !important;
        padding: 20px !important;
        border-radius: 5px !important;
        border-left: 3px solid #1D3557 !important;
        box-shadow: 0 2px 6px rgba(0,0,0,0.05) !important;
        transition: transform 0.3s ease, box-shadow 0.3s ease !important;
        margin-bottom: 15px !important;
      }
      
      #our-story-accordion .story-card h5 {
        font-size: 1.05rem !important;
        font-family: 'Playfair Display', serif !important;
        color: #1D3557 !important;
        margin-bottom: 8px !important;
      }
      
      /* Process steps in single column */
      #our-story-accordion .process-steps {
        display: flex !important;
        flex-direction: column !important;
        gap: 15px !important;
      }
      
      #our-story-accordion .process-step {
        display: flex !important;
        align-items: flex-start !important;
        background-color: #F9F7F2 !important;
        padding: 15px !important;
        border-radius: 5px !important;
        border-left: 3px solid #1D3557 !important;
        margin-bottom: 10px !important;
      }
      
      #our-story-accordion .step-number {
        width: 30px !important;
        height: 30px !important;
        background-color: #1D3557 !important;
        color: white !important;
        border-radius: 50% !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        margin-right: 15px !important;
        flex-shrink: 0 !important;
      }
    `;
    document.head.appendChild(styles);
    
    // Update the HTML structure directly
    const accordionContent = ourStoryAccordion.querySelector('.accordion-content');
    if (!accordionContent) {
      console.error('Accordion content not found');
      return;
    }
    
    // Create a fresh structure
    const newHTML = `
      <p class="section-intro">
        We're a community of local chefs on a shared mission: to make private dining effortless—and unforgettable. Whether you're planning an intimate dinner, a wedding, or a weekend retreat, we'll match you with the perfect chef to bring your vision to life through thoughtful, beautifully prepared food.
      </p>
      
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
      
      <h4>The Process</h4>
      <div class="process-steps">
        <div class="process-step">
          <div class="step-number">1</div>
          <div class="step-content">
            <h5>Chef Selection</h5>
            <p>Once you reach out, we'll send you curated resumes from chefs matched to your tastes, event style, and household needs.</p>
          </div>
        </div>
        
        <div class="process-step">
          <div class="step-number">2</div>
          <div class="step-content">
            <h5>Personal Interviews</h5>
            <p>You'll meet the chefs to ensure their style, personality, and creativity align with your vision.</p>
          </div>
        </div>
        
        <div class="process-step">
          <div class="step-number">3</div>
          <div class="step-content">
            <h5>The Perfect Match</h5>
            <p>With our guidance, you'll choose the chef who best fits the bill—someone who will turn your gathering into something truly memorable.</p>
          </div>
        </div>
      </div>
    `;
    
    // Apply the new content directly
    accordionContent.innerHTML = newHTML;
    console.log('Direct fix applied to Our Story accordion');
  }
  
  // Try to apply immediately
  applyDirectFix();
  
  // Also try again when DOM is fully loaded
  document.addEventListener('DOMContentLoaded', applyDirectFix);
})();
