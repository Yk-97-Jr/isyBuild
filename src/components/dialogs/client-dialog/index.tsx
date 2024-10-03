import type {Dispatch, SetStateAction} from 'react';
import React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';


import DialogCloseButton from '../DialogCloseButton';
import DeleteClientContent from "@components/dialogs/client-dialog/DeleteClientContent";
import type {ClientRead} from "@/services/IsyBuildApi";


type ClientDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  id?: number;
  setId: Dispatch<SetStateAction<number>>
  refetch?: () => void

};


const ClientDialog = ({
                        open,
                        setOpen,
                        id,
                        setId,
                        editValue,
                        refetch

                      }: ClientDialogProps) => {



  const handleClose = () => {
    setOpen(false);
    setId?.(0);

    if (refetch) {
      refetch();
    }
  };

  const handleCloseWithoutRefresh = () => {
    setOpen(false);
  };

  const isDelete = id !== undefined && id !== 0 && !editValue;
  const isEdit = !!editValue;

  if (!isDelete && !isEdit) {
    return null; // Return null if no condition is met
  }

   const dialogTitle = isDelete ? 'Supprimer Client' : isEdit ? 'Modifier Client' : 'Ajouter un nouvel Client';

  const dialogDescription = isDelete
    ? 'Êtes-vous sûr de vouloir supprimer cet Client ?'
    : isEdit
      ? 'Modifiez les détails de Client ci-dessous.'
      : 'Remplissez les détails pour créer un nouvel Client.';

  // removing for now the logic to have multipe dialogs
  const ContentComponent = DeleteClientContent

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

export default ClientDialog;
