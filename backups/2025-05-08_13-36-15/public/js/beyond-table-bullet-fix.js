// Fix the bullet styles in Beyond the Table grid blocks
document.addEventListener('DOMContentLoaded', function() {
  // Remove any remaining icons
  const icons = document.querySelectorAll('#beyond-table-accordion .accordion-icon, #beyond-table-accordion .minus-icon, #beyond-table-accordion button.icon');
  icons.forEach(icon => {
    icon.remove();
  });

  // Ensure content is visible
  const accordionContent = document.querySelector('#beyond-table-accordion .accordion-content');
  if (accordionContent) {
    accordionContent.style.maxHeight = 'none';
    accordionContent.style.overflow = 'visible';
    accordionContent.style.padding = '1.5rem 2rem';
  }

  // Ensure proper click handling on cards
  const cards = document.querySelectorAll('#beyond-table-accordion .category-card');
  cards.forEach(card => {
    // Remove any remaining expand buttons
    const expandButtons = card.querySelectorAll('.expand-button');
    expandButtons.forEach(button => button.remove());
    
    // Make sure content is visible
    const eventList = card.querySelector('.event-list');
    if (eventList) {
      eventList.style.maxHeight = 'none';
      eventList.style.opacity = '1';
      eventList.style.overflow = 'visible';
    }
  });
}); 