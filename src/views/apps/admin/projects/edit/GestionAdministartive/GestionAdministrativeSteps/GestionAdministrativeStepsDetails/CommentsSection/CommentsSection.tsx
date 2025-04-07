import React, {useEffect, useState} from 'react';

import type {TimelineProps} from '@mui/lab/Timeline'
import MuiTimeline from '@mui/lab/Timeline'
import {styled} from '@mui/material/styles'
import {
  Grid,
  Typography,
  TextField,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton
} from '@mui/material';
import {
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot
} from '@mui/lab';
import Box from "@mui/material/Box";
import {useDispatch} from 'react-redux';

import {setStep} from '@/store/slices/stepSlice';

import {
  useListSuiviAdministrativeStepCommentsQuery,
  useAddSuiviAdministrativeStepCommentMutation
} from "@/services/IsyBuildApi";
import type {SuiviAdministrativeStepRead, Status3BfEnum} from "@/services/IsyBuildApi";
import {formatDate} from "@/utils/formatDate";
import {Status3BfMapping} from "@/utils/statusEnums";

// Styled Timeline component
const Timeline = styled(MuiTimeline)<TimelineProps>({
  paddingLeft: 0,
  paddingRight: 0,
  '& .MuiTimelineItem-root': {
    width: '100%',
    '&:before': {
      display: 'none'
    }
  }
})

type FileProp = {
  name: string
  type: string
  size: number
}

