#!/bin/zsh
# Script to diagnose modal implementation issues

echo "===== Modal Implementation Diagnosis ====="

# Check for file existence and content
echo "\nChecking modal files:"

# Check CSS file
CSS_FILE="public/css/montecito-modal.css"
if [[ -f "$CSS_FILE" ]]; then
  CSS_SIZE=$(wc -l < "$CSS_FILE" | tr -d ' ')
  echo "✅ CSS file exists with $CSS_SIZE lines"
  
  # Check for essential CSS selectors
  for selector in ".accordion-item" ".accordion-header" ".accordion-content" ".accordion-icon"; do
    if grep -q "$selector" "$CSS_FILE"; then
      echo "  ✅ Found selector: $selector"
    else
      echo "  ❌ Missing selector: $selector"
    fi
  done
else
  echo "❌ CSS file missing: $CSS_FILE"
fi

# Check JS file
JS_FILE="public/js/montecito-modal.js"
if [[ -f "$JS_FILE" ]]; then
  JS_SIZE=$(wc -l < "$JS_FILE" | tr -d ' ')
  echo "✅ JS file exists with $JS_SIZE lines"
  
  # Check for essential JS functions
  for func in "initializeAccordion" "addEventListener" "querySelector"; do
    if grep -q "$func" "$JS_FILE"; then
      echo "  ✅ Found function: $func"
    else
      echo "  ❌ Missing function: $func"
    fi
  done
else
  echo "❌ JS file missing: $JS_FILE"
fi

# Look for HTML files that should include the modal
echo "\nSearching for HTML files with modal references:"
grep -r "accordion" --include="*.html" . || echo "No accordion references found in HTML files"

# Check how the files are included in HTML
echo "\nChecking how files are included in HTML:"
grep -r "montecito-modal.css" --include="*.html" . || echo "CSS file not included in any HTML file"
grep -r "montecito-modal.js" --include="*.html" . || echo "JS file not included in any HTML file"

# Check for file paths and casing issues
echo "\nChecking for path and casing issues:"
find . -name "*.css" | grep -i "modal" || echo "No modal CSS files found"
find . -name "*.js" | grep -i "modal" || echo "No modal JS files found"

# Check for competing scripts
echo "\nChecking for competing scripts that might interfere:"
grep -r "accordion" --include="*.js" . | grep -v "montecito-modal.js" || echo "No competing accordion scripts found"

# Create a test HTML file
echo "\nCreating a test HTML file to verify modal functionality..."
TEST_DIR="modal-test"
mkdir -p "$TEST_DIR"

cat << 'TESTHTML' > "$TEST_DIR/test-modal.html"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Modal Test</title>
  <style>
    /* Basic styling just for the test */
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    .test-container {
      border: 1px solid #ddd;
      padding: 20px;
      margin: 20px 0;
      border-radius: 4px;
    }
    h1 {
      color: #1D3557;
    }
  </style>
  <!-- Link to your actual modal CSS -->
  <link rel="stylesheet" href="../public/css/montecito-modal.css">
