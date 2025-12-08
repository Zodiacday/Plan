const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = 'https://pbihlvkynygiitxwddok.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBiaWhsdmt5bnlnaWl0eHdkZG9rIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDc4ODEzNSwiZXhwIjoyMDgwMzY0MTM1fQ.tPJdcx7eUFZiCkZa4Z6njkI_oU2bF-gkWRdm5RQuwVY';

const supabase = createClient(supabaseUrl, supabaseKey);

async function runMigration() {
  console.log('🚀 Starting database migration...\n');
  
  const sqlFile = path.join(__dirname, '../database/migration-clean.sql');
  const sql = fs.readFileSync(sqlFile, 'utf8');
  
  try {
    // Execute the entire migration
    const { data, error } = await supabase.rpc('exec', { sql });
    
    if (error) {
      console.error('❌ Migration failed:', error.message);
      console.error('Details:', error);
      process.exit(1);
    }
    
    console.log('✅ Migration completed successfully!');
    
    // Verify the migration
    console.log('\n📊 Verifying migration...');
    
    const { data: categories, error: catError } = await supabase
      .from('categories')
      .select('count', { count: 'exact', head: true });
    
    const { data: tools, error: toolError } = await supabase
      .from('tools')
      .select('count', { count: 'exact', head: true });
    
    console.log(`Categories: ${categories?.length || 0}`);
    console.log(`Tools: ${tools?.length || 0}`);
    
    console.log('\n✨ Database is ready! Refresh http://localhost:3000');
    
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

runMigration();
