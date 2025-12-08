-- ============================================
-- ThePlugDude - Database Migration
-- This will DROP all existing tables and recreate with UUID
-- ⚠️ WARNING: This will DELETE all existing data!
-- ============================================

-- Drop old triggers and functions first (before dropping tables)
DROP FUNCTION IF EXISTS update_category_tool_count() CASCADE;
DROP FUNCTION IF EXISTS update_tool_votes() CASCADE;

-- Drop all existing tables (in correct order due to foreign keys)
DROP TABLE IF EXISTS tool_votes CASCADE;
DROP TABLE IF EXISTS tool_submissions CASCADE;
DROP TABLE IF EXISTS tools CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

-- Now run the enhanced schema
-- ============================================
-- CATEGORIES TABLE
-- ============================================
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  category_group VARCHAR(50) NOT NULL,
  tool_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TOOLS TABLE
-- ============================================
CREATE TABLE tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(200) NOT NULL,
  slug VARCHAR(200) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  long_description TEXT,
  website_url TEXT NOT NULL,
  logo_url TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  platform TEXT[],
  pricing_type VARCHAR(20),
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0,
  total_votes INTEGER DEFAULT 0,
  tags TEXT[],
  pros TEXT[],
  cons TEXT[],
  alternatives TEXT[],
  status VARCHAR(20) DEFAULT 'approved',
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TOOL VOTES TABLE
-- ============================================
CREATE TABLE tool_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id UUID REFERENCES tools(id) ON DELETE CASCADE,
  voter_identifier VARCHAR(255) NOT NULL,
  vote_type VARCHAR(10) NOT NULL CHECK (vote_type IN ('up', 'down')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(tool_id, voter_identifier)
);

-- ============================================
-- TOOL SUBMISSIONS TABLE
-- ============================================
CREATE TABLE tool_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(200) NOT NULL,
  website_url TEXT NOT NULL,
  description TEXT NOT NULL,
  category_suggested VARCHAR(100),
  submitter_email VARCHAR(255),
  submitter_name VARCHAR(100),
  platform TEXT[],
  pricing_type VARCHAR(20),
  tags TEXT[],
  status VARCHAR(20) DEFAULT 'pending',
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reviewed_at TIMESTAMP WITH TIME ZONE
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_tools_category ON tools(category_id);
CREATE INDEX idx_tools_status ON tools(status);
CREATE INDEX idx_tools_slug ON tools(slug);
CREATE INDEX idx_tools_featured ON tools(featured);
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_group ON categories(category_group);
CREATE INDEX idx_tool_votes_tool ON tool_votes(tool_id);
CREATE INDEX idx_submissions_status ON tool_submissions(status);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Function to update category tool count
CREATE OR REPLACE FUNCTION update_category_tool_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.status = 'approved' THEN
      UPDATE categories SET tool_count = tool_count + 1 WHERE id = NEW.category_id;
    END IF;
  ELSIF TG_OP = 'DELETE' THEN
    IF OLD.status = 'approved' THEN
      UPDATE categories SET tool_count = tool_count - 1 WHERE id = OLD.category_id;
    END IF;
  ELSIF TG_OP = 'UPDATE' THEN
    IF OLD.category_id != NEW.category_id OR OLD.status != NEW.status THEN
      IF OLD.status = 'approved' THEN
        UPDATE categories SET tool_count = tool_count - 1 WHERE id = OLD.category_id;
      END IF;
      IF NEW.status = 'approved' THEN
        UPDATE categories SET tool_count = tool_count + 1 WHERE id = NEW.category_id;
      END IF;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for tool count
CREATE TRIGGER update_tool_count_trigger
AFTER INSERT OR UPDATE OR DELETE ON tools
FOR EACH ROW EXECUTE FUNCTION update_category_tool_count();

-- Function to update vote counts
CREATE OR REPLACE FUNCTION update_tool_votes()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.vote_type = 'up' THEN
      UPDATE tools SET upvotes = upvotes + 1, total_votes = total_votes + 1 WHERE id = NEW.tool_id;
    ELSE
      UPDATE tools SET downvotes = downvotes + 1, total_votes = total_votes + 1 WHERE id = NEW.tool_id;
    END IF;
  ELSIF TG_OP = 'DELETE' THEN
    IF OLD.vote_type = 'up' THEN
      UPDATE tools SET upvotes = upvotes - 1, total_votes = total_votes - 1 WHERE id = OLD.tool_id;
    ELSE
      UPDATE tools SET downvotes = downvotes - 1, total_votes = total_votes - 1 WHERE id = OLD.tool_id;
    END IF;
  ELSIF TG_OP = 'UPDATE' THEN
    IF OLD.vote_type != NEW.vote_type THEN
      IF OLD.vote_type = 'up' THEN
        UPDATE tools SET upvotes = upvotes - 1, downvotes = downvotes + 1 WHERE id = NEW.tool_id;
      ELSE
        UPDATE tools SET upvotes = upvotes + 1, downvotes = downvotes - 1 WHERE id = NEW.tool_id;
      END IF;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for votes
