import type { Dispatch, SetStateAction } from 'react'
import React from 'react'

import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import Typography from '@mui/material/Typography'

import DialogCloseButton from '../DialogCloseButton'
import type { LotsType } from '@/types/apps/usersType'
import AddLotContent from '@components/dialogs/lot-dialog/AddLotContent'
import EditUserContent from '@components/dialogs/user-dialog/EditUserContent'
import DeleteLotContent from '@components/dialogs/lot-dialog/DeleteLotContent'

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
  addValue,
  setAddValue,
  id,
  setId,
  editValue,
  setEditValue,
  refetch
}: LotsDialogProps) => {
  console.log('editValue' + editValue)
  console.log('id' + id)

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

  const isDelete = id !== undefined && id !== 0 && !editValue
  const isEdit = !!editValue

  if (!isDelete && !isEdit && !addValue) {
    return null // Retourner null si aucune condition n'est remplie
  }

  const dialogTitle = isDelete ? 'Supprimer lots' : isEdit ? 'Modifier lots' : 'Ajouter un nouvel lots'

  const dialogDescription = isDelete
    ? 'Êtes-vous sûr de vouloir supprimer cet lots ?'
    : isEdit
      ? 'Modifiez les détails de le lots  ci-dessous.'
      : 'Remplissez les détails pour créer un nouvel lots.'

  const ContentComponent = isDelete ? DeleteLotContent : isEdit ? EditUserContent : AddLotContent

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
      <ContentComponent
        handleClose={handleClose}
        handleCloseWithoutRefresh={handleCloseWithoutRefresh}
        id={id!}
        editValue={editValue!}
      />
    </Dialog>
  )
}

export default LotsDialog
