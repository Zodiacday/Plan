import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { toolId, voteType, voterId } = await request.json();

    if (!toolId || !voteType || !voterId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (voteType !== 'up' && voteType !== 'down') {
      return NextResponse.json({ error: 'Invalid vote type' }, { status: 400 });
    }

    // Check if user already voted
    const { data: existingVote } = await supabase
      .from('tool_votes')
      .select('*')
      .eq('tool_id', toolId)
      .eq('voter_identifier', voterId)
      .single();

    if (existingVote) {
      // Update existing vote if different
      if (existingVote.vote_type !== voteType) {
        await supabase
          .from('tool_votes')
          .update({ vote_type: voteType })
          .eq('tool_id', toolId)
          .eq('voter_identifier', voterId);
      }
    } else {
      // Insert new vote
      const { error: insertError } = await supabase
        .from('tool_votes')
        .insert({ tool_id: toolId, voter_identifier: voterId, vote_type: voteType });

      if (insertError) {
        console.error('Insert error:', insertError);
        return NextResponse.json({ error: 'Failed to save vote' }, { status: 500 });
      }
    }

    // Get updated vote counts
    const { data: tool, error: toolError } = await supabase
      .from('tools')
      .select('upvotes, downvotes')
      .eq('id', toolId)
      .single();

    if (toolError) {
      console.error('Tool fetch error:', toolError);
      return NextResponse.json({ error: 'Failed to fetch updated votes' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      upvotes: tool.upvotes || 0,
      downvotes: tool.downvotes || 0
    });
  } catch (error) {
    console.error('Vote error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
