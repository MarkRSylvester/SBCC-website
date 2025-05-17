console.log("Fix Our Story script loaded - updated with centered tapered dividers");
document.addEventListener('DOMContentLoaded', function() {
  // Wait for everything else to load
  setTimeout(function() {
    console.log("Fixing Our Story accordion");
    
    // Get the Our Story accordion content
    var storyContent = document.querySelector('#our-story-accordion .accordion-content');
    
    if (storyContent) {
      console.log("Found Our Story content");
      
      // Fix the structure and styling of Our Story
      storyContent.innerHTML = `
        <p class="section-intro">We're a community of local chefs on a shared mission: to make private dining effortless—and unforgettable. Whether you're planning an intimate dinner, a wedding, or a weekend retreat, we'll match you with the perfect chef to bring your vision to life through thoughtful, beautifully prepared food.</p>
        
        <div class="story-section">
          <h4>What Makes Us Different</h4>
          <div class="category-grid">
            <div class="category-card">
              <h4 class="category-title">Global Talent, Local Roots</h4>
              <div class="center-divider"></div>
              <p>From Michelin-trained masters to creative culinary artisans, our chefs bring world-class skill to Santa Barbara tables. Every chef is personally vetted and selected not just for talent, but for hospitality and heart.</p>
            </div>
            
            <div class="category-card">
              <h4 class="category-title">Connecting Great Chefs with Great Clients</h4>
              <div class="center-divider"></div>
              <p>Our platform makes it easy to browse and connect with top local chefs. Every detail is handled with care, so you can focus on the experience, not the logistics.</p>
            </div>
          </div>
          
          <div class="category-grid">
            <div class="category-card">
              <h4 class="category-title">Celebrating Local Flavor</h4>
              <div class="center-divider"></div>
              <p>We partner with Santa Barbara farmers, fishers, and foragers to create dishes that reflect the vibrant spirit of the Central Coast. Every meal is a celebration of community, seasonality, and creativity.</p>
            </div>
          </div>
        </div>
        
        <div class="section-divider"></div>
        
        <div class="story-section">
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
        </div>
        
        <div class="section-divider"></div>
        
        <div class="story-section">
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
        </div>
      `;
      
      console.log("Our Story content updated");
    } else {
      console.log("Could not find Our Story content");
    }
    
    // Add specific styles for Our Story
    var storyStyle = document.createElement('style');
    storyStyle.innerHTML = `
      /* Our Story specific styling */
      .story-section {
        margin-bottom: 30px;
      }
      
      .story-section h4 {
        font-family: 'Playfair Display', serif;
        color: #1D3557;
        font-size: 22px;
        margin-bottom: 20px;
        text-align: left;
      }
      
      /* Make category titles smaller */
      .story-section .category-title {
        font-size: 16px !important;
        margin-bottom: 10px !important;
        text-align: center !important;
      }
      
      /* Center divider styling */
      .center-divider {
        height: 2px;
        width: 60px;
        background: linear-gradient(to right, transparent, #1D3557, transparent);
        margin: 0 auto 25px;
        display: block;
      }
      
      /* Adjust founder content for text wrapping */
      .founder-content {
        position: relative;
      }
      
      .founder-image {
        float: left;
        width: 200px;
        margin-right: 25px;
        margin-bottom: 15px;
      }
      
      .founder-image img {
        width: 100%;
        border-radius: 5px;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
      }
      
      .founder-content p {
        margin-bottom: 15px;
        line-height: 1.6;
      }
      
      .founder-content::after {
        content: "";
        display: table;
        clear: both;
      }
      
      .founder-signature {
        font-style: italic;
        margin-top: 10px;
        text-align: right;
        font-weight: 500;
      }
      
      .process-steps {
        margin-top: 20px;
      }
      
      .process-step {
        display: flex;
        align-items: flex-start;
        margin-bottom: 25px;
      }
      
      .step-number {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        background-color: #1D3557;
        color: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        margin-right: 15px;
        flex-shrink: 0;
      }
      
      .step-content {
        flex: 1;
      }
      
      .step-content h5 {
        margin: 0 0 5px 0;
        color: #1D3557;
        font-family: 'Playfair Display', serif;
        font-size: 16px;
      }
      
      .step-content p {
        margin: 0;
        line-height: 1.5;
      }
      
      /* Responsive design for mobile */
      @media (max-width: 768px) {
        .founder-image {
          float: none;
          width: 100%;
          max-width: 250px;
          margin: 0 auto 20px;
          display: block;
        }
        
        .process-step {
          flex-direction: column;
          text-align: center;
          align-items: center;
        }
        
        .step-number {
          margin: 0 0 10px 0;
        }
      }
    `;
    document.head.appendChild(storyStyle);
    
  }, 1000); // Wait 1 second for everything else to load
});
