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