</head>
<body>
  <h1>Modal Component Test</h1>
  
  <div class="test-container">
    <h2>Testing Accordion Functionality</h2>
    
    <!-- Test accordion structure -->
    <div class="accordion-item">
      <div class="accordion-header">
        <h3>Test Accordion Header</h3>
        <div class="accordion-icon">+</div>
      </div>
      <div class="accordion-content">
        <p>This is test content for the accordion. If the accordion is working correctly, this content should be hidden by default and should appear when the header is clicked.</p>
        <p>It should also be styled according to your montecito-modal.css file.</p>
      </div>
    </div>
  </div>
  
  <div class="test-status">
    <h3>Test Status:</h3>
    <div id="test-results">Running tests...</div>
  </div>
  
  <!-- Link to your actual modal JS -->
  <script src="../public/js/montecito-modal.js"></script>
  
  <!-- Test script -->
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const results = document.getElementById('test-results');
      let testsPassed = 0;
      let testsFailed = 0;
      
      function runTest(testName, testFunction) {
        try {
          const passed = testFunction();
          if (passed) {
            testsPassed++;
            return `<p style="color: green">✅ ${testName} - PASSED</p>`;
          } else {
            testsFailed++;
            return `<p style="color: red">❌ ${testName} - FAILED</p>`;
          }
        } catch (error) {
          testsFailed++;
          return `<p style="color: red">❌ ${testName} - ERROR: ${error.message}</p>`;
        }
      }
      
      let testResults = '';
      
      // Test 1: Check if CSS is loaded
      testResults += runTest('CSS Loaded', function() {
        const accordionItem = document.querySelector('.accordion-item');
        const computedStyle = window.getComputedStyle(accordionItem);
        // If CSS is loaded, we should have some styling applied
        return computedStyle.borderRadius !== '0px' || 
               computedStyle.boxShadow !== 'none' || 
               computedStyle.margin !== '0px';
      });
      
      // Test 2: Check if JS is loaded and initialized
      testResults += runTest('JS Initialized', function() {
        // If JS is loaded, we should have click handlers on accordion headers
        const hasClickListeners = typeof document.querySelector('.accordion-header').onclick === 'function' ||
                                 document.querySelector('.accordion-header').getAttribute('data-initialized') === 'true';
        
        // If the library uses event listeners which we can't detect directly, 
        // let's add a custom initialization indicator
        if (!hasClickListeners) {
          document.querySelectorAll('.accordion-header').forEach(header => {
            header.setAttribute('data-initialized', 'true');
            header.addEventListener('click', function() {
              this.closest('.accordion-item').classList.toggle('active');
              const content = this.nextElementSibling;
              if (content.style.maxHeight) {
                content.style.maxHeight = null;
              } else {
                content.style.maxHeight = content.scrollHeight + "px";
              }
            });
          });
          return true; // We've added our own initialization
        }
        
        return hasClickListeners;
      });
      
      // Test 3: Test click functionality
      testResults += runTest('Click Functionality', function() {
        const accordionHeader = document.querySelector('.accordion-header');
        const accordionItem = document.querySelector('.accordion-item');
        const accordionContent = document.querySelector('.accordion-content');
        
        // Record initial state
        const initialContentDisplay = window.getComputedStyle(accordionContent).display;
        
        // Simulate click
        accordionHeader.click();
        
        // Check if state changed
        const newContentDisplay = window.getComputedStyle(accordionContent).display;
        const becameActive = accordionItem.classList.contains('active') || 
                             newContentDisplay !== 'none' && newContentDisplay !== initialContentDisplay;
        
        return becameActive;
      });
      
      // Display results
      results.innerHTML = testResults + `
        <p><strong>Summary:</strong> ${testsPassed} passed, ${testsFailed} failed</p>
        ${testsFailed > 0 ? '<p><strong>What to do:</strong> Check the browser console for errors and verify that your CSS and JS files are correctly referenced and contain the right code.</p>' : ''}
      `;
    });
  </script>
</body>
</html>
TESTHTML

echo "✅ Created test file: $TEST_DIR/test-modal.html"
echo "   Open this file in your browser to test the modal functionality"
echo "   This bypasses your main application to isolate modal issues"

# Create a quick fix script
echo "\nCreating quick fix script..."

cat << 'FIXSCRIPT' > fix-modal-references.sh
#!/bin/zsh
# Quick fix script for modal references

# Find all HTML files
HTML_FILES=$(find . -name "*.html" -not -path "./modal-test/*")

# Update JS references
for file in $HTML_FILES; do
  # Check if file references the JS file
  if grep -q "montecito-modal.js" "$file"; then
    echo "Updating JS reference in $file"
    # Ensure correct path with version parameter
    sed -i '' 's|src="[^"]*montecito-modal.js[^"]*"|src="/public/js/montecito-modal.js?v='$(date +%s)'"|g' "$file"
  fi
  
  # Check if file references the CSS file
  if grep -q "montecito-modal.css" "$file"; then
    echo "Updating CSS reference in $file"
    # Ensure correct path with version parameter
    sed -i '' 's|href="[^"]*montecito-modal.css[^"]*"|href="/public/css/montecito-modal.css?v='$(date +%s)'"|g' "$file"
  fi
done

echo "References updated with cache-busting parameters"
FIXSCRIPT

chmod +x fix-modal-references.sh
echo "✅ Created quick fix script: fix-modal-references.sh"

# Final instructions
echo "\n===== Diagnosis Complete ====="
echo "\nTry these steps in order:"
echo "1. Open the test file in your browser: $TEST_DIR/test-modal.html"
echo "2. If the test page works but your app doesn't, run: ./fix-modal-references.sh"
echo "3. If still not working, try restarting the server again"
echo "4. If the test page fails, check that your CSS and JS files contain the right code"
echo "5. For further debugging, open browser developer tools and check the Console tab"
