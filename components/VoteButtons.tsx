'use client';

import { useState, useEffect } from 'react';

interface VoteButtonsProps {
  toolId: string;
  initialUpvotes: number;
  initialDownvotes: number;
}

export default function VoteButtons({ toolId, initialUpvotes, initialDownvotes }: VoteButtonsProps) {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [downvotes, setDownvotes] = useState(initialDownvotes);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
  const [isVoting, setIsVoting] = useState(false);

  useEffect(() => {
    // Check if user has already voted
    const savedVote = localStorage.getItem(`vote_${toolId}`);
    if (savedVote) {
      setUserVote(savedVote as 'up' | 'down');
    }
  }, [toolId]);

  const getVoterId = () => {
    let voterId = localStorage.getItem('voter_id');
    if (!voterId) {
      voterId = `voter_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('voter_id', voterId);
    }
    return voterId;
  };

  const handleVote = async (voteType: 'up' | 'down') => {
    if (isVoting || userVote === voteType) return;
    
    setIsVoting(true);
    const voterId = getVoterId();

    // Optimistic update
    const prevUpvotes = upvotes;
    const prevDownvotes = downvotes;
    const prevUserVote = userVote;

    if (userVote === null) {
      // New vote
      if (voteType === 'up') {
        setUpvotes(prev => prev + 1);
      } else {
        setDownvotes(prev => prev + 1);
      }
    } else {
      // Change vote
      if (voteType === 'up') {
        setUpvotes(prev => prev + 1);
        setDownvotes(prev => prev - 1);
      } else {
        setDownvotes(prev => prev + 1);
        setUpvotes(prev => prev - 1);
      }
    }
    
    setUserVote(voteType);
    localStorage.setItem(`vote_${toolId}`, voteType);

    try {
      const response = await fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toolId, voteType, voterId })
      });

      const data = await response.json();

      if (data.success) {
        setUpvotes(data.upvotes);
        setDownvotes(data.downvotes);
      } else {
        // Revert on error
        setUpvotes(prevUpvotes);
        setDownvotes(prevDownvotes);
        setUserVote(prevUserVote);
        if (prevUserVote) {
          localStorage.setItem(`vote_${toolId}`, prevUserVote);
        } else {
          localStorage.removeItem(`vote_${toolId}`);
        }
      }
    } catch (error) {
      console.error('Vote error:', error);
      // Revert on error
      setUpvotes(prevUpvotes);
      setDownvotes(prevDownvotes);
      setUserVote(prevUserVote);
      if (prevUserVote) {
        localStorage.setItem(`vote_${toolId}`, prevUserVote);
      } else {
        localStorage.removeItem(`vote_${toolId}`);
      }
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => handleVote('up')}
        disabled={isVoting}
        className={`flex items-center gap-2 text-sm ${
          userVote === 'up'
            ? 'text-white'
            : 'text-white/70 hover:text-white'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <span>↑</span>
        <span>{upvotes}</span>
      </button>

      <button
        onClick={() => handleVote('down')}
        disabled={isVoting}
        className={`flex items-center gap-2 text-sm ${
          userVote === 'down'
            ? 'text-white'
            : 'text-white/70 hover:text-white'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <span>↓</span>
        <span>{downvotes}</span>
      </button>
    </div>
  );
}
