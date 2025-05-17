# Create an audit report of all accordion-related files
cat > ./audit-code.sh << 'EOT'
#!/bin/bash

echo "=== CODE AUDIT REPORT ===" > code-audit-report.txt
echo "Generated: $(date)" >> code-audit-report.txt
echo "" >> code-audit-report.txt

echo "=== CSS FILES ===" >> code-audit-report.txt
echo "File count: $(find ./public/css -type f -name "*.css" | wc -l)" >> code-audit-report.txt
echo "" >> code-audit-report.txt

echo "Accordion-related CSS files:" >> code-audit-report.txt
find ./public/css -type f -name "*accordion*.css" | sort >> code-audit-report.txt
echo "" >> code-audit-report.txt

echo "Fix-related CSS files:" >> code-audit-report.txt
find ./public/css -type f -name "*fix*.css" | sort >> code-audit-report.txt
echo "" >> code-audit-report.txt

echo "=== JAVASCRIPT FILES ===" >> code-audit-report.txt
echo "File count: $(find ./public/js -type f -name "*.js" | wc -l)" >> code-audit-report.txt
echo "" >> code-audit-report.txt

echo "Accordion-related JS files:" >> code-audit-report.txt
find ./public/js -type f -name "*accordion*.js" | sort >> code-audit-report.txt
echo "" >> code-audit-report.txt

echo "Fix-related JS files:" >> code-audit-report.txt
find ./public/js -type f -name "*fix*.js" | sort >> code-audit-report.txt
echo "" >> code-audit-report.txt

echo "=== BACKUP FILES ===" >> code-audit-report.txt
find ./public -name "*.bak*" -o -name "*.backup*" -o -name "*.original*" | sort >> code-audit-report.txt
echo "" >> code-audit-report.txt

echo "=== CSS IMPORTS IN HTML ===" >> code-audit-report.txt
grep -n "<link.*css" ./public/index.html >> code-audit-report.txt
echo "" >> code-audit-report.txt

echo "=== JS IMPORTS IN HTML ===" >> code-audit-report.txt
grep -n "<script.*src=" ./public/index.html >> code-audit-report.txt
echo "" >> code-audit-report.txt

echo "=== INLINE STYLES IN HTML ===" >> code-audit-report.txt
grep -n "<style" ./public/index.html -A 2 >> code-audit-report.txt
echo "" >> code-audit-report.txt

echo "Audit report generated. See code-audit-report.txt for details."
EOT

chmod +x ./audit-code.sh
./audit-code.sh