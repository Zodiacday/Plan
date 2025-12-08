import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const { name, website_url, description, category_suggested, submitter_name, submitter_email, platform, pricing_type, tags } = data;

    if (!name || !website_url || !description) {
      return NextResponse.json({ error: 'Name, website URL, and description are required' }, { status: 400 });
    }

    // TODO: Database integration - for now just log the submission
    console.log('Tool submission received:', {
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

    const error = null;

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
