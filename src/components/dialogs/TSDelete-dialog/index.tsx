import type { Dispatch, SetStateAction } from 'react';
import React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';

import DialogCloseButton from '../DialogCloseButton';
import DeleteTSContent from './DeleteTSContent';
import { useRefetch } from '@/contexts/RefetchContextProvider';

type TravailSupplementaireDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  id?: number;
  setId: Dispatch<SetStateAction<number>>;
  refetch?: () => void;
};

const DeleteTsDialog: React.FC<TravailSupplementaireDialogProps> = ({
  open,
  setOpen,
  id,
  setId,
  refetch,
}) => {

  const refetchCard = useRefetch();

  const handleClose = () => {
    setOpen(false);
    setId(0);

    if (refetch) {
      refetch();
      refetchCard()
    }
  };



  const handleCloseWithoutRefresh = () => {
    setOpen(false);
  };

  const isDelete = id !== undefined && id !== 0;

  if (!isDelete) {
    return null;
  }

  const dialogTitle = 'Supprimer le travail supplémentaire';
  const dialogDescription = 'Êtes-vous sûr de vouloir supprimer ce travail supplémentaire ?';

  return (
    <Dialog
      open={open}
      onClose={handleCloseWithoutRefresh}
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DialogCloseButton onClick={handleCloseWithoutRefresh} disableRipple>
        <i className="tabler-x" />
      </DialogCloseButton>
      <DialogTitle
        variant="h4"
        className="flex flex-col gap-2 text-center sm:pbs-16 sm:pbe-6 sm:pli-16"
      >
        {dialogTitle}
        <Typography component="span" className="flex flex-col text-center">
          {dialogDescription}
        </Typography>
      </DialogTitle>
      <DeleteTSContent
        handleClose={handleClose}
        handleCloseWithoutRefresh={handleCloseWithoutRefresh}
        id={id!}
      />
    </Dialog>
  );
};

export default DeleteTsDialog;
