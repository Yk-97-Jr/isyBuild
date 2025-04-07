import type {Dispatch, SetStateAction} from 'react';
import React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';


import DialogCloseButton from '../DialogCloseButton';
import DeleteUserContent from "@components/dialogs/user-dialog/DeleteUserContent";

type UserDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  id?: number;
  setId: Dispatch<SetStateAction<number>>;
  refetch?: () => void;
};

const UserDialog = ({
                      open,
                      setOpen,
                      id,
                      setId,
                      refetch
                    }: UserDialogProps) => {

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


  const dialogTitle = 'Supprimer l\'utilisateur'

  const dialogDescription = 'Êtes-vous sûr de vouloir supprimer cet utilisateur ?'


  const ContentComponent = DeleteUserContent

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

export default UserDialog;
