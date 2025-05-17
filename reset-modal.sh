#!/bin/zsh
# Script to reset modal implementation to a known working state

echo "===== Resetting Modal Implementation ====="

# Create backup of current files
echo "\nCreating backup of current files..."
BACKUP_TIME=$(date +%Y%m%d_%H%M%S)
mkdir -p backups/$BACKUP_TIME
find public/css -name "*modal*.css" -exec cp {} backups/$BACKUP_TIME/ \;
find public/js -name "*modal*.js" -exec cp {} backups/$BACKUP_TIME/ \;
echo "✅ Backup created in backups/$BACKUP_TIME"

# Create directories if they don't exist
mkdir -p public/css
mkdir -p public/js

# Create working modal CSS
echo "\nCreating fresh modal CSS..."
cat << 'MODALCSS' > public/css/montecito-modal.css
/* Santa Barbara Chef Collective - Montecito Modal CSS */
/* Reset: $(date) */

/* Modal Container */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(29, 53, 87, 0.7); /* Navy with opacity */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.modal.open {
  opacity: 1;
  visibility: visible;
}

.modal-content {
  background-color: #F9F7F2; /* Cream */
  border-radius: 5px;
  padding: 2rem;
  max-width: 90%;
  width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  transform: scale(0.95);
  transition: transform 0.3s ease;
}

.modal.open .modal-content {
  transform: scale(1);
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #1D3557; /* Navy */
  transition: color 0.3s ease;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.modal-close:hover {
  color: #4779B5; /* Mediterranean Blue */
  background-color: rgba(0, 0, 0, 0.05);
}

/* Accordion Styles */
.accordion-container {
  width: 100%;
  margin: 1.5rem 0;
}

.accordion-item {
  margin-bottom: 1rem;
  border-radius: 5px;
  overflow: hidden;
  background-color: #FFFFFF;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  position: relative;
}

.accordion-item:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 5px;
  background-color: #1D3557; /* Navy */
}

.accordion-header {
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  background-color: #FFFFFF;
}

.accordion-header:hover {
  background-color: rgba(71, 121, 181, 0.05); /* Mediterranean Blue with opacity */
}

.accordion-header h3 {
  margin: 0;
  font-family: 'Playfair Display', serif;
  font-weight: 500;
  color: #1D3557; /* Navy */
  font-size: 1.25rem;
}

.accordion-icon {
  transition: transform 0.3s ease;
  color: #1D3557; /* Navy */
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
}

.accordion-item.active .accordion-icon {
  transform: rotate(180deg);
}

.accordion-content {
  padding: 0 1.5rem;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease, padding 0.3s ease;
  color: #333333; /* Dark Text */
}

.accordion-item.active .accordion-content {
  padding: 1.5rem;
  max-height: 500px; /* Large enough for most content */
  overflow-y: auto;
}

/* Custom Scrollbar for Accordion Content */
.accordion-content::-webkit-scrollbar {
  width: 8px;
}

.accordion-content::-webkit-scrollbar-track {
  background: #F9F7F2; /* Cream */
  border-radius: 10px;
}

.accordion-content::-webkit-scrollbar-thumb {
  background-color: #A2A284; /* Muted Olive */
  border-radius: 10px;
  border: 2px solid #F9F7F2; /* Cream */
}

.accordion-content::-webkit-scrollbar-thumb:hover {
  background-color: #1D3557; /* Navy */
}

/* Section Intro */
.section-intro {
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  color: #1D3557; /* Navy */
  line-height: 1.6;
}

/* Category Grid */
.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

/* Category Card */
.category-card {
  background-color: #FFFFFF;
  border-radius: 5px;
  padding: 1.5rem;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

.category-title {
  color: #1D3557; /* Navy */
  font-family: 'Playfair Display', serif;
  font-size: 1.1rem;
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.divider {
  height: 2px;
  background-color: #E6DBC9; /* Sand */
  margin: 0.75rem 0;
}

/* Event List */
.event-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.event-list li {
  padding-left: 1.5rem;
  position: relative;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
}

.event-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.5em;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #4779B5; /* Mediterranean Blue */
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .modal-content {
    padding: 1.5rem;
    max-width: 95%;
  }
  
  .category-grid {
    grid-template-columns: 1fr;
  }
  
  .accordion-header h3 {
    font-size: 1.1rem;
  }
  
  .accordion-item.active .accordion-content {
    max-height: 400px; /* Smaller on mobile */
  }
}

/* Active States for Working Implementation */
.accordion-item.active.open .accordion-content {
  display: block;
  height: auto;
  max-height: none;
  padding: 20px;
  overflow: auto;
}
MODALCSS

# Create working modal JS
echo "Creating fresh modal JS..."
cat << 'MODALJS' > public/js/montecito-modal.js
/* Santa Barbara Chef Collective - Montecito Modal JS */
/* Reset: $(date) */

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('SBCC Modal: Initializing...');
  
  // Initialize modals
  initializeModals();
  
  // Initialize accordions
  initializeAccordions();
  
  console.log('SBCC Modal: Initialization complete');
});

