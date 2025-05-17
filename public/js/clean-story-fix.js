// Simple, clean fix for Our Story accordion
document.addEventListener('DOMContentLoaded', function() {
  console.log('Starting clean fix for Our Story accordion');
  
  // Function to fix Our Story accordion
  function fixOurStoryAccordion() {
    // Get the accordion
    const accordion = document.getElementById('our-story-accordion');
    if (!accordion) {
      console.log('Our Story accordion not found');
      return;
    }
    
    // Get the content container
    const content = accordion.querySelector('.accordion-content');
    if (!content) {
      console.log('Accordion content not found');
      return;
    }
    
    console.log('Found accordion and content, applying fix');
    
    // Create clean HTML structure - with proper tapered dividers
    content.innerHTML = `
      <p style="text-align: center; margin-bottom: 20px; font-size: 0.9rem;">
        We're a community of local chefs on a shared mission: to make private dining effortless—and unforgettable. Whether you're planning an intimate dinner, a wedding, or a weekend retreat, we'll match you with the perfect chef to bring your vision to life through thoughtful, beautifully prepared food.
      </p>
      
      <h4 style="font-size: 1.1rem; text-align: center; color: #1D3557; margin: 30px 0 20px;">What Makes Us Different</h4>
      
      <div style="margin-bottom: 30px;">
        <div style="background-color: #F9F7F2; border-left: 3px solid #1D3557; border-radius: 5px; padding: 20px; margin-bottom: 15px;">
          <h5 style="font-size: 1rem; color: #1D3557; margin-bottom: 10px;">Global Talent, Local Roots</h5>
          <p style="margin: 0; font-size: 0.9rem;">From Michelin-trained masters to creative culinary artisans, our chefs bring world-class skill to Santa Barbara tables. Every chef is personally vetted and selected not just for talent, but for hospitality and heart.</p>
        </div>
        
        <div style="background-color: #F9F7F2; border-left: 3px solid #1D3557; border-radius: 5px; padding: 20px; margin-bottom: 15px;">
          <h5 style="font-size: 1rem; color: #1D3557; margin-bottom: 10px;">Connecting Great Chefs with Great Clients</h5>
          <p style="margin: 0; font-size: 0.9rem;">Our platform makes it easy to browse and connect with top local chefs. Every detail is handled with care, so you can focus on the experience, not the logistics.</p>
        </div>
        
        <div style="background-color: #F9F7F2; border-left: 3px solid #1D3557; border-radius: 5px; padding: 20px; margin-bottom: 15px;">
          <h5 style="font-size: 1rem; color: #1D3557; margin-bottom: 10px;">Celebrating Local Flavor</h5>
          <p style="margin: 0; font-size: 0.9rem;">We partner with Santa Barbara farmers, fishers, and foragers to create dishes that reflect the vibrant spirit of the Central Coast. Every meal is a celebration of community, seasonality, and creativity.</p>
        </div>
      </div>
      
      <div style="text-align: center; margin: 30px 0;">
        <div style="display: inline-block; position: relative; width: 70%; height: 1px; background: linear-gradient(to right, rgba(230, 219, 201, 0), rgba(230, 219, 201, 1) 20%, rgba(230, 219, 201, 1) 80%, rgba(230, 219, 201, 0));">
          <div style="position: absolute; top: -1px; left: 50%; transform: translateX(-50%); width: 40%; height: 3px; background: linear-gradient(to right, rgba(29, 53, 87, 0), rgba(29, 53, 87, 1) 20%, rgba(29, 53, 87, 1) 80%, rgba(29, 53, 87, 0));"></div>
        </div>
      </div>
      
      <h4 style="font-size: 1.1rem; text-align: center; color: #1D3557; margin: 30px 0 20px;">Our Founder's Story</h4>
      
      <div style="margin-bottom: 30px;">
        <div style="max-width: 300px; margin: 0 auto 20px;">
          <img src="/SBCC-Images/coco-portrait.jpg" alt="Coco, Founder of Santa Barbara Chef Collective" style="width: 100%; height: auto; border-radius: 5px;">
        </div>
        
        <div>
          <p style="font-size: 0.9rem;">I had the joy of being a private yacht chef for eight years, cooking for royalty, celebrities, and adventurers while sailing the globe. But my passion for food began earlier, in the fresh markets of France, where I fell in love with seasonal ingredients, aged cheeses, and the art of gathering.</p>
          <p style="font-size: 0.9rem;">Motivated by that culture, I trained at Tante Marie's in San Francisco and have never stopped cooking since. From buying octopus in a Greek village to slicing fresh-caught sashimi in Alaska, I've always believed food should reflect where you are and who you're with.</p>
          <p style="font-size: 0.9rem;">Now rooted in Santa Barbara and close to family, I cook for local events and gatherings using vibrant, organic California ingredients. I specialize in Mediterranean and raw cuisine and love meals that make you feel great, body and soul.</p>
          <p style="font-size: 0.9rem;">Founding the Chef Collective let me bring together a team of chefs who care deeply about food, craft, and connection. I'm so glad you're here.</p>
          <p style="font-style: italic; text-align: right; font-size: 0.9rem;">— Coco</p>
        </div>
      </div>
      
      <div style="text-align: center; margin: 30px 0;">
        <div style="display: inline-block; position: relative; width: 70%; height: 1px; background: linear-gradient(to right, rgba(230, 219, 201, 0), rgba(230, 219, 201, 1) 20%, rgba(230, 219, 201, 1) 80%, rgba(230, 219, 201, 0));">
          <div style="position: absolute; top: -1px; left: 50%; transform: translateX(-50%); width: 40%; height: 3px; background: linear-gradient(to right, rgba(29, 53, 87, 0), rgba(29, 53, 87, 1) 20%, rgba(29, 53, 87, 1) 80%, rgba(29, 53, 87, 0));"></div>
        </div>
      </div>
      
      <h4 style="font-size: 1.1rem; text-align: center; color: #1D3557; margin: 30px 0 20px;">The Process</h4>
      
      <div style="margin-bottom: 30px;">
        <div style="display: flex; background-color: #F9F7F2; border-left: 3px solid #1D3557; border-radius: 5px; padding: 20px; margin-bottom: 15px;">
          <div style="width: 36px; height: 36px; background-color: #1D3557; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; flex-shrink: 0;">1</div>
          <div>
            <h5 style="font-size: 1rem; color: #1D3557; margin: 0 0 5px;">Chef Selection</h5>
            <p style="margin: 0; font-size: 0.9rem;">Once you reach out, we'll send you curated resumes from chefs matched to your tastes, event style, and household needs.</p>
          </div>
        </div>
        
        <div style="display: flex; background-color: #F9F7F2; border-left: 3px solid #1D3557; border-radius: 5px; padding: 20px; margin-bottom: 15px;">
          <div style="width: 36px; height: 36px; background-color: #1D3557; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; flex-shrink: 0;">2</div>
          <div>
            <h5 style="font-size: 1rem; color: #1D3557; margin: 0 0 5px;">Personal Interviews</h5>
            <p style="margin: 0; font-size: 0.9rem;">You'll meet the chefs to ensure their style, personality, and creativity align with your vision.</p>
          </div>
        </div>
        
        <div style="display: flex; background-color: #F9F7F2; border-left: 3px solid #1D3557; border-radius: 5px; padding: 20px; margin-bottom: 15px;">
          <div style="width: 36px; height: 36px; background-color: #1D3557; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; flex-shrink: 0;">3</div>
          <div>
            <h5 style="font-size: 1rem; color: #1D3557; margin: 0 0 5px;">The Perfect Match</h5>
            <p style="margin: 0; font-size: 0.9rem;">With our guidance, you'll choose the chef who best fits the bill—someone who will turn your gathering into something truly memorable.</p>
          </div>
        </div>
      </div>
    `;
    
    console.log('Our Story accordion content updated successfully');
  }
  
  // Add a slight delay to ensure the accordion exists in DOM
  setTimeout(fixOurStoryAccordion, 1000);
});
