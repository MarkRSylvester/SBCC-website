#!/bin/zsh
# Script to update HTML references with cache-busting timestamps

echo "===== Updating HTML references with timestamps ====="

# Get current timestamp
TIMESTAMP=$(date +%s)

# Find all HTML files
HTML_FILES=$(find . -name "*.html" -not -path "./backups/*")

for file in $HTML_FILES; do
  echo "Processing $file..."
  
  # Check if file contains reference to montecito-modal.js
  if grep -q "montecito-modal.js" "$file"; then
    # Update JavaScript reference with timestamp
    echo "  Updating JS reference"
    sed -i '' "s|src=\"[^\"]*montecito-modal.js[^\"]*\"|src=\"/public/js/montecito-modal.js?v=$TIMESTAMP\"|g" "$file"
  fi
  
  # Check if file contains reference to montecito-modal.css
  if grep -q "montecito-modal.css" "$file"; then
    # Update CSS reference with timestamp
    echo "  Updating CSS reference"
    sed -i '' "s|href=\"[^\"]*montecito-modal.css[^\"]*\"|href=\"/public/css/montecito-modal.css?v=$TIMESTAMP\"|g" "$file"
  fi
done

echo "✅ HTML references updated with timestamp $TIMESTAMP"
