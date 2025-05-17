#!/bin/zsh
# Script to help diagnose and fix accordion integration issues

echo "===== SBCC Accordion Integration Diagnosis ====="

# Check file locations
echo "\nChecking file locations..."
if [[ -f "public/js/accordion.js" ]]; then
  echo "✅ accordion.js found in public/js directory"
else
  echo "❌ accordion.js NOT FOUND in public/js directory"
  echo "   Please check where the file was created"
fi

# Check content of main page
echo "\nChecking main application HTML..."
MAIN_INDEX=$(find . -name "index.js" -o -name "index.html" -o -name "main.js" | head -n 1)
if [[ -n "$MAIN_INDEX" ]]; then
  echo "📄 Found main file: $MAIN_INDEX"
  
  # Check for accordion script inclusion
  if grep -q "accordion.js" "$MAIN_INDEX"; then
    echo "✅ Script reference found in main file"
  else
    echo "❌ Script reference NOT FOUND in main file"
    echo "   You need to add: <script src=\"/public/js/accordion.js\"></script>"
  fi
  
  # Check for accordion structure
  if grep -q "accordion-item" "$MAIN_INDEX"; then
    echo "✅ Found accordion-item class in main file"
  else
    echo "❌ accordion-item class NOT FOUND in main file"
    echo "   Your HTML might be using different class names"
  fi
else
  echo "❌ Couldn't find main application file"
  echo "   Please check the project structure"
fi

# Check running application
echo "\nChecking running application..."
echo "Please ensure your application is running at localhost:3000"
echo "1. Open browser dev tools (F12 or Cmd+Option+I)"
echo "2. Run this in the Console tab and check results:"
echo "\n   document.querySelectorAll('.accordion-item').length"
echo "   (This should return the number of accordions on your page)"

# Show suggested next steps
echo "\n===== Suggested Next Steps ====="
echo "1. Identify accordion class names in your main application:"
echo "   - Inspect the HTML of an accordion in your browser dev tools"
echo "   - Note the class names used for accordion containers and headers"
echo ""
echo "2. Update accordion.js to target your specific class names:"
echo "   - Edit public/js/accordion.js"
echo "   - Change selectors from '.accordion-item' to your class names"
echo "   - Change selectors from '.accordion-header' to your class names"
echo ""
echo "3. Ensure the script is loaded on your main page:"
echo "   - Add before closing </body> tag: <script src=\"/public/js/accordion.js\"></script>"
echo ""
echo "4. Consider adding this debugging code directly to your console to see what's happening:"

cat << 'DEBUG_CODE'
// Run this in browser console
(function() {
  // Find all potential accordion elements
  console.log("=== ACCORDION DEBUG ===");
  
  // Common accordion class names
  var classesToCheck = [
    '.accordion-item', 
    '.accordion', 
    '.card',
    '.collapse-item',
    '.modal-accordion',
    '[data-accordion]'
  ];
  
  // Check each potential class
  classesToCheck.forEach(function(selector) {
    var elements = document.querySelectorAll(selector);
    console.log(selector + ": found " + elements.length + " elements");
  });
  
  // Attach click handlers to potential accordion headers
  var potentialHeaders = document.querySelectorAll(
    '.accordion-header, .accordion-title, .card-header, [data-toggle="collapse"]'
  );
  
  console.log("Found " + potentialHeaders.length + " potential headers");
  
  // Try to make them work
  potentialHeaders.forEach(function(header) {
    console.log("Header:", header);
    header.onclick = function() {
      console.log("Header clicked:", this);
      var parent = this.parentNode;
      var content = this.nextElementSibling;
      console.log("Parent:", parent);
      console.log("Content:", content);
      
      if (parent && content) {
        if (parent.classList.contains('active') || parent.classList.contains('show')) {
          parent.classList.remove('active');
          parent.classList.remove('show');
          parent.classList.remove('open');
          content.style.display = 'none';
        } else {
          parent.classList.add('active');
          parent.classList.add('show');
          parent.classList.add('open');
          content.style.display = 'block';
          content.style.height = 'auto';
          content.style.maxHeight = 'none';
          content.style.padding = '20px';
        }
      }
    };
  });
  
  console.log("Click handlers added to all potential headers");
  console.log("=== DEBUG COMPLETE ===");
})();
DEBUG_CODE

echo "\n===== Diagnosis Complete ====="
