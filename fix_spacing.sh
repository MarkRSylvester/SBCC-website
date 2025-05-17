#!/bin/zsh
if [ ! -d "css" ]; then
  mkdir -p css
  echo "Created css directory"
fi

cat > css/founder-story-spacing.css << 'CSSCONTENT'
/* CSS to add proper spacing between founder story paragraphs */
.founder-text p {
  margin-bottom: 16px; /* Add space after each paragraph */
}

.founder-text p:last-child {
  margin-bottom: 0; /* Remove margin from the last paragraph to avoid extra space */
}

/* This affects the signature line */
.founder-signature {
  margin-top: 16px !important; /* Ensure there's space before the signature */
  display: block; /* Make sure it's on its own line */
  text-align: right; /* Align the signature to the right */
}
CSSCONTENT

echo "CSS file created successfully"

# Find the actual path to the index.html file
INDEX_FILE=$(find . -name "index.html" -type f | head -n 1)

if [ -n "$INDEX_FILE" ]; then
  echo "Found index.html at: $INDEX_FILE"
  sed -i '' '/<link rel="stylesheet" href="css\/our-story-custom.css">/a \
    <link rel="stylesheet" href="css/founder-story-spacing.css">' "$INDEX_FILE"
  echo "Added CSS reference to $INDEX_FILE"
else
  echo "Could not find index.html file. Please specify the full path to your index.html file"
fi
