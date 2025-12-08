import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { toolId, voteType, voterId } = await request.json();

    if (!toolId || !voteType || !voterId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (voteType !== 'up' && voteType !== 'down') {
      return NextResponse.json({ error: 'Invalid vote type' }, { status: 400 });
    }

    // TODO: Database integration - for now just log the vote and return mock data
    console.log('Vote received:', { toolId, voteType, voterId });

    // Return mock response until database is connected
    return NextResponse.json({
      success: true,
      upvotes: Math.floor(Math.random() * 100),
      downvotes: Math.floor(Math.random() * 20)
    });
  } catch (error) {
    console.error('Vote error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
