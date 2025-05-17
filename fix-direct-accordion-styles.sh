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
