// Main post list component with pagination
import {
  Container,
  Box,
  Pagination,
  CircularProgress,
  Alert,
  Skeleton,
  Card,
  CardHeader,
  CardContent,
} from '@mui/material';
import { PostCard } from './PostCard';
import { usePosts } from '../hooks/usePosts';

export function PostList() {
  const { posts, loading, error, page, totalPages, setPage } = usePosts(1, 20);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Loading skeleton
  if (loading && posts.length === 0) {
    return (
      <Container
        maxWidth="lg"
        sx={{
          py: { xs: 2, sm: 3, md: 4 },
          px: { xs: 1, sm: 2, md: 3 },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Card key={item}>
              <CardHeader
                avatar={<Skeleton variant="circular" width={40} height={40} />}
                title={<Skeleton variant="text" width="60%" />}
                subheader={<Skeleton variant="text" width="40%" />}
              />
              <CardContent>
                <Skeleton variant="text" />
                <Skeleton variant="text" />
                <Skeleton variant="text" width="80%" />
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    );
  }

  // Error state
  if (error) {
    return (
      <Container
        maxWidth="lg"
        sx={{
          py: { xs: 2, sm: 3, md: 4 },
          px: { xs: 1, sm: 2, md: 3 },
        }}
      >
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: { xs: 2, sm: 3, md: 4 },
        px: { xs: 1, sm: 2, md: 3 },
      }}
    >
        {/* Posts List - Single Column */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </Box>

        {/* Pagination */}
        {totalPages > 1 && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: { xs: 3, sm: 4, md: 5 },
              mb: { xs: 2, sm: 3 },
            }}
          >
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              size="large"
              showFirstButton
              showLastButton
              siblingCount={1}
              boundaryCount={1}
              sx={{
                '& .MuiPaginationItem-root': {
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  minWidth: { xs: 32, sm: 40 },
                  height: { xs: 32, sm: 40 },
                },
              }}
            />
          </Box>
        )}

        {/* Loading overlay for page changes */}
        {loading && posts.length > 0 && (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 9999,
            }}
          >
            <CircularProgress size={60} />
          </Box>
        )}
      </Container>
  );
}

