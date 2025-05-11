document.addEventListener('DOMContentLoaded', function() {
  const gatherings = document.querySelector('#gatherings-accordion .accordion-content');
  
  if (gatherings) {
    gatherings.innerHTML = `
      <div class="gatherings-section">
        <h3>Gatherings & Celebrations</h3>
        
        <p class="intro-text">
          From intimate dinner parties to milestone celebrations, our chefs create custom menus that reflect your vision and delight your guests. We handle everything from menu planning to execution, allowing you to be fully present as a host.
        </p>
        
        <div class="event-types-grid">
          <div class="event-type-card">
            <h4>Intimate Dinners</h4>
            <div class="event-type-underline"></div>
            <p>Perfect for small gatherings of 2-12 guests. Enjoy a personalized dining experience with expert wine pairings and impeccable service.</p>
          </div>
          
          <div class="event-type-card">
            <h4>Special Occasions</h4>
            <div class="event-type-underline"></div>
            <p>Celebrate birthdays, anniversaries, or achievements with a memorable culinary experience tailored to your preferences.</p>
          </div>
        </div>
        
        <div class="features-section">
          <h4>All Gatherings Include</h4>
          <div class="features-grid">
            <div class="feature-item">
              <span class="feature-dot"></span>
              <span class="feature-text">Personal chef consultation</span>
            </div>
            <div class="feature-item">
              <span class="feature-dot"></span>
              <span class="feature-text">On-site meal preparation</span>
            </div>
            <div class="feature-item">
              <span class="feature-dot"></span>
              <span class="feature-text">Professional service staff</span>
            </div>
          </div>
        </div>
        
        <p class="booking-note">
          Most events are booked 2–4 weeks in advance. For special occasions and larger gatherings, we recommend planning 4–6 weeks ahead.
        </p>
        
        <div class="cta-container">
          <button class="button button-primary" data-modal="event-planning-modal">Plan Your Gathering</button>
        </div>
      </div>
    `;
    
    // Ensure content is visible
    gatherings.style.maxHeight = 'none';
    gatherings.style.height = 'auto';
    gatherings.style.overflow = 'visible';
    
    // Add event listener to the Plan Your Gathering button
    const planButton = gatherings.querySelector('.button-primary');
    if (planButton) {
      planButton.addEventListener('click', function() {
        const eventModal = document.getElementById('event-planning-modal');
        if (eventModal) {
          eventModal.style.display = 'flex';
        }
      });
    }
  }
}); 