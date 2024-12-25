import type { Dispatch, SetStateAction } from 'react';
import React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';

import DialogCloseButton from '../DialogCloseButton';
import DeleteSituationContent from "@components/dialogs/Finance-situation/DeleteSituationContent";

type FinanceSituationDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  id?: number;
  setId: Dispatch<SetStateAction<number>>;
  refetch?: () => void;
};

const FinanceSituationDialog = ({
  open,
  setOpen,
  id,
  setId,
  refetch,
}: FinanceSituationDialogProps) => {
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

  const isDelete = id !== undefined && id !== 0;

  if (!isDelete) {
    return null; // Return null if no condition is met
  }

  const dialogTitle = isDelete && 'Supprimer la situation financière';

  const dialogDescription =
    isDelete && 'Êtes-vous sûr de vouloir supprimer cette situation financière ?';

  // Define the content component
  const ContentComponent = DeleteSituationContent;

  return (
    <Dialog
      open={open}
      onClose={handleCloseWithoutRefresh}
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DialogCloseButton onClick={handleCloseWithoutRefresh} disableRipple>
        <i className='tabler-x' />
      </DialogCloseButton>
      <DialogTitle
        variant='h4'
        className='flex flex-col gap-2 text-center sm:pbs-16 sm:pbe-6 sm:pli-16'
      >
        {dialogTitle}
        <Typography component='span' className='flex flex-col text-center'>
          {dialogDescription}
        </Typography>
      </DialogTitle>
      <ContentComponent
        handleClose={handleClose}
        handleCloseWithoutRefresh={handleCloseWithoutRefresh}
        id={id!}
      />
    </Dialog>
  );
};

export default FinanceSituationDialog;
