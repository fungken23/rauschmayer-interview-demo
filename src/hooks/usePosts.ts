// Custom hook for fetching posts with pagination
import { useState, useEffect } from 'react';
import { fetchPosts } from '../services/api';
import type { Post, PaginatedResponse } from '../types/api';

interface UsePostsResult {
  posts: Post[];
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

export function usePosts(initialPage: number = 1, limit: number = 20): UsePostsResult {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(initialPage);

  useEffect(() => {
    let isMounted = true;

    const loadPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response: PaginatedResponse<Post> = await fetchPosts(page, limit);

        if (isMounted) {
          setPosts(response.data);
          setTotal(response.total);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to fetch posts');
          setPosts([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadPosts();

    return () => {
      isMounted = false;
    };
  }, [page, limit]);

  const totalPages = Math.ceil(total / limit);

  return {
    posts,
    loading,
    error,
    total,
    page,
    totalPages,
    setPage,
  };
}