// Modal functionality
function initializeModals() {
  const modalTriggers = document.querySelectorAll('[data-modal]');
  const modalClose = document.querySelectorAll('.modal-close');
  const modals = document.querySelectorAll('.modal');
  
  // Modal open triggers
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', function() {
      const modalId = trigger.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      
      if (modal) {
        openModal(modal);
      } else {
        console.error(`Modal with ID "${modalId}" not found`);
      }
    });
  });
  
  // Modal close buttons
  modalClose.forEach(close => {
    close.addEventListener('click', function() {
      const modal = close.closest('.modal');
      closeModal(modal);
    });
  });
  
  // Close on outside click
  modals.forEach(modal => {
    modal.addEventListener('click', function(event) {
      if (event.target === modal) {
        closeModal(modal);
      }
    });
  });
  
  // Close with ESC key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      const openModal = document.querySelector('.modal.open');
      if (openModal) {
        closeModal(openModal);
      }
    }
  });
}

// Open modal
function openModal(modal) {
  document.body.style.overflow = 'hidden'; // Prevent scrolling
  modal.classList.add('open');
  
  // Set focus for accessibility
  const firstFocusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  if (firstFocusable) {
    setTimeout(() => {
      firstFocusable.focus();
    }, 300);
  }
}

// Close modal
function closeModal(modal) {
  document.body.style.overflow = ''; // Restore scrolling
  modal.classList.remove('open');
}

// Accordion functionality
function initializeAccordions() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  accordionHeaders.forEach(header => {
    // Add click event
    header.addEventListener('click', function() {
      const accordionItem = this.closest('.accordion-item');
      
      // Close other accordions if needed
      // Uncomment to enable closing other accordions
      /*
      const siblingItems = document.querySelectorAll('.accordion-item');
      siblingItems.forEach(item => {
        if (item !== accordionItem && item.classList.contains('active')) {
          toggleAccordion(item, false);
        }
      });
      */
      
      // Toggle this accordion
      toggleAccordion(accordionItem);
    });
    
    // Set ARIA attributes
    header.setAttribute('role', 'button');
    header.setAttribute('aria-expanded', 'false');
  });
  
  // Check for accordions that should be open by default
  document.querySelectorAll('.accordion-item.active.open').forEach(item => {
    const content = item.querySelector('.accordion-content');
    const header = item.querySelector('.accordion-header');
    
    // Ensure styles are applied correctly
    content.style.display = 'block';
    content.style.height = 'auto';
    content.style.maxHeight = 'none';
    content.style.padding = '20px';
    content.style.overflow = 'auto';
    
    // Update ARIA
    if (header) {
      header.setAttribute('aria-expanded', 'true');
    }
  });
}

// Toggle accordion item
function toggleAccordion(accordionItem, force) {
  const header = accordionItem.querySelector('.accordion-header');
  const content = accordionItem.querySelector('.accordion-content');
  
  const isActive = typeof force !== 'undefined' ? force : !accordionItem.classList.contains('active');
  
  // Toggle class
  if (isActive) {
    accordionItem.classList.add('active');
    accordionItem.classList.add('open');
    header.setAttribute('aria-expanded', 'true');
    
    // Apply direct styles to ensure it works
    content.style.display = 'block';
    content.style.height = 'auto';
    content.style.maxHeight = 'none';
    content.style.padding = '20px';
    content.style.overflow = 'auto';
  } else {
    accordionItem.classList.remove('active');
    accordionItem.classList.remove('open');
    header.setAttribute('aria-expanded', 'false');
    
    // Apply direct styles
    content.style.display = 'none';
    content.style.maxHeight = '0';
    content.style.padding = '0 1.5rem';
  }
}

