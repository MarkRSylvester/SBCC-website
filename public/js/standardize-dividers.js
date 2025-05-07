document.addEventListener('DOMContentLoaded', function() {
  // Find all dividers on the page
  const allDividers = document.querySelectorAll('.divider, hr, .separator, .line');
  
  // Apply consistent styling to each
  allDividers.forEach(divider => {
    // Don't change dividers that are for layout purposes
    if (getComputedStyle(divider).display === 'none' || 
        getComputedStyle(divider).visibility === 'hidden' ||
        divider.classList.contains('no-style')) {
      return;
    }
    
    // Add the tapered-divider class
    divider.classList.add('tapered-divider');
    
    // Set consistent style
    divider.style.background = 'linear-gradient(to right, rgba(230, 219, 201, 0), rgba(230, 219, 201, 1) 20%, rgba(230, 219, 201, 1) 80%, rgba(230, 219, 201, 0))';
    divider.style.height = '1px';
    divider.style.border = 'none';
    divider.style.width = '60%';
    divider.style.margin = '30px auto';
    
    // For hr elements, need to override default styles
    if (divider.tagName.toLowerCase() === 'hr') {
      divider.style.backgroundColor = 'transparent';
    }
  });
}); 