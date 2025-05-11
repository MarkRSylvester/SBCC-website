/**
 * Populate the FAQ section with content
 */
document.addEventListener('DOMContentLoaded', function() {
  const faqAccordion = document.getElementById('faq-accordion');
  if (!faqAccordion) return;
  
  const faqContent = `
    <p class="section-intro">
      Answers to commonly asked questions about our services, booking process, and more.
    </p>
    
    <div class="faq-group">
      <h4>General Questions</h4>
      
      <div class="faq-item">
        <p class="faq-question">Do you accommodate special diets?</p>
        <p class="faq-answer">Absolutely. Our chefs specialize in a wide range of dietary accommodations—from gluten-free to vegan, paleo, low-sodium, and more. Let us know what you need, and we'll match you with a chef who can deliver.</p>
      </div>
      
      <div class="faq-item">
        <p class="faq-question">Are you licensed and insured?</p>
        <p class="faq-answer">Yes. All chefs are vetted professionals, and the SBCC team carries appropriate licenses and insurance for events and private service.</p>
      </div>
    </div>
    
    <div class="faq-group">
      <h4>Booking & Pricing</h4>
      
      <div class="faq-item">
        <p class="faq-question">How far in advance should I book?</p>
        <p class="faq-answer">We recommend booking at least 2–4 weeks in advance for events, and 5–7 days in advance for weekly meal service. That said, we'll always do our best to accommodate your timing.</p>
      </div>
      
      <div class="faq-item">
        <p class="faq-question">Do you travel outside of Santa Barbara?</p>
        <p class="faq-answer">Yes, many of our chefs will travel throughout the region. Additional travel fees may apply depending on location.</p>
      </div>
      
      <div class="faq-item">
        <p class="faq-question">How much does it cost?</p>
        <p class="faq-answer">Pricing varies based on service type, guest count, chef, and complexity. We offer full transparency before anything is confirmed.</p>
      </div>
    </div>
    
    <div class="faq-group">
      <h4>Events & Gatherings</h4>
      
      <div class="faq-item">
        <p class="faq-question">Can I customize a menu?</p>
        <p class="faq-answer">Yes. Every SBCC experience is tailored to your preferences. You can collaborate with your chef or select from curated menus.</p>
      </div>
      
      <div class="faq-item">
        <p class="faq-question">Do I need to provide anything in my kitchen?</p>
        <p class="faq-answer">For in-home events or meal prep, we'll discuss your kitchen setup in advance. Most chefs bring their own specialty tools, but access to a stove and fridge is usually essential.</p>
      </div>
      
      <div class="faq-item">
        <p class="faq-question">Do you offer tastings?</p>
        <p class="faq-answer">In some cases, yes. Especially for weddings or large events, we can arrange tastings with select chefs. Inquire early to ensure availability.</p>
      </div>
    </div>
    
    <div class="faq-group">
      <h4>Signature Meal Program</h4>
      
      <div class="faq-item">
        <p class="faq-question">What's the difference between the Signature Meal Program and booking a chef for an event?</p>
        <p class="faq-answer">The Signature Meal Program is built around regular nourishment—delivered or cooked in your home. Event services are designed for one-time, hosted occasions. Different cadence, same heart.</p>
      </div>
    </div>
    
    <div class="faq-group">
      <h4>Other Information</h4>
      
      <div class="faq-item">
        <p class="faq-question">What if I don't see what I'm looking for?</p>
        <p class="faq-answer">Reach out! We thrive on creative requests and custom events. Whether it's a themed dinner or unique dietary plan, we're excited to collaborate.</p>
      </div>
    </div>
  `;
  
  const contentDiv = faqAccordion.querySelector('.accordion-content');
  if (contentDiv) {
    contentDiv.innerHTML = faqContent;
  }
});
