import type {Dispatch, SetStateAction} from 'react';
import React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';


import DialogCloseButton from '../DialogCloseButton';
import DeleteMediaContent from "@/components/dialogs/media-dialog/DeleteMediaContent";

type MediaDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  id?: number;
  setId: Dispatch<SetStateAction<number>>;
  refetch?: () => void;
};

const MediaDialog = ({
                      open,
                      setOpen,
                      id,
                      setId,
                      refetch
                    }: MediaDialogProps) => {

  const handleClose = () => {
    setOpen(false);
    setId?.(0);

    if (refetch) {
      refetch();
    }
  };

  const handleCloseWithoutRefresh = () => {
    setOpen(false);
    setId?.(0);
  };


  const dialogTitle = 'Supprimer média  '

  const dialogDescription = 'Êtes-vous sûr de vouloir supprimer cet média ?'


  const ContentComponent = DeleteMediaContent

  return (
    <Dialog open={open} onClose={handleCloseWithoutRefresh} sx={{'& .MuiDialog-paper': {overflow: 'visible'}}}>
      <DialogCloseButton onClick={handleCloseWithoutRefresh} disableRipple>
        <i className='tabler-x'/>
      </DialogCloseButton>
      <DialogTitle variant='h4' className='flex flex-col gap-2 text-center sm:pbs-16 sm:pbe-6 sm:pli-16'>
        {dialogTitle}
        <Typography component='span' className='flex flex-col text-center'>
          {dialogDescription}
        </Typography>
      </DialogTitle>
      <ContentComponent
        handleClose={handleClose}
        handleCloseWithoutRefresh={handleCloseWithoutRefresh}
        id={id!}

        // editValue={editValue!}
      />
    </Dialog>
  );
};

export default MediaDialog;
