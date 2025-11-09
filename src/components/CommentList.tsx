// Comments list component
import { List, CircularProgress, Typography, Box, Divider } from '@mui/material';
import { CommentItem } from './CommentItem';
import type { Comment } from '../types/api';

interface CommentListProps {
  comments: Comment[];
  loading: boolean;
  error: string | null;
}

export function CommentList({ comments, loading, error }: CommentListProps) {
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 3,
        }}
      >
        <CircularProgress size={24} />
        <Typography variant="body2" sx={{ ml: 2 }}>
          Loading comments...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: 2 }}>
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  if (comments.length === 0) {
    return (
      <Box sx={{ py: 2 }}>
        <Typography variant="body2" color="text.secondary">
          No comments yet.
        </Typography>
      </Box>
    );
  }

  return (
    <List sx={{ p: 0 }}>
      {comments.map((comment, index) => (
        <Box key={comment.id}>
          <CommentItem comment={comment} />
          {index < comments.length - 1 && <Divider />}
        </Box>
      ))}
    </List>
  );
}

