import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const { name, website_url, description, category_suggested, submitter_name, submitter_email, platform, pricing_type, tags } = data;

    if (!name || !website_url || !description) {
      return NextResponse.json({ error: 'Name, website URL, and description are required' }, { status: 400 });
    }

    // Insert submission
    const { error } = await supabase
      .from('tool_submissions')
      .insert({
        name,
        website_url,
        description,
        category_suggested,
        submitter_name,
        submitter_email,
        platform,
        pricing_type,
        tags,
        status: 'pending'
      });

    if (error) {
      console.error('Submission error:', error);
      return NextResponse.json({ error: 'Failed to submit tool' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Tool submitted successfully!' });
  } catch (error) {
    console.error('Submission error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
