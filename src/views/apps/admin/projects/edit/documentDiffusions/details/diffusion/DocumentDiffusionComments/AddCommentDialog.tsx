'use client';

import React from 'react';



import DialogTitle from '@mui/material/DialogTitle'

import Dialog from '@mui/material/Dialog'
import { DialogActions, Grid } from '@mui/material';
import DialogContent from '@mui/material/DialogContent'




import DialogCloseButton from '@/components/dialogs/DialogCloseButton';
import DialogCommentsSection from './CreateCommentsDialog';



type AddFinanceSituationContentProps = {
    open: boolean
    setOpen: (open: boolean) => void
    refetch: () => void
    id: number
  
  }




const AddCommentContent = ({ open,refetch, setOpen,id }: AddFinanceSituationContentProps) => {


  const handleClose = () => {
    setOpen(false)


    
  }

 

  return (
      <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      maxWidth='xs'
      scroll='body'
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DialogCloseButton onClick={() => setOpen(false)} disableRipple>
        <i className='tabler-x' />
      </DialogCloseButton>
                  <DialogTitle variant='h4' className='flex gap-2 flex-col text-center sm:pbs-16 sm:pbe-6 sm:pli-16'>
      Commenter une diffusion de document
      </DialogTitle>
    <form  >
    <DialogContent className='overflow-visible pbs-0 sm:pli-16'>
          <Grid container spacing={5}>

      </Grid>
      </DialogContent>
      <DialogActions className='justify-center pbs-0 sm:pbe-16 sm:pli-16'>
        <DialogCommentsSection id={id} refetch={refetch}/>
      </DialogActions>
</form>
    </Dialog>
  );
};

export default AddCommentContent;
