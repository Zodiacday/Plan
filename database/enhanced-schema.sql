-- Enhanced Database Schema for ThePlugDude
-- Run this in Supabase SQL Editor

-- Create categories table with grouping
CREATE TABLE IF NOT EXISTS categories (
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

-- Create tools table with enhanced fields
CREATE TABLE IF NOT EXISTS tools (
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

-- Create user votes tracking table
CREATE TABLE IF NOT EXISTS tool_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id UUID REFERENCES tools(id) ON DELETE CASCADE,
  voter_identifier VARCHAR(255) NOT NULL,
  vote_type VARCHAR(10) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(tool_id, voter_identifier)
);

-- Create tool submissions table
CREATE TABLE IF NOT EXISTS tool_submissions (
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

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_tools_category ON tools(category_id);
CREATE INDEX IF NOT EXISTS idx_tools_status ON tools(status);
CREATE INDEX IF NOT EXISTS idx_tools_slug ON tools(slug);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_tool_votes_tool ON tool_votes(tool_id);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON tool_submissions(status);

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

-- Create trigger for tool count
DROP TRIGGER IF EXISTS update_tool_count_trigger ON tools;
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

-- Create trigger for votes
DROP TRIGGER IF EXISTS update_votes_trigger ON tool_votes;
CREATE TRIGGER update_votes_trigger
AFTER INSERT OR UPDATE OR DELETE ON tool_votes
FOR EACH ROW EXECUTE FUNCTION update_tool_votes();

-- Insert categorized categories
INSERT INTO categories (name, slug, description, icon, category_group) VALUES
('Design Tools', 'design-tools', 'Tools for creating stunning visuals and designs', '🎨', 'creative'),
('Video Editing', 'video-editing', 'Professional video editing and production tools', '🎬', 'creative'),
('Photo Editing', 'photo-editing', 'Image editing and photo enhancement tools', '📸', 'creative'),
('3D & Animation', '3d-animation', '3D modeling and animation software', '🎭', 'creative'),
('Productivity', 'productivity', 'Boost your workflow and get things done', '⚡', 'productivity'),
('Note Taking', 'note-taking', 'Organize your thoughts and ideas', '📝', 'productivity'),
('Project Management', 'project-management', 'Manage projects and collaborate with teams', '📊', 'productivity'),
('Time Management', 'time-management', 'Track time and improve productivity', '⏰', 'productivity'),
('Code Editors', 'code-editors', 'Write code with powerful editors', '💻', 'development'),
('Developer Tools', 'developer-tools', 'Tools for developers and programmers', '🛠️', 'development'),
('Version Control', 'version-control', 'Manage code versions and collaborate', '📦', 'development'),
('APIs & Integration', 'apis-integration', 'Connect and integrate services', '🔌', 'development'),
('AI Tools', 'ai-tools', 'Artificial intelligence powered tools', '🤖', 'ai'),
('Automation', 'automation', 'Automate repetitive tasks', '⚙️', 'ai'),
('Chatbots', 'chatbots', 'Conversational AI and chat tools', '💬', 'ai'),
('Marketing', 'marketing', 'Grow your business and reach customers', '📈', 'business'),
('Analytics', 'analytics', 'Track and analyze your data', '📉', 'business'),
('SEO Tools', 'seo-tools', 'Optimize for search engines', '🔍', 'business'),
('Email Marketing', 'email-marketing', 'Email campaigns and newsletters', '📧', 'business'),
('Learning Platforms', 'learning-platforms', 'Online courses and education', '📚', 'learning'),
('Documentation', 'documentation', 'Create and manage documentation', '📄', 'learning')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample tools
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
FROM categories WHERE slug = 'productivity' LIMIT 1
ON CONFLICT (slug) DO NOTHING;

INSERT INTO tools (name, slug, description, long_description, website_url, logo_url, category_id, platform, pricing_type, tags, featured) 
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
  true
FROM categories WHERE slug = 'design-tools' LIMIT 1
ON CONFLICT (slug) DO NOTHING;

INSERT INTO tools (name, slug, description, long_description, website_url, logo_url, category_id, platform, pricing_type, tags, featured) 
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
  true
FROM categories WHERE slug = 'code-editors' LIMIT 1
ON CONFLICT (slug) DO NOTHING;

INSERT INTO tools (name, slug, description, long_description, website_url, logo_url, category_id, platform, pricing_type, tags, featured) 
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
  true
FROM categories WHERE slug = 'ai-tools' LIMIT 1
ON CONFLICT (slug) DO NOTHING;
