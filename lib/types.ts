export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon?: string;
  category_group: string;
  tool_count: number;
  created_at: string;
  updated_at: string;
}

export interface Tool {
  id: string;
  slug: string;
  name: string;
  description: string;
  long_description?: string;
  website_url: string;
  logo_url?: string;
  category_id: string;
  platform?: string[];
  pricing_type?: string;
  upvotes: number;
  downvotes: number;
  total_votes: number;
  tags?: string[];
  pros?: string[];
  cons?: string[];
  alternatives?: string[];
  status: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface ToolSubmission {
  id: string;
  name: string;
  website_url: string;
  description: string;
  category_suggested?: string;
  submitter_email?: string;
  submitter_name?: string;
  platform?: string[];
  pricing_type?: string;
  tags?: string[];
  status: string;
  admin_notes?: string;
  created_at: string;
  reviewed_at?: string;
}

export interface FilterOptions {
  search: string;
  platform: string;
  pricing: string;
  sort: string;
}
