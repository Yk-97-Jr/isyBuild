import React, { useState } from 'react';

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
  IconButton,
  Box
} from '@mui/material';



import type { DiffusionIntervenantCommentCreateUpdateRequest} from '@/services/IsyBuildApi';
import { useDiffusionIntervenantCommentCreateMutation } from '@/services/IsyBuildApi';

import { StatusE51Mapping } from '@/utils/statusEnums';

type FileProp = {
  name: string;
  type: string;
  size: number;
};

function DialogCommentsSection({id, refetch}:{id:number; refetch: () => void}) {
  const [newComment, setNewComment] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [newStatus, setNewStatus] = useState('');
  const [addComment, { isLoading: isAdding,error}] = useDiffusionIntervenantCommentCreateMutation();
  

  const renderFilePreview = (file: FileProp) => {
    if (file.type.startsWith('image')) {
      return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file as any)} />;
    } else {
      return <i className="tabler-file-description" />;
    }
  };

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
        <i className="tabler-x text-xl" />
      </IconButton>
    </Box>
  ));

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
  
      // Append the required comment field
      formDataToSend.append('comment', newComment);
  
      // Append file if exists
      if (files.length > 0) {
        formDataToSend.append('document_file', files[0]);
      }
  
      // Append status if selected
      if (newStatus) {
        formDataToSend.append('status', newStatus);
      }
  
      // Send the comment
      const response = await addComment({
        diffusionIntervenantId: +id, // Replace with the actual ID
        diffusionIntervenantCommentCreateUpdateRequest: formDataToSend as unknown as DiffusionIntervenantCommentCreateUpdateRequest,
      }).unwrap();

      refetch()
      console.log(response);
  
      // Reset form after successful submission
      setNewComment('');
      setFiles([]);
      setNewStatus('');
    } catch (error) {
      const message =
        error && typeof error === 'object' && 'data' in error
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
        <Grid item xs={12} sx={{ marginBottom: 2 }}>
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
              {Object.entries(StatusE51Mapping).map(([key, { label }]) => (
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
          ) : (
            <Button
              variant="contained"
              component="label"
              startIcon={<i className="tabler-upload text-textSecondary" />}
              fullWidth
              disabled={isAdding}
              sx={{ height: '100%' }} // Optional: Ensure it fills the height if needed
            >
              Upload Document
              <input
                type="file"
                hidden
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx,.txt"
              />
            </Button>
          )}
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddComment}
            fullWidth
            disabled={isAdding || !newComment.trim()}
            style={{ marginTop: 16 }}
          >
            {isAdding ? <CircularProgress sx={{ color: 'white' }}  size={24} /> : 'Submit Comment'}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default DialogCommentsSection;
