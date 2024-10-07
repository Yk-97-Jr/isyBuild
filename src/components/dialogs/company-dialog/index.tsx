import type { Dispatch, SetStateAction } from 'react'
import React from 'react'

import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import Typography from '@mui/material/Typography'

import DialogCloseButton from '../DialogCloseButton'
import DeleteCompanyContent from '@components/dialogs/company-dialog/DeleteCompanyContent'

type CompanyDialogProps = {
  open: boolean
  setOpen: (open: boolean) => void
  id?: number
  setId: Dispatch<SetStateAction<number>>
  refetch?: () => void
}

const CompanyDialog = ({ open, setOpen, id, setId, refetch }: CompanyDialogProps) => {
  const handleClose = () => {
    setOpen(false)
    setId?.(0)

    if (refetch) {
      refetch()
    }
  }

  const handleCloseWithoutRefresh = () => {
    setOpen(false)
  }

  const isDelete = id !== undefined && id !== 0

  if (!isDelete) {
    return null // Return null if the condition for delete is not met
  }

  const dialogTitle = 'Supprimer entreprise'
  const dialogDescription = 'Êtes-vous sûr de vouloir supprimer cet entreprise ?'

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

      {/* Conditionally render DeleteUserContent if isDelete is true */}
      {isDelete && (
        <DeleteCompanyContent
          handleClose={handleClose}
          handleCloseWithoutRefresh={handleCloseWithoutRefresh}
          id={id!}
        />
      )}
    </Dialog>
  )
}

export default CompanyDialog
