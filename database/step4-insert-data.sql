-- Step 4: Insert data
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
('Documentation', 'documentation', 'Create and manage documentation', '📄', 'learning');

INSERT INTO tools (name, slug, description, long_description, website_url, logo_url, category_id, platform, pricing_type, tags, pros, cons, alternatives, featured) 
SELECT 
  'Notion',
  'notion',
  'All-in-one workspace for notes, docs, and collaboration',
  'Notion is a powerful productivity tool that combines notes, databases, wikis, and project management into one seamless platform.',
  'https://notion.so',
  'https://logo.clearbit.com/notion.so',
  id,
  ARRAY['web', 'mac', 'windows', 'ios', 'android'],
  'freemium',
  ARRAY['productivity', 'notes', 'collaboration'],
  ARRAY['Highly customizable', 'Great templates', 'Database features'],
  ARRAY['Steep learning curve', 'Can be slow'],
  ARRAY['Coda', 'Obsidian'],
  true
FROM categories WHERE slug = 'productivity';

INSERT INTO tools (name, slug, description, long_description, website_url, logo_url, category_id, platform, pricing_type, tags, featured) 
SELECT 
  'Figma',
  'figma',
  'Collaborative interface design tool',
  'Figma is a cloud-based design tool for UI/UX designers and teams.',
  'https://figma.com',
  'https://logo.clearbit.com/figma.com',
  id,
  ARRAY['web', 'mac', 'windows'],
  'freemium',
  ARRAY['design', 'prototyping', 'ui-ux'],
  true
FROM categories WHERE slug = 'design-tools';

INSERT INTO tools (name, slug, description, long_description, website_url, logo_url, category_id, platform, pricing_type, tags, featured) 
SELECT 
  'VS Code',
  'vs-code',
  'Free, powerful code editor from Microsoft',
  'Visual Studio Code is a lightweight but powerful source code editor.',
  'https://code.visualstudio.com',
  'https://logo.clearbit.com/code.visualstudio.com',
  id,
  ARRAY['mac', 'windows', 'linux'],
  'free',
  ARRAY['code-editor', 'development'],
  true
FROM categories WHERE slug = 'code-editors';

INSERT INTO tools (name, slug, description, long_description, website_url, logo_url, category_id, platform, pricing_type, tags, featured) 
SELECT 
  'ChatGPT',
  'chatgpt',
  'AI-powered conversational assistant',
  'ChatGPT is an advanced AI chatbot for various tasks.',
  'https://chat.openai.com',
  'https://logo.clearbit.com/openai.com',
  id,
  ARRAY['web', 'ios', 'android'],
  'freemium',
  ARRAY['ai', 'chatbot', 'writing'],
  true
FROM categories WHERE slug = 'ai-tools';

INSERT INTO tools (name, slug, description, long_description, website_url, logo_url, category_id, platform, pricing_type, tags, featured) 
SELECT 
  'Canva',
  'canva',
  'Easy-to-use graphic design platform',
  'Canva makes design simple for everyone.',
  'https://canva.com',
  'https://logo.clearbit.com/canva.com',
  id,
  ARRAY['web', 'ios', 'android'],
  'freemium',
  ARRAY['design', 'graphics', 'templates'],
  true
FROM categories WHERE slug = 'design-tools';

INSERT INTO tools (name, slug, description, long_description, website_url, logo_url, category_id, platform, pricing_type, tags, featured) 
SELECT 
  'Trello',
  'trello',
  'Visual project management with boards',
  'Trello organizes your projects into boards.',
  'https://trello.com',
  'https://logo.clearbit.com/trello.com',
  id,
  ARRAY['web', 'mac', 'windows', 'ios', 'android'],
  'freemium',
  ARRAY['project-management', 'kanban'],
  true
FROM categories WHERE slug = 'project-management';

UPDATE categories c
SET tool_count = (SELECT COUNT(*) FROM tools t WHERE t.category_id = c.id AND t.status = 'approved');

SELECT 'Data inserted!' as status;
SELECT 'Categories:' as info, COUNT(*) as count FROM categories;
SELECT 'Tools:' as info, COUNT(*) as count FROM tools;
