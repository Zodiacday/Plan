-- Test connection and setup database
-- Copy this entire file and run it in your Supabase SQL Editor

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  tool_count INTEGER DEFAULT 0,
  section VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create tools table
CREATE TABLE IF NOT EXISTS tools (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  url VARCHAR(500),
  logo VARCHAR(500),
  category_slug VARCHAR(255) REFERENCES categories(slug),
  tags TEXT[],
  rating REAL DEFAULT 0,
  is_free BOOLEAN DEFAULT TRUE,
  pros TEXT[],
  cons TEXT[],
  platforms TEXT[],
  alternatives TEXT[],
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_tools_category_slug ON tools(category_slug);
CREATE INDEX IF NOT EXISTS idx_tools_rating ON tools(rating DESC);
CREATE INDEX IF NOT EXISTS idx_tools_is_free ON tools(is_free);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);

-- Insert sample categories
INSERT INTO categories (slug, name, description, tool_count, section) VALUES
  ('productivity', 'Productivity', 'Tools to boost your productivity and efficiency', 0, 'Work'),
  ('design', 'Design', 'Design tools for creators and designers', 0, 'Creative'),
  ('development', 'Development', 'Developer tools and utilities', 0, 'Tech'),
  ('marketing', 'Marketing', 'Marketing and analytics tools', 0, 'Business'),
  ('ai', 'AI & Machine Learning', 'Artificial intelligence and ML tools', 0, 'Tech'),
  ('writing', 'Writing', 'Tools for writers and content creators', 0, 'Creative'),
  ('finance', 'Finance', 'Financial management and budgeting tools', 0, 'Business'),
  ('education', 'Education', 'Learning and educational resources', 0, 'Learning')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample tools
INSERT INTO tools (slug, name, description, url, logo, category_slug, tags, rating, is_free, platforms, pros, cons, alternatives) VALUES
  (
    'notion',
    'Notion',
    'All-in-one workspace for notes, tasks, wikis, and databases',
    'https://notion.so',
    'https://logo.clearbit.com/notion.so',
    'productivity',
    ARRAY['notes', 'collaboration', 'workspace'],
    4.8,
    TRUE,
    ARRAY['Web', 'Mac', 'Windows', 'iOS', 'Android'],
    ARRAY['Highly customizable', 'Great for team collaboration', 'Free tier is generous'],
    ARRAY['Can be overwhelming for beginners', 'Offline mode limitations'],
    ARRAY['Obsidian', 'Coda', 'Roam Research']
  ),
  (
    'figma',
    'Figma',
    'Collaborative interface design tool',
    'https://figma.com',
    'https://logo.clearbit.com/figma.com',
    'design',
    ARRAY['design', 'ui', 'collaboration', 'prototyping'],
    4.9,
    TRUE,
    ARRAY['Web', 'Mac', 'Windows'],
    ARRAY['Real-time collaboration', 'Browser-based', 'Powerful prototyping'],
    ARRAY['Can be slow with large files', 'Requires internet connection'],
    ARRAY['Adobe XD', 'Sketch', 'Framer']
  ),
  (
    'vscode',
    'Visual Studio Code',
    'Free source-code editor made by Microsoft',
    'https://code.visualstudio.com',
    'https://logo.clearbit.com/code.visualstudio.com',
    'development',
    ARRAY['code editor', 'ide', 'development'],
    4.9,
    TRUE,
    ARRAY['Mac', 'Windows', 'Linux'],
    ARRAY['Huge extension marketplace', 'Lightweight and fast', 'Great Git integration'],
    ARRAY['High memory usage with many extensions', 'Initial setup can be complex'],
    ARRAY['Sublime Text', 'Atom', 'JetBrains IDEs']
  ),
  (
    'canva',
    'Canva',
    'Easy-to-use graphic design platform',
    'https://canva.com',
    'https://logo.clearbit.com/canva.com',
    'design',
    ARRAY['design', 'graphics', 'templates'],
    4.7,
    TRUE,
    ARRAY['Web', 'iOS', 'Android'],
    ARRAY['User-friendly interface', 'Tons of templates', 'Great for non-designers'],
    ARRAY['Limited advanced features', 'Some premium content'],
    ARRAY['Adobe Express', 'Crello', 'VistaCreate']
  ),
  (
    'trello',
    'Trello',
    'Visual collaboration tool for project management',
    'https://trello.com',
    'https://logo.clearbit.com/trello.com',
    'productivity',
    ARRAY['project management', 'kanban', 'collaboration'],
    4.6,
    TRUE,
    ARRAY['Web', 'Mac', 'Windows', 'iOS', 'Android'],
    ARRAY['Simple and intuitive', 'Great for teams', 'Flexible boards'],
    ARRAY['Can get messy with large projects', 'Limited reporting'],
    ARRAY['Asana', 'Monday.com', 'ClickUp']
  ),
  (
    'chatgpt',
    'ChatGPT',
    'AI-powered conversational assistant',
    'https://chat.openai.com',
    'https://logo.clearbit.com/openai.com',
    'ai',
    ARRAY['ai', 'chatbot', 'assistant', 'gpt'],
    4.8,
    TRUE,
    ARRAY['Web', 'iOS', 'Android'],
    ARRAY['Powerful AI responses', 'Versatile use cases', 'Constantly improving'],
    ARRAY['Can make mistakes', 'Limited free usage', 'Privacy concerns'],
    ARRAY['Claude', 'Gemini', 'Perplexity']
  )
ON CONFLICT (slug) DO NOTHING;

-- Update tool counts for categories
UPDATE categories c
SET tool_count = (
  SELECT COUNT(*) FROM tools t WHERE t.category_slug = c.slug
);

-- Create function to auto-update tool_count
CREATE OR REPLACE FUNCTION update_category_tool_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE categories SET tool_count = tool_count + 1 WHERE slug = NEW.category_slug;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE categories SET tool_count = tool_count - 1 WHERE slug = OLD.category_slug;
  ELSIF TG_OP = 'UPDATE' AND NEW.category_slug != OLD.category_slug THEN
    UPDATE categories SET tool_count = tool_count - 1 WHERE slug = OLD.category_slug;
    UPDATE categories SET tool_count = tool_count + 1 WHERE slug = NEW.category_slug;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for auto-updating tool counts
DROP TRIGGER IF EXISTS trigger_update_tool_count ON tools;
CREATE TRIGGER trigger_update_tool_count
AFTER INSERT OR UPDATE OR DELETE ON tools
FOR EACH ROW EXECUTE FUNCTION update_category_tool_count();

-- Verify setup
SELECT 'Categories created:', COUNT(*) FROM categories;
SELECT 'Tools created:', COUNT(*) FROM tools;
