import type {Dispatch, SetStateAction} from 'react';
import React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';

import AddClientContent from "@components/dialogs/client-dialog/AddClientContent";

import EditClientContent from "@components/dialogs/client-dialog/EditClientContent";

import DialogCloseButton from '../DialogCloseButton';
import type {ClientsType} from "@/types/apps/clientsType";


import DeleteClientContent from "@components/dialogs/user-dialog/DeleteUserContent";

type UserDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  id?: number;
  addValue?: boolean;
  setAddValue: Dispatch<SetStateAction<boolean>>
  setId: Dispatch<SetStateAction<number>>
  setEditValue: Dispatch<SetStateAction<ClientsType | undefined>>
  editValue?: ClientsType; // Updated type
  refetch?: () => void

};


const ClientDialog = ({
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


  console.log('editValue' + editValue)
  console.log('id' + id)

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
  };

  const isDelete = id !== undefined && id !== 0 && !editValue;
  const isEdit = !!editValue;

  if (!isDelete && !isEdit && !addValue) {
    return null; // Return null if no condition is met
  }

  const dialogTitle = isDelete ? 'Delete Client' : isEdit ? 'Edit Client' : 'Add New Client';

  const dialogDescription = isDelete
    ? 'Are you sure you want to delete this users?'
    : isEdit
      ? 'Edit the users details below.'
      : 'Fill in the details to create a new users.';

  const ContentComponent = isDelete
    ? DeleteClientContent
    : isEdit
      ? EditClientContent
      : AddClientContent;

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
        editValue={editValue!}
      />
    </Dialog>
  );
};

export default ClientDialog;
