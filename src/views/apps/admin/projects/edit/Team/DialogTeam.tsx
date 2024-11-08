'use client'

// React Imports
// import { Fragment, useState } from 'react'

// MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'

import { Select } from '@mui/material'
import { MenuItem } from '@mui/material'

// Third-party Imports

type ConfirmationType = 'delete-account' | 'unsubscribe' | 'suspend-account' | 'delete-order' | 'delete-customer'

type ConfirmationDialogProps = {
  open: boolean
  setOpen: (open: boolean) => void
  type: ConfirmationType
}

const DialogTeam = ({ open, setOpen}: ConfirmationDialogProps) => {
  // States

  //   const [secondDialog, setSecondDialog] = useState(false)
  //   const [userInput, setUserInput] = useState(false)

  // Vars
  //   const Wrapper = type === 'suspend-account' ? 'div' : Fragment

  //   console.log(secondDialog,userInput,Wrapper)

  //   const handleSecondDialogClose = () => {
  //     setSecondDialog(false)
  //     setOpen(false)
  //   }

  //   const handleConfirmation = (value: boolean) => {
  //     setUserInput(value)
  //     setSecondDialog(true)
  //     setOpen(false)
  //   }

  return (
    <>
      <Dialog fullWidth maxWidth='md' open={open} onClose={() => setOpen(false)}>
        <DialogContent className='flex items-center flex-col text-center sm:pbs-16 sm:pbe-6 sm:pli-16'>
          <div className='flex flex-col gap-10'>
            <div>
              <h3>Inviter un utilisateur a rejoundre lequipe</h3>
            </div>
            <Select>
              <MenuItem>Select a user</MenuItem>
            </Select>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default DialogTeam
