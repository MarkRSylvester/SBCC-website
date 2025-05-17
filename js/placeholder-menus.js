document.addEventListener('DOMContentLoaded', function() {
  const menusContent = document.querySelector('#our-menus-accordion .accordion-content');
  
  if (menusContent) {
    // Clear placeholder content
    menusContent.innerHTML = '';
    
    // Create intro paragraph
    const introText = document.createElement('p');
    introText.className = 'section-intro';
    introText.textContent = 'From Mediterranean-inspired feasts to farm-to-table California cuisine, our diverse menu offerings can be customized to match your preferences and occasion. Our chefs source the finest local ingredients to create memorable dining experiences.';
    menusContent.appendChild(introText);
    
    // Create placeholder message for dynamic content
    const dynamicPlaceholder = document.createElement('div');
    dynamicPlaceholder.className = 'dynamic-content-placeholder';
    
    const placeholderText = document.createElement('p');
    placeholderText.innerHTML = 'Menu selections will be dynamically populated from our database. <br>Each menu is crafted with seasonality in mind and can be customized to your dietary preferences and event style.';
    
    dynamicPlaceholder.appendChild(placeholderText);
    menusContent.appendChild(dynamicPlaceholder);
  }
});
