#!/bin/zsh
# Script to fix caching issues preventing new code from appearing

echo "===== SBCC Cache-Busting Tool ====="

# Add version query parameters to CSS and JS includes
echo "\nAdding version timestamps to file references..."

# Get current timestamp for cache busting
TIMESTAMP=$(date +%s)

# Look for HTML files that include the modal CSS and JS
HTML_FILES=$(find . -name "*.html")
CSS_FILE="montecito-modal.css"
JS_FILE="montecito-modal.js"

if [[ -z "$HTML_FILES" ]]; then
  echo "❌ No HTML files found. Please specify the main HTML file path:"
  read HTML_PATH
  HTML_FILES="$HTML_PATH"
fi

for file in $HTML_FILES; do
  # Check if this HTML file references our CSS file
  if grep -q "$CSS_FILE" "$file"; then
    echo "📄 Processing $file - found CSS reference"
    
    # Add version parameter to CSS file reference
    sed -i '' "s|$CSS_FILE\([\"']\)|$CSS_FILE?v=$TIMESTAMP\1|g" "$file"
    
    echo "✅ Updated CSS reference with cache-busting parameter"
  fi
  
  # Check if this HTML file references our JS file
  if grep -q "$JS_FILE" "$file"; then
    echo "📄 Processing $file - found JS reference"
    
    # Add version parameter to JS file reference
    sed -i '' "s|$JS_FILE\([\"']\)|$JS_FILE?v=$TIMESTAMP\1|g" "$file"
    
    echo "✅ Updated JS reference with cache-busting parameter"
  fi
done

# Create specific cache-busting verifier file
echo "\nCreating cache-busting verification file..."
mkdir -p public/verify
VERIFY_ID=$(date +%Y%m%d%H%M%S)

cat << VERIFYCSS > public/verify/verify-$VERIFY_ID.css
/* Cache verification file - $VERIFY_ID */
.verify-cache-$VERIFY_ID {
  display: block;
  position: fixed;
  bottom: 10px;
  right: 10px;
  background: rgba(0,0,0,0.7);
  color: white;
  padding: 5px 10px;
  font-size: 12px;
  z-index: 10000;
  border-radius: 3px;
}
VERIFYCSS

cat << VERIFYHTML > public/verify/verify-$VERIFY_ID.html
<!-- Cache verification snippet - Add this to your main HTML file temporarily -->
<link rel="stylesheet" href="/verify/verify-$VERIFY_ID.css">
<div class="verify-cache-$VERIFY_ID">Cache verified: $VERIFY_ID</div>
VERIFYHTML

echo "✅ Created verification files with ID: $VERIFY_ID"
echo "⚠️ Copy the content from: public/verify/verify-$VERIFY_ID.html"
echo "   and paste it into your main HTML file temporarily to verify caching is resolved."

# Check for common server caching mechanisms
echo "\nChecking for common caching mechanisms..."

# Check for .htaccess
if [[ -f ".htaccess" ]]; then
  echo "⚠️ Found .htaccess file. You might need to modify it to disable caching."
  echo "   Consider adding the following lines:"
  echo "   <IfModule mod_headers.c>"
  echo "     Header set Cache-Control \"no-cache, no-store, must-revalidate\""
  echo "     Header set Pragma \"no-cache\""
  echo "     Header set Expires 0"
  echo "   </IfModule>"
fi

# Create browser cache test/reset script to run in browser console
cat << CONSOLESCRIPT > public/verify/reset-cache-script.js
// Run this in browser console to test/clear caches
(function() {
  console.log('🔄 Testing browser caches...');
  
  // Check if browser caching is active
  let cacheStatus = 'unknown';
  const fetchTime = Date.now();
  
  fetch(window.location.href + '?cache-test=' + fetchTime)
    .then(response => {
      const headers = response.headers;
      if (headers.get('cache-control')) {
        console.log('📋 Cache-Control header:', headers.get('cache-control'));
        cacheStatus = 'controlled';
      } else {
        console.log('⚠️ No Cache-Control header found');
        cacheStatus = 'uncontrolled';
      }
      
      // Clear browser caches
      console.log('🧹 Attempting to clear caches...');
      
      if ('caches' in window) {
        caches.keys().then(keyList => {
          return Promise.all(keyList.map(key => {
            console.log('🗑️ Deleting cache:', key);
            return caches.delete(key);
          }));
        }).then(() => {
          console.log('✅ All caches cleared successfully');
        });
      } else {
        console.log('❌ Cache API not available in this browser');
      }
      
      console.log('🔄 Manual cache clearing steps:');
      console.log('1. Open Chrome DevTools (F12)');
      console.log('2. Right-click the reload button');
      console.log('3. Select "Empty Cache and Hard Reload"');
      
      return cacheStatus;
    })
    .catch(err => {
      console.error('❌ Error testing cache:', err);
    });
    
  // Force reload after info
  console.log('⏱️ Will force reload in 5 seconds...');
  setTimeout(() => {
    console.log('🔄 Forcing reload now...');
    window.location.reload(true);
  }, 5000);
})();
CONSOLESCRIPT

echo "✅ Created browser console script for cache testing and resetting"
echo "   You can run it by opening your browser console and entering:"
echo "   fetch('/verify/reset-cache-script.js').then(r=>r.text()).then(eval)"

# Final instructions
echo "\n===== Cache-Busting Actions Complete ====="
echo "\nNext steps:"
echo "1. Restart your development server"
echo "2. Open your browser in incognito/private mode"
echo "3. Try a hard refresh (Ctrl+Shift+R or Command+Shift+R)"
echo "4. If issues persist, add the verification snippet to your HTML"
echo "5. Check that the verification badge appears with ID: $VERIFY_ID"
echo "6. Run the console script for advanced cache clearing"
