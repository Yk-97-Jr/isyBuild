import type {Dispatch, SetStateAction} from 'react';
import React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';

import DialogCloseButton from '../DialogCloseButton';
import type {UsersType} from "@/types/apps/usersType";
import AddUserContent from "@components/dialogs/user-dialog/AddUserContent";
import EditUserContent from "@components/dialogs/user-dialog/EditUserContent";
import DeleteUserContent from "@components/dialogs/user-dialog/DeleteUserContent";

type UserDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  id?: number;
  addValue?: boolean;
  setAddValue: Dispatch<SetStateAction<boolean>>
  setId: Dispatch<SetStateAction<number>>
  setEditValue: Dispatch<SetStateAction<UsersType | undefined>>
  editValue?: UsersType; // Updated type
  refetch?: () => void

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

  const isDelete = id !== undefined && id !== 0 && !editValue;
  const isEdit = !!editValue;

  if (!isDelete && !isEdit && !addValue) {
    return null; // Return null if no condition is met
  }

  const dialogTitle = isDelete ? 'Delete User' : isEdit ? 'Edit User' : 'Add New User';

  const dialogDescription = isDelete
    ? 'Are you sure you want to delete this user?'
    : isEdit
      ? 'Edit the user details below.'
      : 'Fill in the details to create a new user.';

  const ContentComponent = isDelete
    ? DeleteUserContent
    : isEdit
      ? EditUserContent
      : AddUserContent;

  return (
    <Dialog open={open} onClose={handleClose} sx={{'& .MuiDialog-paper': {overflow: 'visible'}}}>
      <DialogCloseButton onClick={handleClose} disableRipple>
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
        id={id!}
        editValue={editValue!}
      />
    </Dialog>
  );
};

export default UserDialog;
