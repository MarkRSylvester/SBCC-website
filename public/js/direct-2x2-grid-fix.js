/**
 * Directly force a 2x2 grid by completely replacing the content
 */
(function() {
  // Run this script after a delay to ensure page is loaded
  setTimeout(function() {
    // Get the accordion sections
    const beyondTableSection = document.getElementById('beyond-table-accordion');
    const gatheringsSection = document.getElementById('gatherings-accordion');
    
    // Directly replace the Beyond the Table content
    if (beyondTableSection) {
      const contentDiv = beyondTableSection.querySelector('.accordion-content');
      if (contentDiv) {
        contentDiv.innerHTML = `
          <p class="section-intro" style="text-align: center; max-width: 90%; margin: 0 auto 1.5rem auto; color: #555; line-height: 1.6;">
            Extend your culinary experience beyond the dining table with our complementary offerings designed to enhance every aspect of your gathering.
          </p>
          
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin-top: 2rem;">
            <!-- Card 1 -->
            <div style="background-color: #f8f8f4; padding: 1.5rem; border-radius: 4px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);">
              <h4 style="font-family: 'Playfair Display', serif; color: #1D3557; font-size: 1.5rem; margin-bottom: 1rem; text-align: center;">Wine Pairing Guidance</h4>
              <div style="height: 2px; background: linear-gradient(to right, transparent 0%, #A2A284 50%, transparent 100%); margin: 0.75rem auto 1.25rem auto; width: 80%; max-width: 150px;"></div>
              <ul style="list-style-type: none; padding: 0; margin: 0;">
                <li style="position: relative; padding-left: 1.5rem; margin-bottom: 0.75rem; line-height: 1.5; color: #555;">
                  <span style="position: absolute; left: 0; top: 0.6em; width: 6px; height: 6px; border-radius: 50%; background-color: #A2A284;"></span>
                  Expert wine recommendations tailored to your menu
                </li>
                <li style="position: relative; padding-left: 1.5rem; margin-bottom: 0.75rem; line-height: 1.5; color: #555;">
                  <span style="position: absolute; left: 0; top: 0.6em; width: 6px; height: 6px; border-radius: 50%; background-color: #A2A284;"></span>
                  Curated selections from local Santa Barbara vineyards
                </li>
                <li style="position: relative; padding-left: 1.5rem; margin-bottom: 0.75rem; line-height: 1.5; color: #555;">
                  <span style="position: absolute; left: 0; top: 0.6em; width: 6px; height: 6px; border-radius: 50%; background-color: #A2A284;"></span>
                  In-home wine tasting experiences with sommeliers
                </li>
                <li style="position: relative; padding-left: 1.5rem; margin-bottom: 0.75rem; line-height: 1.5; color: #555;">
                  <span style="position: absolute; left: 0; top: 0.6em; width: 6px; height: 6px; border-radius: 50%; background-color: #A2A284;"></span>
                  Custom flight creation for multi-course experiences
                </li>
              </ul>
            </div>
            
            <!-- Card 2 -->
            <div style="background-color: #f8f8f4; padding: 1.5rem; border-radius: 4px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);">
              <h4 style="font-family: 'Playfair Display', serif; color: #1D3557; font-size: 1.5rem; margin-bottom: 1rem; text-align: center;">Table Setting & Styling</h4>
              <div style="height: 2px; background: linear-gradient(to right, transparent 0%, #A2A284 50%, transparent 100%); margin: 0.75rem auto 1.25rem auto; width: 80%; max-width: 150px;"></div>
              <ul style="list-style-type: none; padding: 0; margin: 0;">
                <li style="position: relative; padding-left: 1.5rem; margin-bottom: 0.75rem; line-height: 1.5; color: #555;">
                  <span style="position: absolute; left: 0; top: 0.6em; width: 6px; height: 6px; border-radius: 50%; background-color: #A2A284;"></span>
                  Elegant table design customized to your occasion
                </li>
                <li style="position: relative; padding-left: 1.5rem; margin-bottom: 0.75rem; line-height: 1.5; color: #555;">
                  <span style="position: absolute; left: 0; top: 0.6em; width: 6px; height: 6px; border-radius: 50%; background-color: #A2A284;"></span>
                  Premium linens, dinnerware, and glassware
                </li>
                <li style="position: relative; padding-left: 1.5rem; margin-bottom: 0.75rem; line-height: 1.5; color: #555;">
                  <span style="position: absolute; left: 0; top: 0.6em; width: 6px; height: 6px; border-radius: 50%; background-color: #A2A284;"></span>
                  Seasonal floral arrangements from local growers
                </li>
                <li style="position: relative; padding-left: 1.5rem; margin-bottom: 0.75rem; line-height: 1.5; color: #555;">
                  <span style="position: absolute; left: 0; top: 0.6em; width: 6px; height: 6px; border-radius: 50%; background-color: #A2A284;"></span>
                  Ambient lighting to create the perfect atmosphere
                </li>
              </ul>
            </div>
            
            <!-- Card 3 -->
            <div style="background-color: #f8f8f4; padding: 1.5rem; border-radius: 4px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);">
              <h4 style="font-family: 'Playfair Display', serif; color: #1D3557; font-size: 1.5rem; margin-bottom: 1rem; text-align: center;">Bartending Services</h4>
              <div style="height: 2px; background: linear-gradient(to right, transparent 0%, #A2A284 50%, transparent 100%); margin: 0.75rem auto 1.25rem auto; width: 80%; max-width: 150px;"></div>
              <ul style="list-style-type: none; padding: 0; margin: 0;">
                <li style="position: relative; padding-left: 1.5rem; margin-bottom: 0.75rem; line-height: 1.5; color: #555;">
                  <span style="position: absolute; left: 0; top: 0.6em; width: 6px; height: 6px; border-radius: 50%; background-color: #A2A284;"></span>
                  Professional bartenders to serve drinks at your event
                </li>
                <li style="position: relative; padding-left: 1.5rem; margin-bottom: 0.75rem; line-height: 1.5; color: #555;">
                  <span style="position: absolute; left: 0; top: 0.6em; width: 6px; height: 6px; border-radius: 50%; background-color: #A2A284;"></span>
                  Experienced mixologists who provide attentive service
                </li>
                <li style="position: relative; padding-left: 1.5rem; margin-bottom: 0.75rem; line-height: 1.5; color: #555;">
                  <span style="position: absolute; left: 0; top: 0.6em; width: 6px; height: 6px; border-radius: 50%; background-color: #A2A284;"></span>
                  Connects you with trusted bartending professionals
                </li>
                <li style="position: relative; padding-left: 1.5rem; margin-bottom: 0.75rem; line-height: 1.5; color: #555;">
                  <span style="position: absolute; left: 0; top: 0.6em; width: 6px; height: 6px; border-radius: 50%; background-color: #A2A284;"></span>
                  Custom cocktail menus featuring local ingredients
                </li>
              </ul>
            </div>
            
            <!-- Card 4 -->
            <div style="background-color: #f8f8f4; padding: 1.5rem; border-radius: 4px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);">
              <h4 style="font-family: 'Playfair Display', serif; color: #1D3557; font-size: 1.5rem; margin-bottom: 1rem; text-align: center;">Specialty Cocktails</h4>
              <div style="height: 2px; background: linear-gradient(to right, transparent 0%, #A2A284 50%, transparent 100%); margin: 0.75rem auto 1.25rem auto; width: 80%; max-width: 150px;"></div>
              <ul style="list-style-type: none; padding: 0; margin: 0;">
                <li style="position: relative; padding-left: 1.5rem; margin-bottom: 0.75rem; line-height: 1.5; color: #555;">
                  <span style="position: absolute; left: 0; top: 0.6em; width: 6px; height: 6px; border-radius: 50%; background-color: #A2A284;"></span>
                  Custom cocktail mixers created by your chef
                </li>
                <li style="position: relative; padding-left: 1.5rem; margin-bottom: 0.75rem; line-height: 1.5; color: #555;">
                  <span style="position: absolute; left: 0; top: 0.6em; width: 6px; height: 6px; border-radius: 50%; background-color: #A2A284;"></span>
                  Unique flavor combinations to complement your menu
                </li>
                <li style="position: relative; padding-left: 1.5rem; margin-bottom: 0.75rem; line-height: 1.5; color: #555;">
                  <span style="position: absolute; left: 0; top: 0.6em; width: 6px; height: 6px; border-radius: 50%; background-color: #A2A284;"></span>
                  Ready to add to your choice of liquor
                </li>
                <li style="position: relative; padding-left: 1.5rem; margin-bottom: 0.75rem; line-height: 1.5; color: #555;">
                  <span style="position: absolute; left: 0; top: 0.6em; width: 6px; height: 6px; border-radius: 50%; background-color: #A2A284;"></span>
                  Seasonal ingredients that reflect Santa Barbara's bounty
                </li>
              </ul>
            </div>
          </div>
        `;
      }
    }
    
    // Also fix the Gatherings section if needed
    if (gatheringsSection) {
      const contentDiv = gatheringsSection.querySelector('.accordion-content');
      if (contentDiv) {
        contentDiv.innerHTML = `
          <p class="section-intro" style="text-align: center; max-width: 90%; margin: 0 auto 1.5rem auto; color: #555; line-height: 1.6;">
            From intimate dinner parties to milestone celebrations, our chefs create custom menus that reflect your vision and delight your guests. We handle everything from menu planning to execution, allowing you to be fully present as a host.
          </p>
          
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin-top: 2rem;">
            <!-- Card 1 -->
            <div style="background-color: #f8f8f4; padding: 1.5rem; border-radius: 4px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);">
              <h4 style="font-family: 'Playfair Display', serif; color: #1D3557; font-size: 1.5rem; margin-bottom: 1rem; text-align: center;">Dinner Parties</h4>
              <div style="height: 2px; background: linear-gradient(to right, transparent 0%, #A2A284 50%, transparent 100%); margin: 0.75rem auto 1.25rem auto; width: 80%; max-width: 150px;"></div>
              <ul style="list-style-type: none; padding: 0; margin: 0;">
                <li style="position: relative; padding-left: 1.5rem; margin-bottom: 0.75rem; line-height: 1.5; color: #555;">
                  <span style="position: absolute; left: 0; top: 0.6em; width: 6px; height: 6px; border-radius: 50%; background-color: #A2A284;"></span>
                  Fresh, colorful cooking with customized menu experiences
                </li>
                <li style="position: relative; padding-left: 1.5rem; margin-bottom: 0.75rem; line-height: 1.5; color: #555;">
                  <span style="position: absolute; left: 0; top: 0.6em; width: 6px; height: 6px; border-radius: 50%; background-color: #A2A284;"></span>
                  Options for coursed meals or family-style serving
                </li>
                <li style="position: relative; padding-left: 1.5rem; margin-bottom: 0.75rem; line-height: 1.5; color: #555;">
                  <span style="position: absolute; left: 0; top: 0.6em; width: 6px; height: 6px; border-radius: 50%; background-color: #A2A284;"></span>
                  All-inclusive service with shopping, preparation, cooking
                </li>
                <li style="position: relative; padding-left: 1.5rem; margin-bottom: 0.75rem; line-height: 1.5; color: #555;">
                  <span style="position: absolute; left: 0; top: 0.6em; width: 6px; height: 6px; border-radius: 50%; background-color: #A2A284;"></span>
                  Pricing based on group size, starting at $155-$190 per person
                </li>
              </ul>
            </div>
            
            <!-- Card 2 -->
            <div style="background-color: #f8f8f4; padding: 1.5rem; border-radius: 4px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);">
              <h4 style="font-family: 'Playfair Display', serif; color: #1D3557; font-size: 1.5rem; margin-bottom: 1rem; text-align: center;">Date Night</h4>
              <div style="height: 2px; background: linear-gradient(to right, transparent 0%, #A2A284 50%, transparent 100%); margin: 0.75rem auto 1.25rem auto; width: 80%; max-width: 150px;"></div>
              <ul style="list-style-type: none; padding: 0; margin: 0;">
                <li style="position: relative; padding-left: 1.5rem; margin-bottom: 0.75rem; line-height: 1.5; color: #555;">
                  <span style="position: absolute; left: 0; top: 0.6em; width: 6px; height: 6px; border-radius: 50%; background-color: #A2A284;"></span>
                  Exclusive dining experience perfect for couples
                </li>
                <li style="position: relative; padding-left: 1.5rem; margin-bottom: 0.75rem; line-height: 1.5; color: #555;">
                  <span style="position: absolute; left: 0; top: 0.6em; width: 6px; height: 6px; border-radius: 50%; background-color: #A2A284;"></span>
                  Intimate table settings with candles and ambient touches
                </li>
                <li style="position: relative; padding-left: 1.5rem; margin-bottom: 0.75rem; line-height: 1.5; color: #555;">
                  <span style="position: absolute; left: 0; top: 0.6em; width: 6px; height: 6px; border-radius: 50%; background-color: #A2A284;"></span>
                  Customized menu based on your preferences
                </li>
                <li style="position: relative; padding-left: 1.5rem; margin-bottom: 0.75rem; line-height: 1.5; color: #555;">
                  <span style="position: absolute; left: 0; top: 0.6em; width: 6px; height: 6px; border-radius: 50%; background-color: #A2A284;"></span>
                  Expert wine pairing recommendations
                </li>
              </ul>
            </div>
            
            <!-- Card 3 -->
            <div style="background-color: #f8f8f4; padding: 1.5rem; border-radius: 4px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);">
              <h4 style="font-family: 'Playfair Display', serif; color: #1D3557; font-size: 1.5rem; margin-bottom: 1rem; text-align: center;">Special Occasions</h4>
              <div style="height: 2px; background: linear-gradient(to right, transparent 0%, #A2A284 50%, transparent 100%); margin: 0.75rem auto 1.25rem auto; width: 80%; max-width: 150px;"></div>
              <ul style="list-style-type: none; padding: 0; margin: 0;">
                <li style="position: relative; padding-left: 1.5rem; margin-bottom: 0.75rem; line-height: 1.5; color: #555;">
                  <span style="position: absolute; left: 0; top: 0.6em; width: 6px; height: 6px; border-radius: 50%; background-color: #A2A284;"></span>
                  Celebrations for birthdays, anniversaries, or achievements
                </li>
                <li style="position: relative; padding-left: 1.5rem; margin-bottom: 0.75rem; line-height: 1.5; color: #555;">
                  <span style="position: absolute; left: 0; top: 0.6em; width: 6px; height: 6px; border-radius: 50%; background-color: #A2A284;"></span>
                  Menus tailored to honor the occasion
                </li>
                <li style="position: relative; padding-left: 1.5rem; margin-bottom: 0.75rem; line-height: 1.5; color: #555;">
                  <span style="position: absolute; left: 0; top: 0.6em; width: 6px; height: 6px; border-radius: 50%; background-color: #A2A284;"></span>
                  Memorable culinary experiences from first toast to final dessert
                </li>
                <li style="position: relative; padding-left: 1.5rem; margin-bottom: 0.75rem; line-height: 1.5; color: #555;">
                  <span style="position: absolute; left: 0; top: 0.6em; width: 6px; height: 6px; border-radius: 50%; background-color: #A2A284;"></span>
                  Personalized touches that make the day extraordinary
                </li>
              </ul>
            </div>
            
            <!-- Card 4 -->
            <div style="background-color: #f8f8f4; padding: 1.5rem; border-radius: 4px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);">
              <h4 style="font-family: 'Playfair Display', serif; color: #1D3557; font-size: 1.5rem; margin-bottom: 1rem; text-align: center;">Corporate Events</h4>
              <div style="height: 2px; background: linear-gradient(to right, transparent 0%, #A2A284 50%, transparent 100%); margin: 0.75rem auto 1.25rem auto; width: 80%; max-width: 150px;"></div>
              <ul style="list-style-type: none; padding: 0; margin: 0;">
                <li style="position: relative; padding-left: 1.5rem; margin-bottom: 0.75rem; line-height: 1.5; color: #555;">
                  <span style="position: absolute; left: 0; top: 0.6em; width: 6px; height: 6px; border-radius: 50%; background-color: #A2A284;"></span>
                  Professional catering for business gatherings
                </li>
                <li style="position: relative; padding-left: 1.5rem; margin-bottom: 0.75rem; line-height: 1.5; color: #555;">
                  <span style="position: absolute; left: 0; top: 0.6em; width: 6px; height: 6px; border-radius: 50%; background-color: #A2A284;"></span>
                  Executive lunches, client meetings, team celebrations
                </li>
                <li style="position: relative; padding-left: 1.5rem; margin-bottom: 0.75rem; line-height: 1.5; color: #555;">
                  <span style="position: absolute; left: 0; top: 0.6em; width: 6px; height: 6px; border-radius: 50%; background-color: #A2A284;"></span>
                  Sophisticated experiences reflecting your company's standards
                </li>
                <li style="position: relative; padding-left: 1.5rem; margin-bottom: 0.75rem; line-height: 1.5; color: #555;">
                  <span style="position: absolute; left: 0; top: 0.6em; width: 6px; height: 6px; border-radius: 50%; background-color: #A2A284;"></span>
                  Impressive presentations that elevate your business events
                </li>
              </ul>
            </div>
          </div>
        `;
      }
    }
  }, 1000);
})();
