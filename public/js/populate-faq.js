console.log("NEW FAQ script loaded " + new Date().toISOString());
document.addEventListener('DOMContentLoaded', function() {
  console.log("NEW FAQ DOM loaded");
  var faqContent = document.querySelector('#faq-accordion .accordion-content');
  console.log("Looking for FAQ content:", faqContent ? "Found" : "Not found");
  
  if (faqContent) {
    console.log("Found FAQ content, updating now");
    
    // Use raw strings to avoid any template literal issues
    faqContent.innerHTML = ''
      + '<p class="section-intro">Answers to commonly asked questions about our services, booking process, and more.</p>'
      
      + '<h4 class="faq-section-title">General Questions</h4>'
      + '<div class="category-grid">'
      + '  <div class="category-card faq-card">'
      + '    <h4 class="category-title">Do you accommodate special diets?</h4>'
      + '    <div class="divider"></div>'
      + '    <p>Absolutely. Our chefs specialize in a wide range of dietary accommodations—from gluten-free to vegan, paleo, low-sodium, and more. Let us know what you need, and we\'ll match you with a chef who can deliver.</p>'
      + '  </div>'
      + '  <div class="category-card faq-card">'
      + '    <h4 class="category-title">Are you licensed and insured?</h4>'
      + '    <div class="divider"></div>'
      + '    <p>Yes. All chefs are vetted professionals, and the SBCC team carries appropriate licenses and insurance for events and private service.</p>'
      + '  </div>'
      + '</div>'
      
      + '<div class="section-divider"></div>'
      
      + '<h4 class="faq-section-title">Booking & Pricing</h4>'
      + '<div class="category-grid">'
      + '  <div class="category-card faq-card">'
      + '    <h4 class="category-title">How far in advance should I book?</h4>'
      + '    <div class="divider"></div>'
      + '    <p>We recommend booking at least 2–4 weeks in advance for events, and 5–7 days in advance for weekly meal service. That said, we\'ll always do our best to accommodate your timing.</p>'
      + '  </div>'
      + '  <div class="category-card faq-card">'
      + '    <h4 class="category-title">Do you travel outside of Santa Barbara?</h4>'
      + '    <div class="divider"></div>'
      + '    <p>Yes, many of our chefs will travel throughout the region. Additional travel fees may apply depending on location.</p>'
      + '  </div>'
      + '</div>'

      + '<div class="category-grid">'
      + '  <div class="category-card faq-card">'
      + '    <h4 class="category-title">How much does it cost?</h4>'
      + '    <div class="divider"></div>'
      + '    <p>Pricing varies based on service type, guest count, chef, and complexity. We offer full transparency before anything is confirmed.</p>'
      + '  </div>'
      + '</div>'
      
      + '<div class="section-divider"></div>'
      
      + '<h4 class="faq-section-title">Events & Gatherings</h4>'
      + '<div class="category-grid">'
      + '  <div class="category-card faq-card">'
      + '    <h4 class="category-title">Can I customize a menu?</h4>'
      + '    <div class="divider"></div>'
      + '    <p>Yes. Every SBCC experience is tailored to your preferences. You can collaborate with your chef or select from curated menus.</p>'
      + '  </div>'
      + '  <div class="category-card faq-card">'
      + '    <h4 class="category-title">Do I need to provide anything in my kitchen?</h4>'
      + '    <div class="divider"></div>'
      + '    <p>For in-home events or meal prep, we\'ll discuss your kitchen setup in advance. Most chefs bring their own specialty tools, but access to a stove and fridge is usually essential.</p>'
      + '  </div>'
      + '</div>'

      + '<div class="category-grid">'
      + '  <div class="category-card faq-card">'
      + '    <h4 class="category-title">Do you offer tastings?</h4>'
      + '    <div class="divider"></div>'
      + '    <p>In some cases, yes. Especially for weddings or large events, we can arrange tastings with select chefs. Inquire early to ensure availability.</p>'
      + '  </div>'
      + '</div>'
      
      + '<div class="section-divider"></div>'
      
      + '<h4 class="faq-section-title">Signature Meal Program</h4>'
      + '<div class="category-grid">'
      + '  <div class="category-card faq-card">'
      + '    <h4 class="category-title">What\'s the difference between the Signature Meal Program and booking a chef for an event?</h4>'
      + '    <div class="divider"></div>'
      + '    <p>The Signature Meal Program is built around regular nourishment—delivered or cooked in your home. Event services are designed for one-time, hosted occasions. Different cadence, same heart.</p>'
      + '  </div>'
      + '</div>'
      
      + '<div class="section-divider"></div>'
      
      + '<h4 class="faq-section-title">Other Information</h4>'
      + '<div class="category-grid">'
      + '  <div class="category-card faq-card">'
      + '    <h4 class="category-title">What if I don\'t see what I\'m looking for?</h4>'
      + '    <div class="divider"></div>'
      + '    <p>Reach out! We thrive on creative requests and custom events. Whether it\'s a themed dinner or unique dietary plan, we\'re excited to collaborate.</p>'
      + '  </div>'
      + '</div>';
    
    console.log("FAQ content updated with all questions");
    
    // Add a check to make sure all questions are visible
    setTimeout(function() {
      var cards = faqContent.querySelectorAll('.faq-card');
      console.log("Found " + cards.length + " FAQ cards after update");
      
      // Check if each card is visible
      cards.forEach(function(card, index) {
        var rect = card.getBoundingClientRect();
        console.log("Card " + index + " dimensions:", rect.width, rect.height, "Visible:", rect.width > 0 && rect.height > 0);
      });
    }, 1000);
  } else {
    console.log("FAQ content element not found");
  }
});
