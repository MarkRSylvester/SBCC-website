document.addEventListener('DOMContentLoaded', function() {
  const chefsContent = document.querySelector('#our-chefs-accordion .accordion-content');
  
  if (chefsContent) {
    // Clear placeholder content
    chefsContent.innerHTML = '';
    
    // Create intro paragraph
    const introText = document.createElement('p');
    introText.className = 'section-intro';
    introText.textContent = 'Our community of talented chefs brings diverse culinary backgrounds and specialties to your table. Each chef is personally vetted for their expertise, creativity, and genuine love of hospitality.';
    chefsContent.appendChild(introText);
    
    // Create placeholder message for dynamic content
    const dynamicPlaceholder = document.createElement('div');
    dynamicPlaceholder.className = 'dynamic-content-placeholder';
    
    const placeholderText = document.createElement('p');
    placeholderText.innerHTML = 'Chef profiles will be dynamically populated from our database. <br>Each chef brings their unique culinary perspective, specialties, and background to create memorable dining experiences.';
    
    dynamicPlaceholder.appendChild(placeholderText);
    chefsContent.appendChild(dynamicPlaceholder);
  }
});
