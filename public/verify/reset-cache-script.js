// Run this in browser console to test/clear caches
(function() {
  console.log('🔄 Testing browser caches...');
  
  // Check if browser caching is active
  let cacheStatus = 'unknown';
  const fetchTime = Date.now();
  
  fetch(window.location.href + '?cache-test=' + fetchTime)
    .then(response => {
      const headers = response.headers;
      if (headers.get('cache-control')) {
        console.log('📋 Cache-Control header:', headers.get('cache-control'));
        cacheStatus = 'controlled';
      } else {
        console.log('⚠️ No Cache-Control header found');
        cacheStatus = 'uncontrolled';
      }
      
      // Clear browser caches
      console.log('🧹 Attempting to clear caches...');
      
      if ('caches' in window) {
        caches.keys().then(keyList => {
          return Promise.all(keyList.map(key => {
            console.log('🗑️ Deleting cache:', key);
            return caches.delete(key);
          }));
        }).then(() => {
          console.log('✅ All caches cleared successfully');
        });
      } else {
        console.log('❌ Cache API not available in this browser');
      }
      
      console.log('🔄 Manual cache clearing steps:');
      console.log('1. Open Chrome DevTools (F12)');
      console.log('2. Right-click the reload button');
      console.log('3. Select "Empty Cache and Hard Reload"');
      
      return cacheStatus;
    })
    .catch(err => {
      console.error('❌ Error testing cache:', err);
    });
    
  // Force reload after info
  console.log('⏱️ Will force reload in 5 seconds...');
  setTimeout(() => {
    console.log('🔄 Forcing reload now...');
    window.location.reload(true);
  }, 5000);
})();
