import React, { useEffect, useState } from 'react';

import {
  CircularProgress,
  Typography,

  Box,
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/lab';
import { styled } from '@mui/material/styles';

import { useDocumentDiffusionCommentsListQuery } from '@/services/IsyBuildApi';
import { formatDate } from '@/utils/formatDate';

// Styled Timeline component
const StyledTimeline = styled(Timeline)({
  paddingLeft: 0,
  paddingRight: 0,
  '& .MuiTimelineItem-root': {
    width: '100%',
    '&:before': {
      display: 'none',
    },
  },
});

function CommentsSectionList({ commentId }: { commentId: number }) {
  const [page, ] = useState(1);
  const [allComments, setAllComments] = useState<any[]>([]);

  const {
    data,
    isLoading,
    refetch,
    isFetching,
    error,
  } = useDocumentDiffusionCommentsListQuery({
    diffusionIntervenantId:+commentId,
    page,
    pageSize:100
  });

  useEffect(() => {
    refetch();
  }, []);

  // Append new results when `data` updates
  useEffect(() => {
    if (data?.results) {
      setAllComments((prevComments) => {
        // Check for duplicates
        const newComments = data.results.filter(
          (newComment) => !prevComments.some((comment) => comment.id === newComment.id),
        );

        return [...prevComments, ...newComments];
      });
    }
  }, [data]);

  if (error) {
    return <Typography color="error">Failed to load comments.</Typography>;
  }

  return (
    <Box>
      {/* Comments List */}
      {isLoading || isFetching ? (
        <Box
          sx={{
          
              maxHeight: '200px',
              minHeight: '200px',
              overflowY: 'auto', // Allow scrolling
              marginTop: 5,
              paddingRight: 2,
              scrollbarWidth: 'none', // Firefox-specific style
              '&::-webkit-scrollbar': {
                display: 'none', // Chrome, Safari
              },
            }}
          >
          <CircularProgress size={35} />
        </Box>
      ) : (
        <Box
          sx={{
            maxHeight: '200px',
            minHeight: '200px',
            overflowY: 'auto',
            marginTop: 5,
            paddingRight: 2,
          }}
        >
          <StyledTimeline position="right">
            {allComments.length > 0 ? (
              allComments.map((comment, index) => (
                <TimelineItem key={comment.id}>
                  <TimelineSeparator>
                    <TimelineDot color="primary" variant="outlined" />
                    {index < allComments.length - 1 && <TimelineConnector />}
                  </TimelineSeparator>
                  <TimelineContent>
                    <Box sx={{ ml: 2 }}>
                      <Box display="flex" alignItems="center" mb={1}>
                        <Typography variant="subtitle1" color="text.primary">
                          {comment.comment}
                        </Typography>
                      </Box>
                      {comment.document && (
                        <Box mb={1}>
                          <Typography variant="body2" color="text.secondary">
                            Document: {comment.document.name}
                          </Typography>
                        </Box>
                      )}
                      <Box display="flex" justifyContent="flex-start" gap={2}>
                        <Typography variant="body2" color="text.secondary">
                          {formatDate(comment.created_at)}
                        </Typography>
                        {comment.status && (
                          <Typography variant="body2" color="text.secondary">
                            Status: {comment.status}
                          </Typography>
                        )}
                        <Typography variant="body2" color="text.secondary">
                          By: {comment.created_by}
                        </Typography>
                      </Box>
                    </Box>
                  </TimelineContent>
                </TimelineItem>
              ))
            ) : (
              <Box
              sx={{
              
                  maxHeight: '200px',
                  minHeight: '200px',
                  overflowY: 'unset', // Allow scrolling
                  marginTop: 5,
                  paddingRight: 2,
                  scrollbarWidth: 'none', // Firefox-specific style
                  '&::-webkit-scrollbar': {
                    display: 'none', // Chrome, Safari
                  },
                }}
              >
                <Typography variant="body1" align="center">
                  No comments available.
                </Typography>
              </Box>
            )}
          </StyledTimeline>
          {/* Pagination Controls */}
          
          
        </Box>
      )}
    </Box>
  );
}

export default CommentsSectionList;
