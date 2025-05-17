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
