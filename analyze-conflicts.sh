#!/bin/bash

echo "=== ACCORDION CSS FILE ANALYSIS ==="
echo "Looking for accordion styles in CSS files..."
echo ""

for file in ./public/css/*accordion*.css ./public/css/*story*.css ./public/css/modal-styles.css; do
  if [ -f "$file" ]; then
    lines=$(wc -l < "$file")
    accordion_rules=$(grep -c "accordion" "$file")
    last_modified=$(stat -f "%Sm" -t "%Y-%m-%d %H:%M:%S" "$file")
    
    echo "File: $(basename "$file")"
    echo "  Lines: $lines"
    echo "  Accordion rules: $accordion_rules" 
    echo "  Last modified: $last_modified"
    echo ""
  fi
done

echo "=== ACCORDION JS FILE ANALYSIS ==="
echo "Looking for accordion functionality in JS files..."
echo ""

for file in ./public/js/*accordion*.js ./public/js/*story*.js; do
  if [ -f "$file" ]; then
    lines=$(wc -l < "$file")
    references=$(grep -c "accordion" "$file")
    toggle_code=$(grep -c "toggle\|classList.add\|classList.remove" "$file")
    last_modified=$(stat -f "%Sm" -t "%Y-%m-%d %H:%M:%S" "$file")
    
    echo "File: $(basename "$file")"
    echo "  Lines: $lines"
    echo "  Accordion references: $references"
    echo "  Toggle operations: $toggle_code" 
    echo "  Last modified: $last_modified"
    echo ""
  fi
done

echo "=== INLINE STYLES ANALYSIS ==="
grep -n "style=" ./public/index.html | grep -i "accordion\|max-height\|overflow"
echo ""

echo "=== CSS IMPORTS IN HTML ==="
grep -n "<link.*css" ./public/index.html | grep -i "accordion\|story\|modal"
echo ""

echo "=== JS IMPORTS IN HTML ==="
grep -n "<script.*src=" ./public/index.html | grep -i "accordion\|story"
echo ""
