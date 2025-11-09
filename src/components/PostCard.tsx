// Individual post card component with expandable comments
import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Button,
  Collapse,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon } from '@mui/icons-material';
import { CommentList } from './CommentList';
import { useComments } from '../hooks/useComments';
import type { Post } from '../types/api';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const [expanded, setExpanded] = useState(false);
  
  // Only fetch comments when expanded
  const { comments, loading, error } = useComments(expanded ? post.id : null);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // Generate avatar letter from userId
  const avatarLetter = `U${post.userId}`;

  return (
    <Card
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{
              bgcolor: 'secondary.main',
              width: { xs: 36, sm: 40 },
              height: { xs: 36, sm: 40 },
            }}
          >
            {avatarLetter}
          </Avatar>
        }
        title={
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
              fontWeight: 600,
              lineHeight: 1.3,
            }}
          >
            {post.title}
          </Typography>
        }
        subheader={
          <Typography
            variant="body2"
            sx={{
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              color: 'text.secondary',
            }}
          >
            Post #{post.id} • User {post.userId}
          </Typography>
        }
        sx={{
          pb: 1,
        }}
      />

      <CardContent sx={{ flexGrow: 1, pt: 0 }}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontSize: { xs: '0.85rem', sm: '0.9rem' },
            lineHeight: 1.6,
          }}
        >
          {post.body}
        </Typography>
      </CardContent>

      <CardActions
        sx={{
          justifyContent: 'flex-end',
          px: 2,
          pb: 2,
        }}
      >
        <Button
          onClick={handleExpandClick}
          endIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          size="small"
          sx={{
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
            minHeight: { xs: 36, sm: 40 },
          }}
        >
          {expanded ? 'Hide' : 'Show'} Comments
        </Button>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ pt: 0 }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontSize: { xs: '0.8rem', sm: '0.9rem' },
              fontWeight: 600,
              mb: 1,
            }}
          >
            Comments{comments.length > 0 && ` (${comments.length})`}
          </Typography>
          <CommentList comments={comments} loading={loading} error={error} />
        </CardContent>
      </Collapse>
    </Card>
  );
}

