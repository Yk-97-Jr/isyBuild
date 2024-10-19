import type { Dispatch, SetStateAction } from 'react'
import React from 'react'

import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import Typography from '@mui/material/Typography'

import DialogCloseButton from '@/components/dialogs/DialogCloseButton'

type ClientDialogProps = {
  open: boolean
  setOpen: (open: boolean) => void
  id?: number
  setId: Dispatch<SetStateAction<number>>

  refetch?: () => void
}

const ProjectDialog = ({ open, setOpen, id }: ClientDialogProps) => {
  console.log('id' + id)

 
  const handleCloseWithoutRefresh = () => {

    setOpen(false)

  }

  const dialogTitle = 'Delete This Project'

  const dialogDescription = 'Are you sure you want to delete this project'

  // removing for now the logic to have multipe dialogs
  //   const ContentComponent = DeleteClientContent

  return (
    <Dialog open={open} onClose={handleCloseWithoutRefresh} sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}>
      <DialogCloseButton onClick={handleCloseWithoutRefresh} disableRipple>
        <i className='tabler-x' />
      </DialogCloseButton>
      <DialogTitle variant='h4' className='flex flex-col gap-2 text-center sm:pbs-16 sm:pbe-6 sm:pli-16'>
        {dialogTitle}
        <Typography component='span' className='flex flex-col text-center'>
          {dialogDescription}
        </Typography>
      </DialogTitle>
      {/* <ContentComponent handleClose={handleClose} handleCloseWithoutRefresh={handleCloseWithoutRefresh} id={id!} /> */}
    </Dialog>
  )
}

export default ProjectDialog
