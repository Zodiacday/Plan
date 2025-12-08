-- Step 1: Drop ALL existing tables
DROP TABLE IF EXISTS tool_votes CASCADE;
DROP TABLE IF EXISTS tool_submissions CASCADE;  
DROP TABLE IF EXISTS tools CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

-- Step 2: Drop all functions and triggers
DROP FUNCTION IF EXISTS update_category_tool_count() CASCADE;
DROP FUNCTION IF EXISTS update_tool_votes() CASCADE;

SELECT 'All old tables and functions dropped!' as status;
