#!/bin/zsh
# Master script to fix modal implementation

echo "===== SBCC Modal Fix Tool ====="
echo "This script will run the complete set of fixes for the modal implementation."

# Step 1: Diagnose the current state
echo "\n🔍 STEP 1: Diagnosing current state..."
./diagnose-modal.sh

# Ask if user wants to continue
echo "\nDo you want to continue with the reset and fixes? (y/n)"
read REPLY

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "Exiting without making changes."
  exit 0
fi

# Step 2: Reset modal implementation
echo "\n🔄 STEP 2: Resetting modal implementation..."
./reset-modal.sh

# Step 3: Fix caching issues
echo "\n🧹 STEP 3: Fixing caching issues..."
./fix-caching.sh

# Step 4: Fix HTML includes
echo "\n🔌 STEP 4: Fixing HTML includes..."
./fix-html-includes.sh

# Step 5: Fix accordion styles
echo "\n🎛️ STEP 5: Fixing accordion styles..."
./fix-direct-accordion-styles.sh

echo "\n✅ COMPLETE: All fixes have been applied."
echo "Please restart your server and test the implementation using the test page:"
echo "http://localhost:<your-port>/public/test/modal-test.html"
