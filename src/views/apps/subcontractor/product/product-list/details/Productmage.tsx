'use client';

import React, { useContext, useState } from 'react';

import { useParams } from 'next/navigation';

import { Card, CardHeader, CardContent, Button, IconButton, List, ListItem, Typography, CircularProgress, Dialog } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDropzone } from 'react-dropzone';

import CustomAvatar from '@core/components/mui/Avatar';
import AppReactDropzone from '@/libs/styles/AppReactDropzone';
import DialogCloseButton from '@/components/dialogs/DialogCloseButton';

import { SnackBarContext } from '@/contexts/SnackBarContextProvider';
import { useProductDetailQuery, useProductMediaCreateMutation } from '@/services/IsyBuildApi';
import type { SnackBarContextType } from '@/types/apps/snackbarType';
import type { ProductMediaRequest } from '@/services/IsyBuildApi';

interface AddProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

// Styled Dropzone Component
const Dropzone = styled(AppReactDropzone)(({ theme }) => ({
  '& .dropzone': {
    minHeight: 'unset',
    padding: theme.spacing(12),
    [theme.breakpoints.down('sm')]: {
      paddingInline: theme.spacing(5),
    },
    '&+.MuiList-root .MuiListItem-root .file-name': {
      fontWeight: theme.typography.body1.fontWeight,
    },
  },
}));

const ProductImage = ({ open, setOpen }: AddProps) => {
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : ''; // Ensure `id` is a string
  const [file, setFile] = useState<File | null>(null);
  const { setOpenSnackBar, setInfoAlert } = useContext(SnackBarContext) as SnackBarContextType;

  const [productMediaCreate, { isLoading }] = useProductMediaCreateMutation();
  const { refetch: refetchProduct } = useProductDetailQuery({ productId: +id });

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]); // Only keep the first file
      }
    },
  });

  const renderFilePreview = (file: File) => {
    if (file.type.startsWith('image')) {
      return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file)} />;
    } else {
      return <i className="tabler-file-description" />;
    }
  };

  const handleClose = () => {
    setFile(null);
    setOpen(false);

    if (refetchProduct) {
      refetchProduct();
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setOpenSnackBar(true);
      setInfoAlert({ severity: 'error', message: 'No file selected.' });
      
return;
    }

    if (!id) {
      setOpenSnackBar(true);
      setInfoAlert({ severity: 'error', message: 'Product ID is missing.' });
      
return;
    }

    const formData = new FormData();

    formData.append('image', file);
    formData.append('product', id);

    try {
      await productMediaCreate({
        productMediaRequest: formData as unknown as ProductMediaRequest,
      }).unwrap();

      setOpenSnackBar(true);
      setInfoAlert({ severity: 'success', message: 'Image uploaded successfully!' });
      handleClose();
    } catch (error: any) {
      setOpenSnackBar(true);
      setInfoAlert({
        severity: 'error',
        message: error.response?.data?.message || 'Error uploading image.',
      });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      maxWidth="md"
      scroll="body"
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DialogCloseButton onClick={() => setOpen(false)} disableRipple>
        <i className="tabler-x" />
      </DialogCloseButton>
      <Dropzone>
        <Card>
          <CardHeader
            title="Produit Image"
            sx={{ '& .MuiCardHeader-action': { alignSelf: 'center' } }}
          />
          <CardContent>
            <div {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} />
              <div className="flex items-center flex-col gap-2 text-center">
                <CustomAvatar variant="rounded" skin="light" color="secondary">
                  <i className="tabler-upload" />
                </CustomAvatar>
                <Typography variant="h4">Faites glisser et déposez votre image ici</Typography>
                <Typography color="text.disabled">ou</Typography>
                <Button variant="tonal" size="small">
                  Parcourir le image
                </Button>
              </div>
            </div>
            {file && (
              <List>
                <ListItem key={file.name} className="pis-4 plb-3">
                  <div className="file-details">
                    <div className="file-preview">{renderFilePreview(file)}</div>
                    <div>
                      <Typography className="file-name font-medium" color="text.primary">
                        {file.name}
                      </Typography>
                      <Typography className="file-size" variant="body2">
                        {Math.round(file.size / 100) / 10 > 1000
                          ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
                          : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
                      </Typography>
                    </div>
                  </div>
                  <IconButton onClick={() => setFile(null)}>
                    <i className="tabler-x text-xl" />
                  </IconButton>
                </ListItem>
              </List>
            )}
            {file && (
              <div className="buttons mbe-3">
                <div className="flex justify-end gap-4">
                  <Button onClick={() => setOpen(false)} variant="tonal" color="secondary">
                    Annuler
                  </Button>
                  <Button variant="contained" onClick={handleUpload} disabled={isLoading}>
                    {isLoading ? <CircularProgress sx={{ color: 'white' }} size={24} /> : 'Ajouter'}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </Dropzone>
    </Dialog>
  );
};

export default ProductImage;
