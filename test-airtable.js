// Test Airtable Integration
const AIRTABLE_CONFIG = {
    apiKey: 'patfKhXwYiJq2fJvS.64d5ba1a0e0113046452e881fe66bd973df27fb89da1d77e8ae5a2143f2e1a5f',
    baseId: 'appOWFyYIGbLoKalt',
    tables: {
        chefs: 'Chefs',
        menus: 'Menus',
        faq: 'FAQ',
        contact: 'Contact Submissions'
    }
};

async function testAirtableConnection() {
    console.log('Starting Airtable Integration Tests');
    console.log('Account Type: Team Plan');
    console.log('----------------------------\n');
    
    try {
        // Test 1: Basic Connection & Authentication
        console.log('🔍 Test 1: Basic Connection & Authentication');
        const baseUrl = `https://api.airtable.com/v0/${AIRTABLE_CONFIG.baseId}/${AIRTABLE_CONFIG.tables.chefs}`;
        const response = await fetch(baseUrl, {
            headers: {
                'Authorization': `Bearer ${AIRTABLE_CONFIG.apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        // Log detailed response information
        console.log(`Status: ${response.status}`);
        console.log(`Status Text: ${response.statusText}`);
        
        // Log headers (including rate limit info)
        const headers = Object.fromEntries(response.headers.entries());
        console.log('Response Headers:', headers);

        if (!response.ok) {
            throw new Error(`Connection test failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('✅ Basic connection test passed');
        console.log(`Found ${data.records.length} records in Chefs table\n`);

        // Test 2: Sequential Rate Limit Test
        console.log('🔍 Test 2: Sequential Rate Limit Test');
        console.log('Making 5 sequential requests...');
        
        for (let i = 0; i < 5; i++) {
            console.log(`\nRequest ${i + 1}/5:`);
            const seqResponse = await fetch(baseUrl, {
                headers: {
                    'Authorization': `Bearer ${AIRTABLE_CONFIG.apiKey}`,
                    'Content-Type': 'application/json'
                }
            });
            
            console.log(`Status: ${seqResponse.status}`);
            if (seqResponse.headers.get('x-airtable-request-limit-remaining')) {
                console.log(`Remaining requests: ${seqResponse.headers.get('x-airtable-request-limit-remaining')}`);
            }
            
            if (!seqResponse.ok) {
                throw new Error(`Sequential request ${i + 1} failed: ${seqResponse.status} ${seqResponse.statusText}`);
            }
            
            // Add a small delay between requests
            await new Promise(resolve => setTimeout(resolve, 200));
        }
        
        console.log('✅ Sequential rate limit test passed\n');

        // Test 3: Table Access Test
        console.log('🔍 Test 3: Table Access Test');
        for (const [tableName, tableId] of Object.entries(AIRTABLE_CONFIG.tables)) {
            console.log(`\nTesting access to ${tableName} table:`);
            const tableUrl = `https://api.airtable.com/v0/${AIRTABLE_CONFIG.baseId}/${tableId}`;
            const tableResponse = await fetch(tableUrl, {
                headers: {
                    'Authorization': `Bearer ${AIRTABLE_CONFIG.apiKey}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log(`Status: ${tableResponse.status}`);
            if (tableResponse.headers.get('x-airtable-request-limit-remaining')) {
                console.log(`Remaining requests: ${tableResponse.headers.get('x-airtable-request-limit-remaining')}`);
            }

            if (tableResponse.ok) {
                const tableData = await tableResponse.json();
                console.log(`✅ ${tableName}: Access successful (${tableData.records.length} records)`);
            } else {
                console.log(`❌ ${tableName}: Access failed - ${tableResponse.status} ${tableResponse.statusText}`);
                const errorBody = await tableResponse.text();
                console.log('Error details:', errorBody);
            }
            
            // Add a small delay between table tests
            await new Promise(resolve => setTimeout(resolve, 200));
        }

    } catch (error) {
        console.error('\n❌ Test failed:', error.message);
        throw error;
    }
}

// Run the tests
console.log('🚀 Initializing Airtable integration tests...\n');
testAirtableConnection()
    .then(() => console.log('\n✅ All tests completed successfully'))
    .catch(error => console.error('\n❌ Tests failed:', error)); 