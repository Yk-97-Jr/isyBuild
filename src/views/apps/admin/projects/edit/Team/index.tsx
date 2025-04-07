import type {Dispatch, SetStateAction} from 'react';
import React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';


import DialogCloseButton from '@/components/dialogs/DialogCloseButton';
import DeleteLotProjectContent from "@components/dialogs/project-lots-dialog/DeleteLotProjectContent";
import AddLotProjectContent from "@components/dialogs/project-lots-dialog/AddLotProjectContent";

type DialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  id?: number;
  setId: Dispatch<SetStateAction<number | undefined>>;
  refetch?: () => void;
};

const TeamDialogue = ({
                            open,
                            setOpen,
                            id,
                            setId,
                            refetch
                          }: DialogProps) => {

  const handleClose = () => {
    setOpen(false);
    setId?.(undefined);

    if (refetch) {
      refetch();
    }
  };

  const handleCloseWithoutRefresh = () => {
    setOpen(false);
    setId?.(undefined);
  };


  const dialogTitle = id ? 'Supprimer un lot' : 'Assigner un lot'

  const dialogDescription = id ? 'Êtes-vous sûr de vouloir supprimer cet Lot ?' : ''

  console.log(id)
  const ContentComponent = id ? DeleteLotProjectContent : AddLotProjectContent

  console.log(ContentComponent)

  return (
    <Dialog open={open} onClose={handleCloseWithoutRefresh}
            sx={{
              '& .MuiDialog-paper': {
                overflow: 'visible',
                width: '35%', // Set the dialog width to 80% of the viewport
                maxWidth: '1200px', // Set a maximum width for larger screens
              }
            }}>
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

export default TeamDialogue;
