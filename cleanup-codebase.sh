# Create a cleanup script
cat > ./cleanup-codebase.sh << 'EOT'
#!/bin/bash

echo "=== CODEBASE CLEANUP ==="
echo "Starting cleanup process..."

# Create backup directory (just in case)
mkdir -p ./code-backup
echo "Created backup directory: ./code-backup"

# 1. First backup essential files
cp ./public/index.html ./code-backup/
cp ./public/css/montecito.css ./code-backup/
cp ./public/css/styles.css ./code-backup/
cp ./public/css/modal-styles.css ./code-backup/
echo "Backed up essential files"

# 2. Identify and clean up redundant CSS files
echo "Removing redundant CSS files..."
css_files_to_remove=(
  "./public/css/accordion-fix.css"
  "./public/css/accordion-scroll.css"
  "./public/css/accordion-standardize.css"
  "./public/css/our-story-fix-updated.css"
  "./public/css/our-story-simple-fix.css"
  "./public/css/accordion-fix-temp.css"
  "./public/css/accordion-styles-fix.css"
  "./public/css/accordion-modal-fix.css"
  "./public/css/accordion-position-absolute.css"
  "./public/css/no-transitions.css"
)

for file in "${css_files_to_remove[@]}"; do
  if [ -f "$file" ]; then
    cp "$file" "./code-backup/"
    rm "$file"
    echo "  Removed: $file"
  fi
done

# 3. Identify and clean up redundant JS files
echo "Removing redundant JS files..."
js_files_to_remove=(
  "./public/js/accordion-fix.js"
  "./public/js/accordion-scroll.js"
  "./public/js/accordion-standardizer.js"
  "./public/js/comprehensive-accordion.js"
  "./public/js/fix-explore-accordion.js"
  "./public/js/force-accordion.js"
  "./public/js/accordion-consistency.js"
  "./public/js/accordion-position-fix.js"
  "./public/js/accordion-simple-fix.js"
  "./public/js/accordion-final-fix.js"
  "./public/js/accordion-toggle-only.js"
  "./public/js/accordion-debug.js"
  "./public/js/modal-scroll-fix.js"
  "./public/js/fix-modal-scroll.js"
)

for file in "${js_files_to_remove[@]}"; do
  if [ -f "$file" ]; then
    cp "$file" "./code-backup/"
    rm "$file"
    echo "  Removed: $file"
  fi
done

# 4. Remove all backup and temporary files
echo "Removing backup and temporary files..."
find ./public -name "*.bak*" -o -name "*.backup*" -o -name "*.original*" | while read file; do
  cp "$file" "./code-backup/"
  rm "$file"
  echo "  Removed: $file"
done

# 5. Clean up HTML file
echo "Cleaning up index.html..."
# Make a backup first
cp ./public/index.html ./code-backup/index.html.original

# Remove multiple style blocks and redundant CSS imports
sed -i '' -E '/<!-- Temporary fix/,/-->/d' ./public/index.html
sed -i '' -E '/<style id="accordion-override"/,/<\/style>/d' ./public/index.html
sed -i '' '/accordion-fix-temp.css/d' ./public/index.html
sed -i '' '/accordion-scroll-fix.css/d' ./public/index.html

echo "Cleanup complete! Original files backed up to ./code-backup/"
EOT

chmod +x ./cleanup-codebase.sh