function CommentsSection({step}: { step: SuiviAdministrativeStepRead | undefined }) {
  const [page, setPage] = useState(1);
  const [allComments, setAllComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [newStatus, setNewStatus] = useState('');
  const [addComment, {isLoading: isAdding}] = useAddSuiviAdministrativeStepCommentMutation();
  const dispatch = useDispatch(); // Redux dispatch function

  // Fetch comments with pagination
  const {data, isLoading, refetch, isFetching, error} = useListSuiviAdministrativeStepCommentsQuery({
    stepId: step!.id,
    page,
  });

  const renderFilePreview = (file: FileProp) => {
    if (file.type.startsWith('image')) {
      return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file as any)}/>
    } else {
      return <i className='tabler-file-description'/>
    }
  }

  const fileList = files.map((file: FileProp) => (
    <Box
      key={file.name}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        padding: 2,
      }}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <Box className="file-preview">{renderFilePreview(file)}</Box>
        <Box>
          <Typography className="file-name font-medium" color="text.primary">
            {file.name}
          </Typography>
          <Typography className="file-size" variant="body2">
            {Math.round(file.size / 100) / 10 > 1000
              ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
              : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
          </Typography>
        </Box>
      </Box>
      <IconButton onClick={() => handleRemoveFile()}>
        <i className="tabler-x text-xl"/>
      </IconButton>
    </Box>
  ));

  useEffect(() => {
    refetch()
  }, []);


  // Append new results when `data` updates
  useEffect(() => {

    if (data?.results) {
      setAllComments((prevComments) => {
        // Check if new comments already exist in the state to prevent duplicates
        const newComments = data.results.filter(
          (newComment) => !prevComments.some((comment) => comment.id === newComment.id)
        );

        return [...newComments, ...prevComments];
      });
    }
  }, [data]);

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;

    if (fileList) {
      // Limit file size (e.g., 5MB)
      const file = fileList[0];

      if (file.size > 5 * 1024 * 1024) {
        alert('File is too large. Maximum size is 5MB.');

        return;
      }

      setFiles([file]);
    }
  };

  // Remove uploaded file
  const handleRemoveFile = () => {
    setFiles([]);
  };

  // Handle adding a comment
  const handleAddComment = async () => {
    if (!newComment.trim() && files.length === 0) return;

    try {
      const formDataToSend = new FormData();

      // Append file if exists
      if (files.length > 0) {
        formDataToSend.append('document_file', files[0]);
      }

      if (step) {
        formDataToSend.append('step_id', step.id.toString());
      }

      if (newComment) {
        formDataToSend.append('comment', newComment);
      }

      // Append status if selected
      if (newStatus) {
        formDataToSend.append('status', newStatus);
      }

      // Send comment
      const response = await addComment({
        // @ts-expect-error
        suiviAdministrativeStepCommentCreateRequest: formDataToSend
      }).unwrap();


      // Add the new comment at the top of the list
      setAllComments((prevComments) => [response, ...prevComments]);

      // Update the step in Redux
      if (step?.id && response.status) {
        const updatedStep = {
          ...step,
          status: response.status as Status3BfEnum | undefined,  // Force the type
        };

        dispatch(setStep(updatedStep)); // Dispatch the action to update Redux state
      } else {
        // Handle the case where step.id is not defined
        console.error('Step id or status step is missing');
      }

      // Reset form after successful submission
      setNewComment('');
      setFiles([]);
      setNewStatus('');
    } catch (error) {
      const message = error && typeof error === 'object' && 'data' in error
        ? JSON.stringify((error as { data?: unknown }).data)
        : 'An unexpected error occurred.';

      console.log(message);
    }
  };


  if (error) {
    return <Typography color="error">Failed to load comments.</Typography>;
  }

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{marginBottom: 2}}>
          <TextField
            fullWidth
            multiline
            minRows={2}
            variant="outlined"
            label="Your Comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            disabled={isAdding}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Change Status</InputLabel>
            <Select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value as string)}
              label="Change Status"
              disabled={isAdding}
            >
              {Object.entries(Status3BfMapping).map(([key, {label}]) => (
                <MenuItem key={key} value={key}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>

          {files.length > 0 ? (

            <Box width="100%">{fileList}</Box>
          ) : (<Button
            variant="contained"
            component="label"
            startIcon={<i className="tabler-upload text-textSecondary"/>}
            fullWidth
            disabled={isAdding}
            sx={{height: '100%'}} // Optional: Ensure it fills the height if needed
          >
            Upload Document
            <input
              type="file"
              hidden
              onChange={handleFileUpload}
              accept=".pdf,.doc,.docx,.txt"
            />
          </Button>)
          }
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddComment}
            fullWidth
            disabled={isAdding || (!newComment.trim())}
            style={{marginTop: 16}}
          >
            {isAdding ? <CircularProgress size={24}/> : 'Submit Comment'}
          </Button>
        </Grid>
      </Grid>

      {/* Comments List */}
      {
        isLoading || isFetching ? (
          <Box
            sx={{
              minHeight: '200px',
              maxHeight: '200px', // Set a fixed height for the scrollable area
              overflowY: 'auto', // Enable vertical scrolling
              marginTop: 5,
              paddingRight: 2, // Add some padding to avoid cutting off the scrollbar
              display: 'flex', // Use flexbox
              justifyContent: 'center', // Center horizontally
              alignItems: 'center', // Center vertically
            }}
          >
            <CircularProgress sx={{justifyContent: 'center',}} size={35}/>
          </Box>
        ) : (
          <Box
            sx={{
              maxHeight: '200px', // Set a fixed height for the scrollable area
              minHeight: '200px',
              overflowY: 'auto', // Enable vertical scrolling
              marginTop: 5,
              paddingRight: 2, // Add some padding to avoid cutting off the scrollbar
            }}
          >
            <Timeline position="right">
              {allComments.length > 0 ? (
                allComments.map((comment, index) => (
                  <TimelineItem key={comment.id}>
                    <TimelineSeparator>
                      <TimelineDot color="primary" variant="outlined"/>
                      {index < allComments.length - 1 && <TimelineConnector/>}
                    </TimelineSeparator>
                    <TimelineContent>
                      <Box sx={{ml: 2}}>
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
                            Par: {comment.created_by}
                          </Typography>
                        </Box>
                      </Box>
                    </TimelineContent>
                  </TimelineItem>
                ))
              ) : (
                <Box
                  sx={{
                    minHeight: '200px',
                    maxHeight: '200px', // Set a fixed height for the scrollable area
                    overflowY: 'auto', // Enable vertical scrolling
                    marginTop: 5,
                    paddingRight: 2, // Add some padding to avoid cutting off the scrollbar
                  }}
                >
                  <Typography variant="body1" align="center">
                    No comments available.
                  </Typography>
                </Box>
              )}
            </Timeline>
            {/* Pagination Controls */}
            <div style={{marginTop: 16, textAlign: 'center'}}>
              {data?.next && (
                <Button
                  variant="contained"
                  onClick={() => setPage((prevPage) => prevPage + 1)}
                  disabled={isFetching}
                >
                  {isFetching ? 'Loading...' : 'Load More'}
                </Button>
              )}
            </div>
          </Box>
        )
      }


    </div>
  );
}

export default CommentsSection;
