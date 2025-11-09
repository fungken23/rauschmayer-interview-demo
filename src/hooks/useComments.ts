// Custom hook for fetching comments for a specific post
import { useState, useEffect } from 'react';
import { fetchComments } from '../services/api';
import type { Comment } from '../types/api';

interface UseCommentsResult {
  comments: Comment[];
  loading: boolean;
  error: string | null;
}

export function useComments(postId: number | null): UseCommentsResult {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Don't fetch if postId is null
    if (postId === null) {
      setComments([]);
      setLoading(false);
      setError(null);
      return;
    }

    let isMounted = true;

    const loadComments = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchComments(postId);

        if (isMounted) {
          setComments(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to fetch comments');
          setComments([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadComments();

    return () => {
      isMounted = false;
    };
  }, [postId]);

  return {
    comments,
    loading,
    error,
  };
}

