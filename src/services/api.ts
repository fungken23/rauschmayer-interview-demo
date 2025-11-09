// API service for JSONPlaceholder
import type { Post, Comment, User, PaginatedResponse } from '../types/api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://jsonplaceholder.typicode.com';

/**
 * Fetch posts with pagination
 * @param page - Page number (1-based)
 * @param limit - Number of posts per page
 * @returns Paginated posts response
 */
export async function fetchPosts(
  page: number = 1,
  limit: number = 20
): Promise<PaginatedResponse<Post>> {
  const start = (page - 1) * limit;
  const url = `${API_BASE_URL}/posts?_start=${start}&_limit=${limit}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch posts: ${response.statusText}`);
  }

  // Get total count from X-Total-Count header
  const totalCount = response.headers.get('X-Total-Count');
  const total = totalCount ? parseInt(totalCount, 10) : 0;

  const data = await response.json();

  return {
    data,
    total,
    page,
    limit,
  };
}

/**
 * Fetch comments for a specific post
 * @param postId - Post ID
 * @returns Array of comments
 */
export async function fetchComments(postId: number): Promise<Comment[]> {
  const url = `${API_BASE_URL}/posts/${postId}/comments`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch comments: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetch user by ID
 * @param userId - User ID
 * @returns User object
 */
export async function fetchUser(userId: number): Promise<User> {
  const url = `${API_BASE_URL}/users/${userId}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch user: ${response.statusText}`);
  }

  return response.json();
}

