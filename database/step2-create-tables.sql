-- Step 2: Create new tables with UUID
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

CREATE TABLE tool_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id UUID REFERENCES tools(id) ON DELETE CASCADE,
  voter_identifier VARCHAR(255) NOT NULL,
  vote_type VARCHAR(10) NOT NULL CHECK (vote_type IN ('up', 'down')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(tool_id, voter_identifier)
);

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

SELECT 'All tables created!' as status;