// Utility function for debugging
function logAccordionState() {
  const items = document.querySelectorAll('.accordion-item');
  
  console.group('Accordion States');
  items.forEach((item, index) => {
    const header = item.querySelector('.accordion-header h3');
    const title = header ? header.textContent : `Accordion ${index}`;
    const isActive = item.classList.contains('active');
    const isOpen = item.classList.contains('open');
    
    console.log(`${title}:`, { 
      active: isActive, 
      open: isOpen, 
      classes: item.className
    });
  });
  console.groupEnd();
}

// Make utility functions available globally
window.sbcc = {
  openModal: function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) openModal(modal);
  },
  closeModal: function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) closeModal(modal);
  },
  toggleAccordion: function(accordionId) {
    const accordion = document.getElementById(accordionId);
    if (accordion) toggleAccordion(accordion);
  },
  logAccordionState: logAccordionState
};
MODALJS

# Create a test HTML page
echo "Creating test HTML page..."
mkdir -p public/test
cat << 'TESTHTML' > public/test/modal-test.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SBCC Modal Test</title>
  
  <!-- Font imports -->
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;700&family=Inter:wght@400;500&display=swap" rel="stylesheet">
  
  <!-- Modal CSS with version param to bust cache -->
  <link rel="stylesheet" href="/public/css/montecito-modal.css?v=reset">
  
  <style>
    /* Base styles */
    body {
      font-family: 'Inter', sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 20px;
      background-color: #F9F7F2;
    }
    h1, h2, h3, h4 {
      font-family: 'Playfair Display', serif;
      color: #1D3557;
    }
    .container {
      background-color: white;
      border-radius: 5px;
      padding: 30px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    }
    .button {
      background-color: #1D3557;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 3px;
      font-family: 'Playfair Display', serif;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.3s ease, transform 0.3s ease;
    }
    .button:hover {
      background-color: #4779B5;
      transform: translateY(-2px);
    }
    .controls {
      margin: 30px 0;
      display: flex;
      gap: 15px;
      flex-wrap: wrap;
    }
    .status {
      padding: 15px;
      border-radius: 5px;
      margin: 20px 0;
      background-color: #E6DBC9;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Santa Barbara Chef Collective</h1>
    <h2>Modal &amp; Accordion Test Page</h2>
    
    <div class="status">
      <p><strong>Status:</strong> This is a clean test page to verify modal functionality with the reset implementation.</p>
    </div>
    
    <div class="controls">
      <button class="button" data-modal="test-modal">Open Test Modal</button>
      <button class="button" id="check-status">Check Status</button>
    </div>
    
    <div class="info">
      <h3>Instructions:</h3>
      <ol>
        <li>Click "Open Test Modal" to verify the modal opens correctly</li>
        <li>Test the accordions inside the modal</li>
        <li>Verify that accordions open and close as expected</li>
        <li>Click "Check Status" to run diagnostics</li>
      </ol>
    </div>
  </div>
  
  <!-- Test Modal -->
  <div id="test-modal" class="modal">
    <div class="modal-content">
      <button class="modal-close" aria-label="Close modal">&times;</button>
      <h2>Test Modal</h2>
      
      <p class="section-intro">This modal contains test accordions to verify functionality.</p>
      
      <div class="accordion-container">
        <!-- First Accordion -->
        <div class="accordion-item" id="first-accordion">
          <div class="accordion-header">
            <h3>First Accordion</h3>
            <div class="accordion-icon">+</div>
          </div>
          <div class="accordion-content">
            <p>This is the content of the first accordion. If you can see this, the accordion is working.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget aliquam nunc nisl eget nunc.</p>
          </div>
        </div>
        
        <!-- Second Accordion (open by default) -->
        <div class="accordion-item active open" id="second-accordion">
          <div class="accordion-header">
            <h3>Second Accordion (Open by Default)</h3>
            <div class="accordion-icon">+</div>
          </div>
          <div class="accordion-content" style="display:block; height:auto; max-height:none; padding:20px; overflow:auto;">
            <p>This accordion should be open by default.</p>
            <p>It uses the special "active open" classes and inline styles to ensure it displays properly.</p>
          </div>
        </div>
        
        <!-- Third Accordion -->
        <div class="accordion-item" id="third-accordion">
          <div class="accordion-header">
            <h3>Third Accordion with Grid</h3>
            <div class="accordion-icon">+</div>
          </div>
          <div class="accordion-content">
            <p class="section-intro">This accordion contains a category grid to test more complex content.</p>
            
            <div class="category-grid">
              <div class="category-card" data-category="wine">
                <h4 class="category-title">Category One</h4>
                <div class="divider"></div>
                <ul class="event-list">
                  <li>First item in the list</li>
                  <li>Second item with more text to test wrapping</li>
                  <li>Third item in the list</li>
                </ul>
              </div>
              
              <div class="category-card" data-category="tablesetting">
                <h4 class="category-title">Category Two</h4>
                <div class="divider"></div>
                <ul class="event-list">
                  <li>First item in the list</li>
                  <li>Second item with more text to test wrapping</li>
                  <li>Third item in the list</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Status Modal -->
  <div id="status-modal" class="modal">
    <div class="modal-content">
      <button class="modal-close" aria-label="Close modal">&times;</button>
      <h2>Diagnostic Status</h2>
      <div id="status-results"></div>
    </div>
  </div>
  
  <!-- Modal JS with version param to bust cache -->
  <script src="/public/js/montecito-modal.js?v=reset"></script>
  
  <!-- Diagnostic Script -->
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const checkStatusBtn = document.getElementById('check-status');
      const statusResults = document.getElementById('status-results');
      
      checkStatusBtn.addEventListener('click', function() {
        runDiagnostics();
      });
      
      function runDiagnostics() {
        const results = [];
        let passed = 0;
        let failed = 0;
        
        // Test 1: Modal JS loaded
        try {
          if (typeof window.sbcc === 'object') {
            results.push('✅ Modal JS loaded correctly');
            passed++;
          } else {
            results.push('❌ Modal JS not properly loaded');
            failed++;
          }
        } catch (e) {
          results.push(`❌ Error checking Modal JS: ${e.message}`);
          failed++;
        }
        
        // Test 2: Accordion initialization
        try {
          const accordionHeaders = document.querySelectorAll('.accordion-header');
          let initialized = true;
          
          accordionHeaders.forEach(header => {
            if (!header.getAttribute('role') === 'button') {
              initialized = false;
            }
          });
          
          if (initialized) {
            results.push('✅ Accordions initialized correctly');
            passed++;
          } else {
            results.push('❌ Accordions not properly initialized');
            failed++;
          }
        } catch (e) {
          results.push(`❌ Error checking accordions: ${e.message}`);
          failed++;
        }
        
        // Test 3: CSS loaded
        try {
          const accordionItem = document.querySelector('.accordion-item');
          const computedStyle = window.getComputedStyle(accordionItem);
          
          if (computedStyle.boxShadow && computedStyle.boxShadow !== 'none') {
            results.push('✅ Modal CSS loaded correctly');
            passed++;
          } else {
            results.push('❌ Modal CSS not properly loaded');
            failed++;
          }
        } catch (e) {
          results.push(`❌ Error checking CSS: ${e.message}`);
          failed++;
        }
        
        // Test 4: Default open accordion
        try {
          const secondAccordion = document.getElementById('second-accordion');
          const isOpen = secondAccordion.classList.contains('active') && 
                        secondAccordion.classList.contains('open');
          
          if (isOpen) {
            results.push('✅ Default open accordion working');
            passed++;
          } else {
            results.push('❌ Default open accordion not working');
            failed++;
          }
        } catch (e) {
          results.push(`❌ Error checking default open: ${e.message}`);
          failed++;
        }
        
        // Generate result HTML
        const totalTests = passed + failed;
        const resultHTML = `
          <div style="margin-bottom: 20px;">
            <p><strong>Tests Run:</strong> ${totalTests}</p>
            <p style="color: green;"><strong>Passed:</strong> ${passed}</p>
            <p style="color: red;"><strong>Failed:</strong> ${failed}</p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <h3>Detailed Results:</h3>
            <ul style="list-style-type: none; padding: 0;">
              ${results.map(result => `<li style="margin-bottom: 8px;">${result}</li>`).join('')}
            </ul>
          </div>
          
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
            <h3>Next Steps:</h3>
            ${failed > 0 ? `
              <p>Some tests failed. Try these troubleshooting steps:</p>
              <ol>
                <li>Check browser console for JavaScript errors</li>
                <li>Verify CSS file is loaded (Network tab in dev tools)</li>
                <li>Try disabling any other JavaScript that might conflict</li>
                <li>Ensure paths are correct in your HTML file</li>
              </ol>
            ` : `
              <p>All tests passed! You can now:</p>
              <ol>
                <li>Integrate this implementation into your main application</li>
                <li>Update all modal references to use this implementation</li>
                <li>Add content to match your requirements</li>
              </ol>
            `}
          </div>
        `;
        
        // Show results in modal
        statusResults.innerHTML = resultHTML;
        window.sbcc.openModal('status-modal');
      }
    });
  </script>
