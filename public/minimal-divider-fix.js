// Minimal fix for divider styling ONLY - no accordion behavior changes
(function() {
  console.log('Starting minimal divider fix...');
  
  // Add CSS styles for dividers only
  const styleEl = document.createElement('style');
  styleEl.id = 'divider-fix-styles';
  styleEl.textContent = `
    /* Divider styles from Our Chefs accordion - applied globally */
    .section-divider {
      position: relative;
      height: 1px;
      background-color: #E6DBC9;
      margin: 30px auto;
      width: 70%;
    }
    
    .section-divider:before {
      content: '';
      position: absolute;
      top: -1px;
      left: 50%;
      transform: translateX(-50%);
      width: 40%;
      height: 3px;
      background-color: #1D3557;
      border-radius: 1.5px;
    }
  `;
  
  // Append styles to head
  document.head.appendChild(styleEl);
  console.log('Divider styles added');
  
  // NO changes to accordion behavior or content
  console.log('Minimal divider fix complete');
})();
