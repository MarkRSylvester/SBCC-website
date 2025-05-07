// Apply the title fix solution to Beyond the Table
document.addEventListener('DOMContentLoaded', function() {
  // Function to ensure titles are properly styled
  function fixTitles() {
    const categoryTitles = document.querySelectorAll('#beyond-table-accordion .category-title');
    
    categoryTitles.forEach(title => {
      // Remove any inline styles that might interfere
      title.style.whiteSpace = 'normal';
      title.style.overflow = 'visible';
      title.style.textOverflow = 'initial';
      
      // Set text-align based on screen width
      if (window.innerWidth >= 768) {
        title.style.textAlign = 'center';
      } else {
        title.style.textAlign = 'left';
      }
    });
  }
  
  // Initial fix
  fixTitles();
  
  // Fix on window resize
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(fixTitles, 250);
  });
  
  // Fix after any dynamic content changes
  const observer = new MutationObserver(fixTitles);
  const accordion = document.getElementById('beyond-table-accordion');
  
  if (accordion) {
    observer.observe(accordion, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style']
    });
  }
}); 