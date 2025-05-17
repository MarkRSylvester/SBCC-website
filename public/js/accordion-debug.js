document.addEventListener('DOMContentLoaded', function() {
  console.log('Accordion debug script loaded');
  
  // Log all accordion items
  const accordionItems = document.querySelectorAll('.accordion-item');
  console.log('Found ' + accordionItems.length + ' accordion items');
  
  // Log classes and structure of each accordion
  accordionItems.forEach((item, index) => {
    console.log('Accordion #' + index + ':');
    console.log('- Classes:', item.className);
    console.log('- Has header:', !!item.querySelector('.accordion-header'));
    console.log('- Has content:', !!item.querySelector('.accordion-content'));
    
    // Check how content is hidden/shown
    const content = item.querySelector('.accordion-content');
    if (content) {
      console.log('- Content style display:', window.getComputedStyle(content).display);
      console.log('- Content style height:', window.getComputedStyle(content).height);
      console.log('- Content style maxHeight:', window.getComputedStyle(content).maxHeight);
    }
  });
  
  // Add a click logging event to accordion headers
  document.querySelectorAll('.accordion-header').forEach((header, index) => {
    header.addEventListener('click', function(e) {
      console.log('Header #' + index + ' clicked');
      const accordionItem = this.closest('.accordion-item');
      console.log('Parent accordion item classes before toggle:', accordionItem.className);
      
      // Log the content element's styles
      const content = accordionItem.querySelector('.accordion-content');
      if (content) {
        console.log('Content display before toggle:', window.getComputedStyle(content).display);
      }
      
      // Wait to see what happens after toggle
      setTimeout(() => {
        console.log('Parent accordion item classes after toggle:', accordionItem.className);
        if (content) {
          console.log('Content display after toggle:', window.getComputedStyle(content).display);
        }
      }, 100);
    });
  });
  
  // Check if there's any existing accordion script
  const scripts = document.querySelectorAll('script');
  const accordionScripts = Array.from(scripts).filter(script => 
    script.src.includes('accordion') || (script.textContent && script.textContent.includes('accordion'))
  );
  
  console.log('Found ' + accordionScripts.length + ' potential accordion scripts:');
  accordionScripts.forEach((script, index) => {
    console.log('Script #' + index + ':', script.src || 'Inline script');
  });
});