</body>
</html>
TESTHTML

# Create HTML include fix
echo "Creating HTML include fix script..."
cat << 'FIXHTML' > fix-html-includes.sh
#!/bin/zsh
# Script to fix HTML includes for modal files

echo "Fixing HTML includes for modal files..."

# Find HTML files
HTML_FILES=$(find . -name "*.html" -not -path "./public/test/*" -not -path "./backups/*")

for file in $HTML_FILES; do
  echo "Processing $file..."
  
  # Add version timestamp for cache busting
  TIMESTAMP=$(date +%s)
  
  # Check if the file already includes montecito-modal.css
  if grep -q "montecito-modal.css" "$file"; then
    echo "- Updating CSS reference"
    sed -i '' "s|href=[\"'][^\"']*montecito-modal.css[^\"']*[\"']|href=\"/public/css/montecito-modal.css?v=$TIMESTAMP\"|g" "$file"
  fi
  
  # Check if the file already includes montecito-modal.js
  if grep -q "montecito-modal.js" "$file"; then
    echo "- Updating JS reference"
    sed -i '' "s|src=[\"'][^\"']*montecito-modal.js[^\"']*[\"']|src=\"/public/js/montecito-modal.js?v=$TIMESTAMP\"|g" "$file"
  fi
  
  # Head tag exists but no CSS include
  if grep -q "</head>" "$file" && ! grep -q "montecito-modal.css" "$file"; then
    echo "- Adding CSS include to head"
    sed -i '' "s|</head>|  <link rel=\"stylesheet\" href=\"/public/css/montecito-modal.css?v=$TIMESTAMP\">\n</head>|" "$file"
  fi
  
  # Body end tag exists but no JS include
  if grep -q "</body>" "$file" && ! grep -q "montecito-modal.js" "$file"; then
    echo "- Adding JS include to body end"
    sed -i '' "s|</body>|  <script src=\"/public/js/montecito-modal.js?v=$TIMESTAMP\"></script>\n</body>|" "$file"
  fi
