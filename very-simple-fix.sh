#!/bin/zsh
# Script to create a very simple accordion implementation

echo "===== Creating Very Simple Accordion Fix ====="

# Create backup directory
BACKUP_DIR="backups/very_simple_$(date +%Y%m%d_%H%M%S)"
mkdir -p $BACKUP_DIR

# Backup existing files
if [[ -f "public/js/montecito-modal.js" ]]; then
  cp "public/js/montecito-modal.js" "$BACKUP_DIR/"
  echo "✅ Backed up existing JS file"
fi

# Create a super simple JS implementation
cat << 'SIMPLEJS' > public/js/simple-accordion.js
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
SIMPLEJS

echo "✅ Created simple JS implementation"

# Create test file
mkdir -p simple-test
cat << 'TESTHTML' > simple-test/test.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Super Simple Accordion Test</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    
    .accordion-item {
      margin-bottom: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      overflow: hidden;
    }
    
    .accordion-header {
      background-color: #f5f5f5;
      padding: 15px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .accordion-content {
      display: none;
      padding: 0;
    }
    
    .accordion-item.active .accordion-content {
      display: block;
      padding: 20px;
    }
    
    button {
      margin-top: 20px;
      padding: 10px;
      background-color: #333;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <h1>Super Simple Accordi
cat << 'EOT' > very-simple-fix.sh
#!/bin/zsh
# Script to create a very simple accordion implementation

echo "===== Creating Very Simple Accordion Fix ====="

# Create backup directory
BACKUP_DIR="backups/very_simple_$(date +%Y%m%d_%H%M%S)"
mkdir -p $BACKUP_DIR

# Backup existing files
if [[ -f "public/js/montecito-modal.js" ]]; then
  cp "public/js/montecito-modal.js" "$BACKUP_DIR/"
  echo "✅ Backed up existing JS file"
fi

# Create a super simple JS implementation
cat << 'SIMPLEJS' > public/js/simple-accordion.js
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
SIMPLEJS

echo "✅ Created simple JS implementation"

# Create test file
mkdir -p simple-test
cat << 'TESTHTML' > simple-test/test.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Super Simple Accordion Test</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    
    .accordion-item {
      margin-bottom: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      overflow: hidden;
    }
    
    .accordion-header {
      background-color: #f5f5f5;
      padding: 15px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .accordion-content {
      display: none;
      padding: 0;
    }
    
    .accordion-item.active .accordion-content {
      display: block;
      padding: 20px;
    }
    
    button {
      margin-top: 20px;
      padding: 10px;
      background-color: #333;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <h1>Super Simple Accordion Test</h1>
  <p>This uses a minimal JavaScript implementation with no dependencies.</p>
  
  <div class="accordion-item">
    <div class="accordion-header">
      <h3>First Accordion</h3>
      <span>+</span>
    </div>
    <div class="accordion-content">
      <p>This is the first accordion content.</p>
      <p>If you can see this, the accordion is working!</p>
    </div>
  </div>
  
  <div class="accordion-item active open">
    <div class="accordion-header">
      <h3>Second Accordion (Open by Default)</h3>
      <span>+</span>
    </div>
    <div class="accordion-content">
      <p>This accordion should be open by default.</p>
      <p>It has the active and open classes.</p>
    </div>
  </div>
  
  <button onclick="window.checkAccordions()">Check Accordions</button>
  
  <script src="../public/js/simple-accordion.js"></script>
</body>
</html>
TESTHTML

echo "✅ Created test HTML"

# Create instructions
cat << 'INSTRUCTIONS' > simple-test/instructions.txt
SUPER SIMPLE ACCORDION IMPLEMENTATION
=====================================

This is an extremely basic accordion implementation that uses old-school
JavaScript techniques to avoid potential conflicts with other scripts.

HOW TO TEST:
-----------
1. Open simple-test/test.html in your browser
2. Click on the accordions to verify they open and close
3. Click the "Check Accordions" button to see debugging info in the console

HOW TO IMPLEMENT:
---------------
1. Add the simple JS file to your HTML:
   <script src="/public/js/simple-accordion.js"></script>

2. Make sure your HTML follows this structure:
   <div class="accordion-item">
     <div class="accordion-header">
       <h3>Title</h3>
     </div>
     <div class="accordion-content">
       Content goes here
     </div>
   </div>

3. For accordions that should be open by default, use:
   <div class="accordion-item active open">
     ...
   </div>

TROUBLESHOOTING:
--------------
If you still have issues:
1. Make sure there are no JavaScript errors in the console
2. Try temporarily disabling all other JavaScript files
3. Check if your HTML structure matches exactly what's expected
4. Use the window.checkAccordions() function to debug

This implementation uses only basic JavaScript features from
ES5 and should work in virtually all browsers without conflicts.
INSTRUCTIONS

echo "✅ Created instructions"

echo "\n===== Very Simple Fix Complete ====="
echo "A super simple accordion implementation has been created."
echo ""
echo "To test it:"
echo "1. Open simple-test/test.html in your browser"
echo "2. Check if the accordions work correctly"
echo ""
echo "To integrate it into your project:"
echo "1. Add the script tag to your HTML:"
echo "   <script src=\"/public/js/simple-accordion.js\"></script>"
echo "2. Follow the instructions in simple-test/instructions.txt"