CREATE TRIGGER update_votes_trigger
AFTER INSERT OR UPDATE OR DELETE ON tool_votes
FOR EACH ROW EXECUTE FUNCTION update_tool_votes();

-- ============================================
-- INSERT CATEGORIES
-- ============================================
INSERT INTO categories (name, slug, description, icon, category_group) VALUES
('Design Tools', 'design-tools', 'Tools for creating stunning visuals and designs', '', 'creative'),
('Video Editing', 'video-editing', 'Professional video editing and production tools', '', 'creative'),
('Photo Editing', 'photo-editing', 'Image editing and photo enhancement tools', '', 'creative'),
('3D & Animation', '3d-animation', '3D modeling and animation software', '', 'creative'),
('Productivity', 'productivity', 'Boost your workflow and get things done', '', 'productivity'),
('Note Taking', 'note-taking', 'Organize your thoughts and ideas', '', 'productivity'),
('Project Management', 'project-management', 'Manage projects and collaborate with teams', '', 'productivity'),
('Time Management', 'time-management', 'Track time and improve productivity', '', 'productivity'),
('Code Editors', 'code-editors', 'Write code with powerful editors', '', 'development'),
('Developer Tools', 'developer-tools', 'Tools for developers and programmers', '', 'development'),
('Version Control', 'version-control', 'Manage code versions and collaborate', '', 'development'),
('APIs & Integration', 'apis-integration', 'Connect and integrate services', '', 'development'),
('AI Tools', 'ai-tools', 'Artificial intelligence powered tools', '', 'ai'),
('Automation', 'automation', 'Automate repetitive tasks', '', 'ai'),
('Chatbots', 'chatbots', 'Conversational AI and chat tools', '', 'ai'),
('Marketing', 'marketing', 'Grow your business and reach customers', '', 'business'),
('Analytics', 'analytics', 'Track and analyze your data', '', 'business'),
('SEO Tools', 'seo-tools', 'Optimize for search engines', '', 'business'),
('Email Marketing', 'email-marketing', 'Email campaigns and newsletters', '', 'business'),
('Learning Platforms', 'learning-platforms', 'Online courses and education', '', 'learning'),
('Documentation', 'documentation', 'Create and manage documentation', '', 'learning');

-- ============================================
-- INSERT SAMPLE TOOLS
-- ============================================
INSERT INTO tools (name, slug, description, long_description, website_url, logo_url, category_id, platform, pricing_type, tags, pros, cons, alternatives, featured) 
SELECT 
  'Notion',
  'notion',
  'All-in-one workspace for notes, docs, and collaboration',
  'Notion is a powerful productivity tool that combines notes, databases, wikis, and project management into one seamless platform. Perfect for individuals and teams.',
  'https://notion.so',
  'https://logo.clearbit.com/notion.so',
  id,
  ARRAY['web', 'mac', 'windows', 'ios', 'android'],
  'freemium',
  ARRAY['productivity', 'notes', 'collaboration', 'database'],
  ARRAY['Highly customizable', 'Great templates', 'Database features', 'Real-time collaboration'],
  ARRAY['Steep learning curve', 'Can be slow with large pages'],
  ARRAY['Coda', 'Obsidian', 'Roam Research'],
  true
FROM categories WHERE slug = 'productivity' LIMIT 1;

INSERT INTO tools (name, slug, description, long_description, website_url, logo_url, category_id, platform, pricing_type, tags, pros, cons, alternatives, featured) 
SELECT 
  'Figma',
  'figma',
  'Collaborative interface design tool',
  'Figma is a cloud-based design tool that is similar to Sketch in functionality and features, but with big differences that make it better for team collaboration.',
  'https://figma.com',
  'https://logo.clearbit.com/figma.com',
  id,
  ARRAY['web', 'mac', 'windows'],
  'freemium',
  ARRAY['design', 'prototyping', 'collaboration', 'ui-ux'],
  ARRAY['Real-time collaboration', 'Browser-based', 'Powerful prototyping'],
  ARRAY['Can be slow with large files', 'Requires internet'],
  ARRAY['Adobe XD', 'Sketch', 'Framer'],
  true