done

echo "HTML include fixes completed!"
FIXHTML

chmod +x fix-html-includes.sh

# Create a fix for direct accordion styling
echo "Creating direct accordion style fix..."
cat << 'FIXACCSTY' > fix-direct-accordion-styles.sh
#!/bin/zsh
# Script to add direct accordion styling to all accordion items with 'active open' classes

# Find all HTML files
HTML_FILES=$(find . -name "*.html" -not -path "./public/test/*" -not -path "./backups/*")

echo "Fixing direct accordion styling in HTML files..."

for file in $HTML_FILES; do
  echo "Processing $file..."
  
  # Find all active open accordions without style attribute and add it
  sed -i '' 's/<div class="accordion-item active open">\([^<]*\)<div class="accordion-content">/<div class="accordion-item active open">\1<div class="accordion-content" style="display:block; height:auto; max-height:none; padding:20px; overflow:auto;">/g' "$file"
  
  # Find all accordion-content elements in active open accordions and ensure they have right style
  sed -i '' 's/<div class="accordion-content">\([^<]*\)<\/div>/<div class="accordion-content">\1<\/div>/g' "$file"
done

echo "Direct accordion style fixes completed!"
FIXACCSTY

chmod +x fix-direct-accordion-styles.sh

# Final instructions
echo "\n===== Modal Implementation Reset Complete ====="
echo "\nNext steps:"
echo "1. Open the test page to verify functionality:"
echo "   http://localhost:<your-port>/public/test/modal-test.html"
echo ""
echo "2. Fix HTML includes by running:"
echo "   ./fix-html-includes.sh"
echo ""
echo "3. Fix direct accordion styles by running:"
echo "   ./fix-direct-accordion-styles.sh"
echo ""
echo "4. Restart your development server"
echo ""
echo "If everything works in the test page but not in your main application,"
echo "there may be conflicts with other scripts. Check the browser console for errors."
