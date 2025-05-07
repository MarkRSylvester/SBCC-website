// Our Story Section Implementation
document.addEventListener('DOMContentLoaded', function() {
  // Create the Our Story section HTML
  const ourStoryHTML = `
    <section class="our-story-section">
      <div class="our-story-accordion">
        <div class="accordion-item">
          <div class="accordion-header" aria-expanded="false">
            <h3>Our Story</h3>
            <div class="accordion-icon">+</div>
          </div>
          
          <div class="accordion-content">
            <div class="founder-story">
              <div class="founder-image">
                <img src="SBCC-Images/chef-coco.jpg" alt="Chef Coco, Founder of Santa Barbara Chef Collective" class="rounded-image">
              </div>
              
              <div class="founder-bio">
                <p>I had the joy of being a private yacht chef for eight years—cooking for royalty, celebrities, and adventurers while sailing across the globe. But my roots in food go back to the markets of France, where I fell in love with fresh ingredients, rich cheeses, and the art of gathering around a table. Inspired by that culture, I trained at Tante Marie's in San Francisco and have never stopped cooking since.</p>
                
                <p>Whether buying octopus in a Greek fishing village, harvesting bananas in French Polynesia, or serving fresh-caught Alaskan sashimi on deck, I've always believed food should reflect where you are and who you're with. Now, back home in Santa Barbara and close to family, I cook for private events and local families using vibrant California ingredients. I specialize in Mediterranean and raw cuisine and love creating meals that feel good—body and soul.</p>
                
                <p>Founding the Santa Barbara Chef Collective has allowed me to bring together a talented circle of chefs who care deeply about craft, connection, and creating something beautiful with food. I'm so glad you're here.</p>
                
                <p class="founder-signature">– <strong>Coco</strong></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  // Insert the Our Story section before the Beyond the Table section
  const beyondTableSection = document.querySelector('#beyond-table-accordion');
  if (beyondTableSection) {
    beyondTableSection.insertAdjacentHTML('beforebegin', ourStoryHTML);
  }

  // Initialize the accordion functionality for the Our Story section
  const ourStoryHeader = document.querySelector('.our-story-section .accordion-header');
  if (ourStoryHeader) {
    ourStoryHeader.addEventListener('click', function() {
      const accordionItem = this.closest('.accordion-item');
      const isActive = accordionItem.classList.contains('active');
      
      // Close all other accordions first
      const allAccordionItems = document.querySelectorAll('.accordion-item');
      allAccordionItems.forEach(item => {
        if (item !== accordionItem && item.classList.contains('active')) {
          item.classList.remove('active');
          const icon = item.querySelector('.accordion-icon');
          if (icon) {
            icon.textContent = '+';
          }
        }
      });
      
      // Toggle active class
      accordionItem.classList.toggle('active');
      
      // Update icon
      const icon = this.querySelector('.accordion-icon');
      if (icon) {
        icon.textContent = isActive ? '+' : '-';
      }
      
      // Update aria-expanded
      this.setAttribute('aria-expanded', !isActive);
      
      // Handle content visibility
      const content = accordionItem.querySelector('.accordion-content');
      if (content) {
        if (!isActive) {
          content.style.maxHeight = content.scrollHeight + 'px';
          content.style.padding = '0 24px 24px 24px';
        } else {
          content.style.maxHeight = '0';
          content.style.padding = '0 24px';
        }
      }
    });
  }
}); 