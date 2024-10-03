import type { Dispatch, SetStateAction } from 'react';
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
  addValue?: boolean;
  setAddValue: Dispatch<SetStateAction<boolean>>;
  setId: Dispatch<SetStateAction<number>>;
  refetch?: () => void;
};

const UserDialog = ({
  open,
  setOpen,
  addValue,
  setAddValue,
  id,
  setId,
  editValue,
  setEditValue,
  refetch
}: UserDialogProps) => {

  console.log('editValue' + editValue);
  console.log('id' + id);

  const handleClose = () => {
    setOpen(false);
    setEditValue?.(undefined);
    setId?.(0);
    setAddValue?.(false);

    if (refetch) {
      refetch();
    }
  };

  const handleCloseWithoutRefresh = () => {
    setOpen(false);
    setEditValue?.(undefined);
    setId?.(0);
    setAddValue?.(false);
  };

  const isDelete = id !== undefined && id !== 0 && !editValue;
  const isEdit = !!editValue;

  if (!isDelete && !isEdit && !addValue) {
    return null; // Retourner null si aucune condition n'est remplie
  }

  const dialogTitle = isDelete ? 'Supprimer l\'utilisateur' : isEdit ? 'Modifier l\'utilisateur' : 'Ajouter un nouvel utilisateur';

  const dialogDescription = isDelete
    ? 'Êtes-vous sûr de vouloir supprimer cet utilisateur ?'
    : isEdit
      ? 'Modifiez les détails de l\'utilisateur ci-dessous.'
      : 'Remplissez les détails pour créer un nouvel utilisateur.';

  const ContentComponent =  DeleteUserContent

  return (
    <Dialog open={open} onClose={handleCloseWithoutRefresh} sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}>
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
