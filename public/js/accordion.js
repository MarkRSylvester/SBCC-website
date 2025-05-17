/**
 * Extremely Simple Accordion Implementation
 * Version: 1.0.0
 * 
 * This is a minimal accordion implementation that uses old-school
 * JavaScript techniques to avoid potential conflicts.
 */

// Initialize when window is loaded
window.onload = function() {
  console.log("Simple accordion initializing...");
  
  // Get all accordion headers
  var headers = document.querySelectorAll(".accordion-header");
  console.log("Found " + headers.length + " accordion headers");
  
  // Add click event to each header using direct property assignment
  for (var i = 0; i < headers.length; i++) {
    headers[i].onclick = function() {
      // Get the parent accordion item
      var item = this.parentNode;
      
      // Get the content element
      var content = this.nextElementSibling;
      
      // Toggle the active state
      if (item.classList.contains("active")) {
        // Currently active, so close it
        item.classList.remove("active");
        item.classList.remove("open"); // Added this line to support both classes
        
        // Update content styles
        if (content) {
          content.style.display = "none";
          content.style.padding = "0";
        }
      } else {
        // Currently inactive, so open it
        item.classList.add("active");
        item.classList.add("open"); // Added this line to support both classes
        
        // Update content styles
        if (content) {
          content.style.display = "block";
          content.style.padding = "20px";
          content.style.height = "auto";
          content.style.maxHeight = "none";
          content.style.overflow = "auto";
        }
      }
    };
  }
  
  // Initialize accordions that should be open by default
  var openItems = document.querySelectorAll(".accordion-item.active, .accordion-item.open");
  for (var j = 0; j < openItems.length; j++) {
    var content = openItems[j].querySelector(".accordion-content");
    if (content) {
      content.style.display = "block";
      content.style.padding = "20px";
      content.style.height = "auto";
      content.style.maxHeight = "none";
      content.style.overflow = "auto";
    }
    
    // Ensure both classes are added for consistency
    openItems[j].classList.add("active");
    openItems[j].classList.add("open");
  }
  
  console.log("Simple accordion initialization complete!");
};

// Global debugging function
window.debugAccordions = function() {
  var items = document.querySelectorAll(".accordion-item");
  console.log("-------------- ACCORDION DEBUG --------------");
  console.log("Found " + items.length + " accordion items:");
  
  for (var i = 0; i < items.length; i++) {
    var header = items[i].querySelector(".accordion-header h3");
    var title = header ? header.textContent : "Accordion " + i;
    var isActive = items[i].classList.contains("active");
    var isOpen = items[i].classList.contains("open");
    var content = items[i].querySelector(".accordion-content");
    var contentDisplay = content ? window.getComputedStyle(content).display : "unknown";
    
    console.log("Accordion " + i + ": " + title);
    console.log("  - Active: " + isActive);
    console.log("  - Open: " + isOpen);
    console.log("  - Content display: " + contentDisplay);
    console.log("  - Classes: " + items[i].className);
  }
  console.log("--------------------------------------------");
};