FROM categories WHERE slug = 'design-tools' LIMIT 1;

INSERT INTO tools (name, slug, description, long_description, website_url, logo_url, category_id, platform, pricing_type, tags, pros, cons, alternatives, featured) 
SELECT 
  'VS Code',
  'vs-code',
  'Free, powerful code editor from Microsoft',
  'Visual Studio Code is a lightweight but powerful source code editor with support for debugging, Git control, syntax highlighting, and extensions.',
  'https://code.visualstudio.com',
  'https://logo.clearbit.com/code.visualstudio.com',
  id,
  ARRAY['mac', 'windows', 'linux'],
  'free',
  ARRAY['code-editor', 'development', 'extensions'],
  ARRAY['Huge extension marketplace', 'Fast and lightweight', 'Great Git integration'],
  ARRAY['High memory usage with many extensions'],
  ARRAY['Sublime Text', 'Atom', 'JetBrains IDEs'],
  true
FROM categories WHERE slug = 'code-editors' LIMIT 1;

INSERT INTO tools (name, slug, description, long_description, website_url, logo_url, category_id, platform, pricing_type, tags, pros, cons, alternatives, featured) 
SELECT 
  'ChatGPT',
  'chatgpt',
  'AI-powered conversational assistant',
  'ChatGPT is an advanced AI chatbot that can answer questions, write content, code, and help with various tasks using natural language.',
  'https://chat.openai.com',
  'https://logo.clearbit.com/openai.com',
  id,
  ARRAY['web', 'ios', 'android'],
  'freemium',
  ARRAY['ai', 'chatbot', 'writing', 'coding'],
  ARRAY['Powerful AI', 'Versatile use cases', 'Free tier available'],
  ARRAY['Can make mistakes', 'Limited free usage'],
  ARRAY['Claude', 'Gemini', 'Perplexity'],
  true
FROM categories WHERE slug = 'ai-tools' LIMIT 1;

INSERT INTO tools (name, slug, description, long_description, website_url, logo_url, category_id, platform, pricing_type, tags, pros, cons, alternatives, featured) 
SELECT 
  'Canva',
  'canva',
  'Easy-to-use graphic design platform',
  'Canva makes design simple for everyone. Create stunning graphics, presentations, and social media posts with thousands of templates.',
  'https://canva.com',
  'https://logo.clearbit.com/canva.com',
  id,
  ARRAY['web', 'ios', 'android'],
  'freemium',
  ARRAY['design', 'graphics', 'templates', 'social-media'],
  ARRAY['User-friendly', 'Tons of templates', 'Great for non-designers'],
  ARRAY['Limited advanced features', 'Some premium content'],
  ARRAY['Adobe Express', 'Crello'],
  true
FROM categories WHERE slug = 'design-tools' LIMIT 1;

INSERT INTO tools (name, slug, description, long_description, website_url, logo_url, category_id, platform, pricing_type, tags, pros, cons, alternatives, featured) 
SELECT 
  'Trello',
  'trello',
  'Visual project management with boards',
  'Trello organizes your projects into boards. In one glance, see what''s being worked on, who''s working on what, and where something is in a process.',
  'https://trello.com',
  'https://logo.clearbit.com/trello.com',
  id,
  ARRAY['web', 'mac', 'windows', 'ios', 'android'],
  'freemium',
  ARRAY['project-management', 'kanban', 'collaboration'],
  ARRAY['Simple and intuitive', 'Visual workflow', 'Great for teams'],
  ARRAY['Can get messy with large projects', 'Limited reporting'],
  ARRAY['Asana', 'Monday.com', 'ClickUp'],
  true
FROM categories WHERE slug = 'project-management' LIMIT 1;

-- ============================================
-- UPDATE TOOL COUNTS
-- ============================================
UPDATE categories c
SET tool_count = (
  SELECT COUNT(*) 
  FROM tools t 
  WHERE t.category_id = c.id AND t.status = 'approved'
);

-- ============================================
-- VERIFY
-- ============================================
SELECT 'Categories created:' as info, COUNT(*) as count FROM categories;
SELECT 'Tools created:' as info, COUNT(*) as count FROM tools;
SELECT 'Tables ready!' as status;
