import type { Dispatch, SetStateAction } from 'react'
import React from 'react'

import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import Typography from '@mui/material/Typography'

import DeleteLotContent from '@components/dialogs/lot-dialog/DeleteLotContent'

import DialogCloseButton from '../DialogCloseButton'
import type { LotsType } from '@/types/apps/usersType'



type LotsDialogProps = {
  open: boolean
  setOpen: (open: boolean) => void
  id?: number
  addValue?: boolean
  setAddValue: Dispatch<SetStateAction<boolean>>
  setId: Dispatch<SetStateAction<number>>
  setEditValue: Dispatch<SetStateAction<LotsType | undefined>>
  editValue?: LotsType // Type mis à jour
  refetch?: () => void
}

const LotsDialog = ({
  open,
  setOpen,

  setAddValue,
  id,
  setId,

  setEditValue,
  refetch
}: LotsDialogProps) => {
  const handleClose = () => {
    setOpen(false)
    setEditValue?.(undefined)
    setId?.(0)
    setAddValue?.(false)

    if (refetch) {
      refetch()
    }
  }

  const handleCloseWithoutRefresh = () => {
    setOpen(false)
  }

  const isDelete = id !== undefined && id !== 0

  if (!isDelete ) {
    return null // Retourner null si aucune condition n'est remplie
  }

  const dialogTitle =  'Supprimer lots'

  const dialogDescription =  'Êtes-vous sûr de vouloir supprimer cet lots ?'




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
        <DeleteLotContent
          handleClose={handleClose}
          handleCloseWithoutRefresh={handleCloseWithoutRefresh}
          id={id!}
        />
      )}
    </Dialog>
  )
}

export default LotsDialog
