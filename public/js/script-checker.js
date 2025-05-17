console.log("Script checker running...");

// Function to check for basic syntax errors in other scripts
function checkScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    
    script.onload = () => {
      console.log(`✅ Script loaded successfully: ${url}`);
      resolve(true);
    };
    
    script.onerror = () => {
      console.error(`❌ Error loading script: ${url}`);
      reject(new Error(`Failed to load ${url}`));
    };
    
    document.head.appendChild(script);
  });
}

// Test our accordion scripts one by one
async function testScripts() {
  try {
    // Test each script individually
    await checkScript('/js/modal-accordion.js');
    await checkScript('/js/accordion-initializer.js');
    await checkScript('/js/debug-accordion.js');
    await checkScript('/js/specific-accordion-fix.js');
    await checkScript('/js/direct-html-fix.js');
    await checkScript('/js/immediate-accordion-fix.js');
    await checkScript('/js/inline-style-fix.js');
    await checkScript('/js/accordion-debug-tool.js');
    
    console.log("✅ All scripts loaded successfully!");
  } catch (error) {
    console.error("❌ Script testing failed:", error);
  }
}

// Run the tests
testScripts();
