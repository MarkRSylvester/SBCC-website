/**
 * Super Simple Accordion Implementation
 * A minimal approach that avoids potential conflicts
 */

// Wait for page to load
window.onload = function() {
  console.log("Simple accordion initializing...");
  
  // Get all headers
  var headers = document.getElementsByClassName("accordion-header");
  
  // Add click event to each header
  for (var i = 0; i < headers.length; i++) {
    headers[i].onclick = function() {
      // Toggle active class on the parent item
      var item = this.parentNode;
      
      // Toggle active and open classes
      if (item.className.indexOf("active") > -1) {
        item.className = item.className.replace(" active", "").replace(" open", "");
      } else {
        item.className += " active open";
      }
      
      // Get the content element
      var content = this.nextElementSibling;
      
      // Toggle content visibility
      if (content) {
        if (item.className.indexOf("active") > -1) {
          // Open the accordion
          content.style.display = "block";
          content.style.height = "auto";
          content.style.maxHeight = "none";
          content.style.padding = "20px";
          content.style.overflow = "auto";
        } else {
          // Close the accordion
          content.style.display = "none";
          content.style.height = "0";
          content.style.maxHeight = "0";
          content.style.padding = "0";
        }
      }
    };
  }
  
  // Initialize accordions that should be open by default
  var openItems = document.querySelectorAll(".accordion-item.active.open");
  for (var j = 0; j < openItems.length; j++) {
    var content = openItems[j].querySelector(".accordion-content");
    if (content) {
      content.style.display = "block";
      content.style.height = "auto";
      content.style.maxHeight = "none";
      content.style.padding = "20px";
      content.style.overflow = "auto";
    }
  }
  
  console.log("Simple accordion initialized!");
};

// Global function for debugging
window.checkAccordions = function() {
  var items = document.getElementsByClassName("accordion-item");
  console.log("Found " + items.length + " accordion items:");
  
  for (var i = 0; i < items.length; i++) {
    var header = items[i].querySelector(".accordion-header h3");
    var title = header ? header.textContent : "Accordion " + i;
    var isActive = items[i].className.indexOf("active") > -1;
    var isOpen = items[i].className.indexOf("open") > -1;
    
    console.log(i + ": " + title);
    console.log("  Active: " + isActive);
    console.log("  Open: " + isOpen);
    console.log("  Class: " + items[i].className);
  }
};
