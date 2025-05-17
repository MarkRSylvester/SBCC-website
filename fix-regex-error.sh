#!/bin/zsh
# Script to fix the regular expression syntax error in montecito-modal.js

echo "===== Fixing RegExp Syntax Error ====="

# Create backup of current JS file
JS_FILE="public/js/montecito-modal.js"
BACKUP_DIR="backups/regex_fix_$(date +%Y%m%d_%H%M%S)"
mkdir -p $BACKUP_DIR
if [[ -f "$JS_FILE" ]]; then
  cp "$JS_FILE" "$BACKUP_DIR/montecito-modal.js.bak"
  echo "✅ Created backup of JS file"
else
  echo "❌ JS file not found at: $JS_FILE"
  exit 1
fi

# Find the line with the regex error
if grep -q "Invalid regular expression flags" "$JS_FILE"; then
  echo "Found potential regex error in JS file"
fi

# Create a fixed version of the JS file
echo "Creating fixed JS file without regex errors..."

cat << 'FIXEDJS' > "$JS_FILE"
/* Santa Barbara Chef Collective - Montecito Modal JS */
/* RegExp Error Fixed: $(date) */

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
        console.error('Modal with ID "' + modalId + '" not found');
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

// Accordion functionality - FIXED IMPLEMENTATION WITH NO REGEX
function initializeAccordions() {
  console.log('Initializing accordions with fixed click functionality');
  
  // Get all accordion headers
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  // Add click event to each header
  accordionHeaders.forEach(function(header) {
    // Remove any existing listeners (if any) by cloning
    const newHeader = header.cloneNode(true);
    if (header.parentNode) {
      header.parentNode.replaceChild(newHeader, header);
    }
    
    // Add click event listener
    newHeader.addEventListener('click', function() {
      // Get the parent accordion item
      const accordionItem = this.closest('.accordion-item');
      
      if (!accordionItem) {
        console.error('No parent accordion-item found');
        return;
      }
      
      // Get the content element
      const accordionContent = accordionItem.querySelector('.accordion-content');
      
      if (!accordionContent) {
        console.error('No .accordion-content found in accordion item');
        return;
      }
      
      // Toggle the active class
      if (accordionItem.classList.contains('active')) {
        // Currently active, so close it
        accordionItem.classList.remove('active');
        accordionItem.classList.remove('open');
        
        // Set direct styles for closing
        accordionContent.style.display = 'none';
        accordionContent.style.maxHeight = '0';
        accordionContent.style.padding = '0 1.5rem';
        
        // Update ARIA
        this.setAttribute('aria-expanded', 'false');
      } else {
        // Currently closed, so open it
        accordionItem.classList.add('active');
        accordionItem.classList.add('open');
        
        // Set direct styles for opening
        accordionContent.style.display = 'block';
        accordionContent.style.height = 'auto';
        accordionContent.style.maxHeight = 'none';
        accordionContent.style.padding = '20px';
        accordionContent.style.overflow = 'auto';
        
        // Update ARIA
        this.setAttribute('aria-expanded', 'true');
        
        console.log('Accordion opened:', accordionItem.id || 'unnamed accordion');
      }
    });
    
    // Set ARIA attributes
    newHeader.setAttribute('role', 'button');
    newHeader.setAttribute('aria-expanded', 
      newHeader.closest('.accordion-item').classList.contains('active') ? 'true' : 'false');
  });
  
  // Initialize accordions that should be open by default
  document.querySelectorAll('.accordion-item.active.open').forEach(function(item) {
    const content = item.querySelector('.accordion-content');
    const header = item.querySelector('.accordion-header');
    
    if (content && header) {
      // Ensure styles are applied correctly
      content.style.display = 'block';
      content.style.height = 'auto';
      content.style.maxHeight = 'none';
      content.style.padding = '20px';
      content.style.overflow = 'auto';
      
      // Update ARIA
      header.setAttribute('aria-expanded', 'true');
    }
  });
}

// Utility function for debugging
function logAccordionState() {
  const items = document.querySelectorAll('.accordion-item');
  
  console.group('Accordion States');
  items.forEach(function(item, index) {
    const header = item.querySelector('.accordion-header h3');
    const title = header ? header.textContent : 'Accordion ' + index;
    const isActive = item.classList.contains('active');
    const isOpen = item.classList.contains('open');
    
    console.log(title + ':', { 
      active: isActive, 
      open: isOpen, 
      classes: item.className
    });
  });
  console.groupEnd();
}

// Detect any potential conflicts
function detectConflicts() {
  const scripts = document.querySelectorAll('script');
  let conflicts = 0;
  
  console.log('Checking for potential conflicts...');
  
  scripts.forEach(function(script) {
    if (script.src && script.src.indexOf('montecito-modal.js') === -1) {
      if (script.src.indexOf('accordion') !== -1 || 
          script.src.indexOf('collapse') !== -1 || 
          script.src.indexOf('modal') !== -1) {
        console.warn('Potential conflict found:', script.src);
        conflicts++;
      }
    }
  });
  
  if (conflicts === 0) {
    console.log('✅ No potential conflicts detected');
  } else {
    console.warn('⚠️ Found ' + conflicts + ' potential conflicting scripts');
  }
  
  return conflicts === 0;
}

// Make utility functions available globally without regular expressions
window.sbcc = {
  openModal: function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) openModal(modal);
  },
  closeModal: function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) closeModal(modal);
  },
  logAccordionState: logAccordionState,
  detectConflicts: detectConflicts
};

// Run conflict detection on load
setTimeout(detectConflicts, 1000);
FIXEDJS

# Add timestamp to reference
TIMESTAMP=$(date +%s)

# Update HTML file to use the new version with timestamp to bust cache
if find . -name "*.html" -exec grep -l "montecito-modal.js" {} \; | xargs -I{} sed -i '' "s|src=\"[^\"]*montecito-modal.js[^\"]*\"|src=\"/public/js/montecito-modal.js?v=$TIMESTAMP\"|g" {} \; ; then
  echo "✅ Updated HTML files with timestamp for cache busting"
else
  echo "⚠️ Could not update HTML files with timestamp"
fi

echo "\n===== Fix Complete ====="
echo "The regular expression error has been fixed in the JS file."
echo "Please reload your page with a hard refresh (Cmd+Shift+R or Ctrl+Shift+R)."
echo "Check the console for any remaining errors."
