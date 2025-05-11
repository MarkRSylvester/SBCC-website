/**
 * Extreme Grid Fix - Direct DOM manipulation approach
 * This approach replaces the entire modal content with iframes to ensure isolation
 */
(function() {
  // This script intentionally uses pure DOM manipulation to avoid jQuery conflicts
  
  // Function to inject our grid content
  function injectContent() {
    console.log('Applying extreme grid fix');
    
    // If we can't modify the content directly, let's build a fresh approach
    
    // 1. Create fixed HTML content for Beyond the Table
    const beyondTableHTML = `
    <style>
      .sbcc-grid-container {
        display: block !important; /* Ensure it's displayed */
        width: 100% !important;
        max-width: 100% !important;
        margin: 0 auto !important;
      }
      .sbcc-intro {
        text-align: center !important;
        margin: 0 auto 30px auto !important;
        max-width: 90% !important;
        color: #555 !important;
        line-height: 1.6 !important;
        font-family: 'Inter', sans-serif !important;
        font-size: 16px !important;
      }
      .sbcc-grid {
        display: grid !important;
        grid-template-columns: repeat(2, 1fr) !important;
        grid-template-rows: auto auto !important;
        gap: 20px !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      .sbcc-card {
        background-color: #f8f8f4 !important;
        border-radius: 5px !important;
        box-shadow: 0 2px 8px rgba(0,0,0,0.08) !important;
        padding: 20px !important;
        display: flex !important;
        flex-direction: column !important;
      }
      .sbcc-card h3 {
        font-family: 'Playfair Display', serif !important;
        color: #1D3557 !important;
        font-size: 22px !important;
        text-align: center !important;
        margin-top: 0 !important;
        margin-bottom: 15px !important;
      }
      .sbcc-divider {
        height: 2px !important;
        background: linear-gradient(to right, transparent 0%, #A2A284 50%, transparent 100%) !important;
        width: 70% !important;
        margin: 0 auto 20px auto !important;
      }
      .sbcc-list {
        list-style-type: none !important;
        padding: 0 !important;
        margin: 0 !important;
      }
      .sbcc-list li {
        position: relative !important;
        padding-left: 20px !important;
        margin-bottom: 12px !important;
        font-family: 'Inter', sans-serif !important;
        color: #555 !important;
        line-height: 1.4 !important;
      }
      .sbcc-list li:before {
        content: '' !important;
        position: absolute !important;
        left: 0 !important;
        top: 7px !important;
        width: 6px !important;
        height: 6px !important;
        border-radius: 50% !important;
        background-color: #A2A284 !important;
      }
      @media (max-width: 767px) {
        .sbcc-grid {
          grid-template-columns: 1fr !important;
        }
      }
    </style>
    
    <div class="sbcc-grid-container">
      <p class="sbcc-intro">Extend your culinary experience beyond the dining table with our complementary offerings designed to enhance every aspect of your gathering.</p>
      
      <div class="sbcc-grid">
        <!-- Card 1 -->
        <div class="sbcc-card">
          <h3>Wine Pairing Guidance</h3>
          <div class="sbcc-divider"></div>
          <ul class="sbcc-list">
            <li>Expert wine recommendations tailored to your menu</li>
            <li>Curated selections from local Santa Barbara vineyards</li>
            <li>In-home wine tasting experiences with sommeliers</li>
            <li>Custom flight creation for multi-course experiences</li>
          </ul>
        </div>
        
        <!-- Card 2 -->
        <div class="sbcc-card">
          <h3>Table Setting & Styling</h3>
          <div class="sbcc-divider"></div>
          <ul class="sbcc-list">
            <li>Elegant table design customized to your occasion</li>
            <li>Premium linens, dinnerware, and glassware</li>
            <li>Seasonal floral arrangements from local growers</li>
            <li>Ambient lighting to create the perfect atmosphere</li>
          </ul>
        </div>
        
        <!-- Card 3 -->
        <div class="sbcc-card">
          <h3>Bartending Services</h3>
          <div class="sbcc-divider"></div>
          <ul class="sbcc-list">
            <li>Professional bartenders to serve drinks at your event</li>
            <li>Experienced mixologists who provide attentive service</li>
            <li>Connects you with trusted bartending professionals</li>
            <li>Custom cocktail menus featuring local ingredients</li>
          </ul>
        </div>
        
        <!-- Card 4 -->
        <div class="sbcc-card">
          <h3>Specialty Cocktails</h3>
          <div class="sbcc-divider"></div>
          <ul class="sbcc-list">
            <li>Custom cocktail mixers created by your chef</li>
            <li>Unique flavor combinations to complement your menu</li>
            <li>Ready to add to your choice of liquor</li>
            <li>Seasonal ingredients that reflect Santa Barbara's bounty</li>
          </ul>
        </div>
      </div>
    </div>
    `;
    
    // 2. Create fixed HTML content for Gatherings
    const gatheringsHTML = `
    <style>
      .sbcc-grid-container {
        display: block !important; /* Ensure it's displayed */
        width: 100% !important;
        max-width: 100% !important;
        margin: 0 auto !important;
      }
      .sbcc-intro {
        text-align: center !important;
        margin: 0 auto 30px auto !important;
        max-width: 90% !important;
        color: #555 !important;
        line-height: 1.6 !important;
        font-family: 'Inter', sans-serif !important;
        font-size: 16px !important;
      }
      .sbcc-grid {
        display: grid !important;
        grid-template-columns: repeat(2, 1fr) !important;
        grid-template-rows: auto auto !important;
        gap: 20px !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      .sbcc-card {
        background-color: #f8f8f4 !important;
        border-radius: 5px !important;
        box-shadow: 0 2px 8px rgba(0,0,0,0.08) !important;
        padding: 20px !important;
        display: flex !important;
        flex-direction: column !important;
      }
      .sbcc-card h3 {
        font-family: 'Playfair Display', serif !important;
        color: #1D3557 !important;
        font-size: 22px !important;
        text-align: center !important;
        margin-top: 0 !important;
        margin-bottom: 15px !important;
      }
      .sbcc-divider {
        height: 2px !important;
        background: linear-gradient(to right, transparent 0%, #A2A284 50%, transparent 100%) !important;
        width: 70% !important;
        margin: 0 auto 20px auto !important;
      }
      .sbcc-list {
        list-style-type: none !important;
        padding: 0 !important;
        margin: 0 !important;
      }
      .sbcc-list li {
        position: relative !important;
        padding-left: 20px !important;
        margin-bottom: 12px !important;
        font-family: 'Inter', sans-serif !important;
        color: #555 !important;
        line-height: 1.4 !important;
      }
      .sbcc-list li:before {
        content: '' !important;
        position: absolute !important;
        left: 0 !important;
        top: 7px !important;
        width: 6px !important;
        height: 6px !important;
        border-radius: 50% !important;
        background-color: #A2A284 !important;
      }
      @media (max-width: 767px) {
        .sbcc-grid {
          grid-template-columns: 1fr !important;
        }
      }
    </style>
    
    <div class="sbcc-grid-container">
      <p class="sbcc-intro">From intimate dinner parties to milestone celebrations, our chefs create custom menus that reflect your vision and delight your guests.</p>
      
      <div class="sbcc-grid">
        <!-- Card 1 -->
        <div class="sbcc-card">
          <h3>Dinner Parties</h3>
          <div class="sbcc-divider"></div>
          <ul class="sbcc-list">
            <li>Fresh, colorful cooking with customized menu experiences</li>
            <li>Options for coursed meals or family-style serving</li>
            <li>All-inclusive service with shopping, preparation, cooking</li>
            <li>Pricing based on group size, starting at $155-$190 per person</li>
          </ul>
        </div>
        
        <!-- Card 2 -->
        <div class="sbcc-card">
          <h3>Date Night</h3>
          <div class="sbcc-divider"></div>
          <ul class="sbcc-list">
            <li>Exclusive dining experience perfect for couples</li>
            <li>Intimate table settings with candles and ambient touches</li>
            <li>Customized menu based on your preferences</li>
            <li>Expert wine pairing recommendations</li>
          </ul>
        </div>
        
        <!-- Card 3 -->
        <div class="sbcc-card">
          <h3>Special Occasions</h3>
          <div class="sbcc-divider"></div>
          <ul class="sbcc-list">
            <li>Celebrations for birthdays, anniversaries, or achievements</li>
            <li>Menus tailored to honor the occasion</li>
            <li>Memorable culinary experiences from first toast to final dessert</li>
            <li>Personalized touches that make the day extraordinary</li>
          </ul>
        </div>
        
        <!-- Card 4 -->
        <div class="sbcc-card">
          <h3>Corporate Events</h3>
          <div class="sbcc-divider"></div>
          <ul class="sbcc-list">
            <li>Professional catering for business gatherings</li>
            <li>Executive lunches, client meetings, team celebrations</li>
            <li>Sophisticated experiences reflecting your company's standards</li>
            <li>Impressive presentations that elevate your business events</li>
          </ul>
        </div>
      </div>
    </div>
    `;
    
    // 3. Now create and inject isolating iframes into the appropriate accordion sections
    
    function createIsolatedContent(htmlContent) {
      // Create a container with position to ensure it can fill the parent
      const container = document.createElement('div');
      container.style.cssText = 'position: relative; width: 100%; height: auto; min-height: 600px; overflow: visible;';
      
      // Create an iframe to truly isolate the content from page CSS
      const iframe = document.createElement('iframe');
      iframe.style.cssText = 'border: none; width: 100%; height: 100%; position: absolute; top: 0; left: 0; right: 0; bottom: 0;';
      iframe.setAttribute('scrolling', 'no');
      iframe.setAttribute('frameborder', '0');
      
      // Add the iframe to the container
      container.appendChild(iframe);
      
      // Once the iframe is loaded, set its content and resize it to fit the content
      iframe.onload = function() {
        // Get the document inside the iframe
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        
        // Write the HTML content to the iframe
        iframeDoc.open();
        iframeDoc.write(htmlContent);
        iframeDoc.close();
        
        // Add script to resize iframe based on content height
        const resizeScript = document.createElement('script');
        resizeScript.textContent = `
          function resizeIframe() {
            const height = document.documentElement.scrollHeight;
            window.parent.postMessage({ height: height }, '*');
          }
          
          // Resize on load and whenever content changes
          window.addEventListener('load', resizeIframe);
          window.addEventListener('resize', resizeIframe);
          
          // Also create a MutationObserver to watch for DOM changes
          const observer = new MutationObserver(resizeIframe);
          observer.observe(document.body, { subtree: true, attributes: true, childList: true });
          
          // Initial resize
          setTimeout(resizeIframe, 100);
        `;
        iframeDoc.body.appendChild(resizeScript);
        
        // Listen for resize message from iframe
        window.addEventListener('message', function(e) {
          if (e.data && e.data.height) {
            iframe.style.height = (e.data.height + 40) + 'px'; // Add some buffer
          }
        });
      };
      
      return container;
    }
    
    // Find accordions and replace their content if found
    const beyondTableContent = document.querySelector('#beyond-table-accordion .accordion-content');
    if (beyondTableContent) {
      // Clear current content
      beyondTableContent.innerHTML = '';
      
      // Create and append isolated content
      const isolatedContent = createIsolatedContent(beyondTableHTML);
      beyondTableContent.appendChild(isolatedContent);
      
      console.log('Beyond Table content replaced with iframe');
    }
    
    const gatheringsContent = document.querySelector('#gatherings-accordion .accordion-content');
    if (gatheringsContent) {
      // Clear current content
      gatheringsContent.innerHTML = '';
      
      // Create and append isolated content
      const isolatedContent = createIsolatedContent(gatheringsHTML);
      gatheringsContent.appendChild(isolatedContent);
      
      console.log('Gatherings content replaced with iframe');
    }
  }
  
  // Wait for DOM to be fully loaded, then try multiple times
  window.addEventListener('load', function() {
    // Try immediately
    injectContent();
    
    // Try again after delay in case first attempt didn't catch
    setTimeout(injectContent, 1000);
    
    // Try again after modal is opened (listen for clicks on modal triggers)
    document.addEventListener('click', function(e) {
      // If this was a click on something that opens the modal
      if (e.target && (e.target.getAttribute('data-modal') === 'explore' || 
          e.target.getAttribute('data-modal') === 'explore-modal')) {
        
        console.log('Modal trigger clicked, will inject content shortly');
        
        // Wait a moment for modal to open, then inject content
        setTimeout(injectContent, 500);
      }
    });
    
    // Also set interval to keep checking and fixing
    setInterval(function() {
      // Check if accordions are visible/active but content is missing our grid
      const beyondTableAccordion = document.querySelector('#beyond-table-accordion.active');
      const gatheringsAccordion = document.querySelector('#gatherings-accordion.active');
      
      if (beyondTableAccordion || gatheringsAccordion) {
        // Check if our container is missing
        const beyondTableIframe = document.querySelector('#beyond-table-accordion .accordion-content iframe');
        const gatheringsIframe = document.querySelector('#gatherings-accordion .accordion-content iframe');
        
        if ((beyondTableAccordion && !beyondTableIframe) || 
            (gatheringsAccordion && !gatheringsIframe)) {
          console.log('Active accordion missing our content - reinserting');
          injectContent();
        }
      }
    }, 2000);
  });
})();
