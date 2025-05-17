// Absolute minimal accordion toggle with no scrolling
document.addEventListener('DOMContentLoaded', function() {
  const items = document.querySelectorAll('#explore-modal .accordion-item');
  const modal = document.querySelector('#explore-modal .modal-content');
  const SCROLL_OFFSET = 32; // Space from top of modal
  const SCROLL_THRESHOLD = 0.9; // When to trigger next accordion scroll (90% of content)
  const NEXT_ACCORDION_VISIBILITY = 0.3; // How much of the next accordion to show (30%)
  
  // Function to check if content is scrollable
  function isScrollable(element) {
    return element.scrollHeight > element.clientHeight;
  }
  
  // Function to update fade shadows
  function updateFadeShadows(content) {
    if (isScrollable(content)) {
      content.classList.add('can-scroll');
    } else {
      content.classList.remove('can-scroll');
    }
  }
  
  // Function to scroll accordion into view
  function scrollAccordionIntoView(item) {
    const modalTop = modal.getBoundingClientRect().top;
    const itemTop = item.getBoundingClientRect().top;
    
    modal.scrollTo({
      top: modal.scrollTop + (itemTop - modalTop) - SCROLL_OFFSET,
      behavior: 'smooth'
    });
  }
  
  // Function to show next accordion
  function showNextAccordion(currentItem) {
    const nextAccordion = currentItem.nextElementSibling;
    if (nextAccordion && nextAccordion.classList.contains('accordion-item')) {
      const nextHeader = nextAccordion.querySelector('.accordion-header');
      if (nextHeader) {
        const modalTop = modal.getBoundingClientRect().top;
        const nextTop = nextAccordion.getBoundingClientRect().top;
        const modalHeight = modal.clientHeight;
        
        // Calculate how much of the next accordion to show
        const visibleHeight = modalHeight * NEXT_ACCORDION_VISIBILITY;
        
        modal.scrollTo({
          top: modal.scrollTop + (nextTop - modalTop) - (modalHeight - visibleHeight),
          behavior: 'smooth'
        });
      }
    }
  }
  
  items.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');
    
    if (header) {
      header.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        
        // If it's already open, just close it
        if (isOpen) {
          item.classList.remove('active', 'open');
          if (content) {
            content.style.display = 'none';
            content.style.height = '0';
            content.style.maxHeight = '0';
            content.style.padding = '0';
          }
        } else {
          // Close all other accordions first
          items.forEach(otherItem => {
            if (otherItem !== item) {
              otherItem.classList.remove('active', 'open');
              const otherContent = otherItem.querySelector('.accordion-content');
              if (otherContent) {
                otherContent.style.display = 'none';
                otherContent.style.height = '0';
                otherContent.style.maxHeight = '0';
                otherContent.style.padding = '0';
              }
            }
          });
          
          // Open this accordion
          item.classList.add('active', 'open');
          if (content) {
            content.style.display = 'block';
            content.style.height = 'auto';
            content.style.maxHeight = 'none';
            content.style.padding = '20px';
            content.style.overflow = 'auto';
          }
          
          // Scroll the opened accordion into view
          scrollAccordionIntoView(item);
        }
      });
    }
    
    // Handle content scroll
    if (content) {
      content.addEventListener('scroll', () => {
        if (!item.classList.contains('active')) return;
        
        const scrollPosition = content.scrollTop + content.clientHeight;
        const scrollHeight = content.scrollHeight;
        
        // If we're near the bottom of the content
        if (scrollPosition / scrollHeight > SCROLL_THRESHOLD) {
          showNextAccordion(item);
        }
        
        // Update fade shadows based on scroll position
        if (content.scrollTop > 0) {
          content.classList.add('can-scroll');
        } else {
          updateFadeShadows(content);
        }
      });
    }
  });
  
  // Initial check for scrollable content
  items.forEach(item => {
    const content = item.querySelector('.accordion-content');
    if (content) {
      // Check after a short delay to ensure content is properly rendered
      setTimeout(() => updateFadeShadows(content), 100);
    }
  });
});
