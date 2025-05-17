// Complete accordion reset - rebuilds the accordion HTML structure
document.addEventListener('DOMContentLoaded', function() {
  console.log("🔄 Accordion Reset Started");
  
  // Step 1: Get the modal content and accordion container
  const modalContent = document.querySelector('#explore-modal .modal-content');
  const accordionContainer = document.querySelector('#explore-modal .accordion-container');
  
  if (!modalContent || !accordionContainer) {
    console.error("❌ Modal or accordion container not found");
    return;
  }
  
  // Step 2: Force the modal to have a fixed height and scroll
  modalContent.style.height = '90vh';
  modalContent.style.maxHeight = '90vh';
  modalContent.style.overflowY = 'auto';
  
  // Step 3: Collect all accordion items
  const accordionItems = accordionContainer.querySelectorAll('.accordion-item');
  
  // Step 4: Clear the original container
  accordionContainer.innerHTML = '';
  
  // Step 5: Create a new container with a clean structure
  const newContainer = document.createElement('div');
  newContainer.className = 'accordion-container-new';
  newContainer.style.display = 'block';
  newContainer.style.position = 'relative';
  
  // Step 6: Rebuild each accordion with a clean structure
  accordionItems.forEach((item, index) => {
    // Get the header and content
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');
    
    if (!header || !content) return;
    
    // Create new elements
    const newItem = document.createElement('div');
    newItem.className = 'accordion-item';
    newItem.id = item.id || `accordion-${index}`;
    newItem.style.position = 'relative';
    newItem.style.display = 'block';
    newItem.style.marginBottom = '8px';
    newItem.style.borderLeft = '4px solid #1D3557';
    newItem.style.borderRadius = '0 8px 8px 0';
    
    // Create new header
    const newHeader = document.createElement('div');
    newHeader.className = 'accordion-header';
    newHeader.innerHTML = header.innerHTML;
    newHeader.style.padding = '12px 16px';
    newHeader.style.backgroundColor = '#f4f8fd';
    newHeader.style.cursor = 'pointer';
    newHeader.style.display = 'flex';
    newHeader.style.justifyContent = 'space-between';
    newHeader.style.alignItems = 'center';
    newHeader.style.borderRadius = '0 8px 8px 0';
    
    // Create new content
    const newContent = document.createElement('div');
    newContent.className = 'accordion-content';
    newContent.innerHTML = content.innerHTML;
    newContent.style.display = 'none';
    newContent.style.padding = '16px';
    newContent.style.maxHeight = '400px';
    newContent.style.overflowY = 'auto';
    
    // Add click handler to header
    newHeader.addEventListener('click', function() {
      // Check if already open
      const isOpen = newContent.style.display === 'block';
      
      // Close all accordions
      newContainer.querySelectorAll('.accordion-content').forEach(content => {
        content.style.display = 'none';
      });
      
      // Toggle this one
      if (!isOpen) {
        newContent.style.display = 'block';
      }
    });
    
    // Add to new item
    newItem.appendChild(newHeader);
    newItem.appendChild(newContent);
    
    // Add to container
    newContainer.appendChild(newItem);
  });
  
  // Step 7: Replace the original container
  accordionContainer.parentNode.replaceChild(newContainer, accordionContainer);
  
  console.log("✅ Accordion Reset Complete");
});
