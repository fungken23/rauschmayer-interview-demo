// Individual comment component
import { ListItem, ListItemAvatar, ListItemText, Avatar, Typography } from '@mui/material';
import type { Comment } from '../types/api';

interface CommentItemProps {
  comment: Comment;
}

export function CommentItem({ comment }: CommentItemProps) {
  // Get first letter of email for avatar
  const avatarLetter = comment.email.charAt(0).toUpperCase();

  return (
    <ListItem
      alignItems="flex-start"
      sx={{
        py: 1.5,
        px: 0,
      }}
    >
      <ListItemAvatar>
        <Avatar
          sx={{
            width: { xs: 32, sm: 40 },
            height: { xs: 32, sm: 40 },
            bgcolor: 'primary.main',
          }}
        >
          {avatarLetter}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography
            variant="subtitle2"
            sx={{
              fontSize: { xs: '0.8rem', sm: '0.9rem' },
              fontWeight: 600,
            }}
          >
            {comment.name}
          </Typography>
        }
        secondary={
          <>
            <Typography
              component="span"
              variant="body2"
              sx={{
                fontSize: { xs: '0.7rem', sm: '0.75rem' },
                color: 'text.secondary',
                display: 'block',
                mb: 0.5,
              }}
            >
              {comment.email}
            </Typography>
            <Typography
              component="span"
              variant="body2"
              sx={{
                fontSize: { xs: '0.75rem', sm: '0.85rem' },
                color: 'text.primary',
              }}
            >
              {comment.body}
            </Typography>
          </>
        }
      />
    </ListItem>
  );
}

