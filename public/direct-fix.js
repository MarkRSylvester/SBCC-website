// Direct structural fix for Our Story accordion
console.log("Starting direct fix for Our Story accordion");

// Get the accordion
const ourStoryAccordion = document.getElementById('our-story-accordion');
if (ourStoryAccordion) {
  console.log("Found Our Story accordion");
  
  // Get the content container
  const contentDiv = ourStoryAccordion.querySelector('.accordion-content');
  if (contentDiv) {
    console.log("Found accordion content");
    
    // Replace all content with a clean implementation
    contentDiv.innerHTML = `
      <p class="section-intro">
        We're a community of local chefs on a shared mission: to make private dining effortless—and unforgettable. Whether you're planning an intimate dinner, a wedding, or a weekend retreat, we'll match you with the perfect chef to bring your vision to life through thoughtful, beautifully prepared food.
      </p>
      
      <div class="section-divider"></div>
      
      <h4 style="font-size: 1.1rem; text-align: center; margin: 30px 0 20px; color: #1D3557; font-family: 'Playfair Display', serif;">What Makes Us Different</h4>
      
      <div style="display: flex; flex-direction: column; gap: 15px; margin-bottom: 30px;">
        <div style="background-color: #F9F7F2; border-radius: 5px; border-left: 3px solid #1D3557; padding: 20px; margin-bottom: 15px; box-shadow: 0 2px 6px rgba(0,0,0,0.05);">
          <h5 style="font-size: 1.05rem; color: #1D3557; margin-bottom: 10px; font-family: 'Playfair Display', serif;">Global Talent, Local Roots</h5>
          <p>From Michelin-trained masters to creative culinary artisans, our chefs bring world-class skill to Santa Barbara tables. Every chef is personally vetted and selected not just for talent, but for hospitality and heart.</p>
        </div>
        
        <div style="background-color: #F9F7F2; border-radius: 5px; border-left: 3px solid #1D3557; padding: 20px; margin-bottom: 15px; box-shadow: 0 2px 6px rgba(0,0,0,0.05);">
          <h5 style="font-size: 1.05rem; color: #1D3557; margin-bottom: 10px; font-family: 'Playfair Display', serif;">Connecting Great Chefs with Great Clients</h5>
          <p>Our platform makes it easy to browse and connect with top local chefs. Every detail is handled with care, so you can focus on the experience, not the logistics.</p>
        </div>
        
        <div style="background-color: #F9F7F2; border-radius: 5px; border-left: 3px solid #1D3557; padding: 20px; margin-bottom: 15px; box-shadow: 0 2px 6px rgba(0,0,0,0.05);">
          <h5 style="font-size: 1.05rem; color: #1D3557; margin-bottom: 10px; font-family: 'Playfair Display', serif;">Celebrating Local Flavor</h5>
          <p>We partner with Santa Barbara farmers, fishers, and foragers to create dishes that reflect the vibrant spirit of the Central Coast. Every meal is a celebration of community, seasonality, and creativity.</p>
        </div>
      </div>
      
      <div class="section-divider"></div>
      
      <h4 style="font-size: 1.1rem; text-align: center; margin: 30px 0 20px; color: #1D3557; font-family: 'Playfair Display', serif;">Our Founder's Story</h4>
      
      <div style="display: flex; flex-direction: column; margin-bottom: 30px;">
        <div style="margin: 0 auto 20px; max-width: 300px;">
          <img src="/SBCC-Images/coco-portrait.jpg" alt="Coco, Founder of Santa Barbara Chef Collective" style="width: 100%; height: auto; border-radius: 5px; box-shadow: 0 3px 10px rgba(0,0,0,0.1);">
        </div>
        <div>
          <p>I had the joy of being a private yacht chef for eight years, cooking for royalty, celebrities, and adventurers while sailing the globe. But my passion for food began earlier, in the fresh markets of France, where I fell in love with seasonal ingredients, aged cheeses, and the art of gathering.</p>
          <p>Motivated by that culture, I trained at Tante Marie's in San Francisco and have never stopped cooking since. From buying octopus in a Greek village to slicing fresh-caught sashimi in Alaska, I've always believed food should reflect where you are and who you're with.</p>
          <p>Now rooted in Santa Barbara and close to family, I cook for local events and gatherings using vibrant, organic California ingredients. I specialize in Mediterranean and raw cuisine and love meals that make you feel great, body and soul.</p>
          <p>Founding the Chef Collective let me bring together a team of chefs who care deeply about food, craft, and connection. I'm so glad you're here.</p>
          <p style="font-family: 'Playfair Display', serif; font-style: italic; text-align: right; margin-top: 15px;">— Coco</p>
        </div>
      </div>
      
      <div class="section-divider"></div>
      
      <h4 style="font-size: 1.1rem; text-align: center; margin: 30px 0 20px; color: #1D3557; font-family: 'Playfair Display', serif;">The Process</h4>
      
      <div style="display: flex; flex-direction: column; gap: 15px; margin-bottom: 30px;">
        <div style="display: flex; background-color: #F9F7F2; border-radius: 5px; border-left: 3px solid #1D3557; padding: 20px; margin-bottom: 15px; box-shadow: 0 2px 6px rgba(0,0,0,0.05);">
          <div style="width: 36px; height: 36px; background-color: #1D3557; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; flex-shrink: 0; font-family: 'Playfair Display', serif;">1</div>
          <div>
            <h5 style="font-size: 1.05rem; color: #1D3557; margin: 0 0 5px; font-family: 'Playfair Display', serif;">Chef Selection</h5>
            <p style="margin: 0;">Once you reach out, we'll send you curated resumes from chefs matched to your tastes, event style, and household needs.</p>
          </div>
        </div>
        
        <div style="display: flex; background-color: #F9F7F2; border-radius: 5px; border-left: 3px solid #1D3557; padding: 20px; margin-bottom: 15px; box-shadow: 0 2px 6px rgba(0,0,0,0.05);">
          <div style="width: 36px; height: 36px; background-color: #1D3557; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; flex-shrink: 0; font-family: 'Playfair Display', serif;">2</div>
          <div>
            <h5 style="font-size: 1.05rem; color: #1D3557; margin: 0 0 5px; font-family: 'Playfair Display', serif;">Personal Interviews</h5>
            <p style="margin: 0;">You'll meet the chefs to ensure their style, personality, and creativity align with your vision.</p>
          </div>
        </div>
        
        <div style="display: flex; background-color: #F9F7F2; border-radius: 5px; border-left: 3px solid #1D3557; padding: 20px; margin-bottom: 15px; box-shadow: 0 2px 6px rgba(0,0,0,0.05);">
          <div style="width: 36px; height: 36px; background-color: #1D3557; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; flex-shrink: 0; font-family: 'Playfair Display', serif;">3</div>
          <div>
            <h5 style="font-size: 1.05rem; color: #1D3557; margin: 0 0 5px; font-family: 'Playfair Display', serif;">The Perfect Match</h5>
            <p style="margin: 0;">With our guidance, you'll choose the chef who best fits the bill—someone who will turn your gathering into something truly memorable.</p>
          </div>
        </div>
      </div>
    `;
    
    // Add responsive style for desktop view
    const styleTag = document.createElement('style');
    styleTag.textContent = `
      @media (min-width: 768px) {
        #our-story-accordion .accordion-content > div:nth-child(5) {
          flex-direction: row !important;
        }
        
        #our-story-accordion .accordion-content > div:nth-child(5) > div:first-child {
          flex: 0 0 300px;
          margin: 0 25px 0 0;
        }
      }
    `;
    document.head.appendChild(styleTag);
    
    console.log("Replaced Our Story accordion content with fixed version");
  } else {
    console.log("Could not find accordion content");
  }
} else {
  console.log("Could not find Our Story accordion");
}
