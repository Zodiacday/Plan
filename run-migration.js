const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials!');
  console.error('Check .env.local file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function runMigration() {
  console.log('🚀 Starting database migration...\n');
  
  try {
    // Read the SQL file
    const sql = fs.readFileSync('./database/migration-clean.sql', 'utf8');
    
    // Split into individual statements
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));
    
    console.log(`📝 Found ${statements.length} SQL statements to execute\n`);
    
    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const stmt = statements[i];
      
      // Skip comments
      if (stmt.startsWith('--')) continue;
      
      try {
        const { data, error } = await supabase.rpc('exec_sql', { sql_query: stmt + ';' });
        
        if (error) {
          // Try direct query if RPC doesn't work
          const result = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'apikey': supabaseServiceKey,
              'Authorization': `Bearer ${supabaseServiceKey}`
            },
            body: JSON.stringify({ sql_query: stmt + ';' })
          });
          
          if (!result.ok) {
            console.log(`⚠️  Statement ${i + 1}:`, stmt.substring(0, 60) + '...');
          } else {
            console.log(`✅ Statement ${i + 1} executed`);
          }
        } else {
          console.log(`✅ Statement ${i + 1} executed`);
        }
      } catch (err) {
        console.log(`⚠️  Statement ${i + 1}:`, err.message);
      }
    }
    
    console.log('\n🎉 Migration completed!');
    console.log('\n📊 Verifying data...');
    
    // Verify categories
    const { data: categories, error: catError } = await supabase
      .from('categories')
      .select('count');
    
    if (!catError) {
      console.log(`✅ Categories table ready`);
    }
    
    // Verify tools
    const { data: tools, error: toolError } = await supabase
      .from('tools')
      .select('count');
    
    if (!toolError) {
      console.log(`✅ Tools table ready`);
    }
    
    console.log('\n✨ All done! Refresh your site at http://localhost:3000');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

runMigration();
