import React from 'react'

import { type Dispatch, type SetStateAction, useState } from 'react'

import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'

import { Button, MenuItem, Select, FormHelperText, FormControl } from '@mui/material'

import Dialog from '@mui/material/Dialog'

import DialogTitle from '@mui/material/DialogTitle'

import Typography from '@mui/material/Typography'

import DialogCloseButton from '@/components/dialogs/DialogCloseButton'



import CustomTextField from '@/@core/components/mui/TextField'

import { useAssignProjectStaffMutation } from '@/services/IsyBuildApi'

import type { ProjectStaffAssignRequest } from '@/services/IsyBuildApi'

type DialogProps = {
  open: boolean
  setOpen: (open: boolean) => void
  id?: number
  setId: Dispatch<SetStateAction<number | undefined>>
  refetch?: () => void
  client_staf_project: { name: string; id: number }[] // Updated typing for client_staf_project
}

const TeamDialogue = ({ open, setOpen, id, setId, refetch, client_staf_project }: DialogProps) => {
  const params = useParams()
  const projectId = parseInt(params.edit.toString())
  const router = useRouter()

  // const handleClose = () => {
  //   setOpen(false)
  //   setId?.(undefined)

  //   if (refetch) {
  //     refetch()
  //   }
  // }

  const handleCloseWithoutRefresh = () => {
    setOpen(false)
    setId?.(undefined)

    if (refetch) {
      refetch()
    }
  }

  const [role, setRole] = useState<string>('')
  const [staff, setStaff] = useState<{ value: string; id: number }>({ value: '', id: 0 })
  const [roleError, setRoleError] = useState<string | null>(null)
  const [staffError, setStaffError] = useState<string | null>(null)

  const [triggerFunction] = useAssignProjectStaffMutation()

  const handleRole = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as string

    setRole(value)

    setRoleError(null)
  }

  const handleStaff = (event: any) => {
    const selectedStaff = client_staf_project.find(staff => staff.name === event.target.value)

    if (selectedStaff) {
      setStaff({ value: selectedStaff.name, id: selectedStaff.id }) // Store both name and id
      setStaffError(null) // Clear staff error when staff is selected
    }
  }

  const submitHandler = async () => {
    let hasError = false

    // Validation
    if (!role) {
      setRoleError('Role is required.')
      hasError = true
    }

    if (!staff.id) {
      setStaffError('Staff member is required.')
      hasError = true
    }

    if (hasError) return // If there are errors, stop the submission

    // Submit form if no errors
    const requestArg: ProjectStaffAssignRequest = {
      staff_id: staff.id,
      role: role,
      supervisor_id: 0
    }

    try {
      const response = await triggerFunction({
        projectId,
        projectStaffAssignRequest: requestArg
      }).unwrap()

      window.location.reload()

      return response

    } 
    
    catch (error) {
      console.error('Error assigning staff:', error)
    }
  }

  const dialogTitle = id ? 'Supprimer un lot' : 'Ajouter un membre'
  const dialogDescription = id ? 'Êtes-vous sûr de vouloir supprimer ce lot ?' : ''

  // const ContentComponent = id ? DeleteLotProjectContent : AddLotProjectContent

  if (!client_staf_project) return <div>Loading....</div>

  return (
    <Dialog
      open={open}
      onClose={handleCloseWithoutRefresh}
      sx={{
        '& .MuiDialog-paper': {
          overflow: 'visible',
          width: {
            xs: '90%',
            sm: '75%',
            md: '50%'
          },
          maxWidth: '1200px'
        }
      }}
    >
      <DialogCloseButton onClick={handleCloseWithoutRefresh} disableRipple>
        <i className='tabler-x' />
      </DialogCloseButton>
      <DialogTitle variant='h4' className='flex flex-col gap-2 text-center sm:pbs-8 sm:pbe-4 sm:pli-8'>
        {dialogTitle}
        <Typography component='span' className='flex flex-col text-center'>
          {dialogDescription}
        </Typography>
      </DialogTitle>
      <div className='px-5 sm:px-10 w-full py-5 sm:py-10 flex flex-col gap-4'>
        <Typography component='span' className='flex flex-col text-start ml-1 py-1'>
          Role
        </Typography>
        <CustomTextField fullWidth onChange={handleRole} value={role} error={!!roleError} helperText={roleError} />

        <div>
          <Typography component='span' className='flex flex-col text-start ml-1 py-1'>
            Staff
          </Typography>
          <FormControl fullWidth error={!!staffError}>
            <Select
              value={staff.value} // Updated to use 'staff.value' for Select value
              onChange={handleStaff}
              sx={{
                fontSize: {
                  xs: '0.875rem', // Smaller font for mobile
                  sm: '1rem' // Standard font for larger screens
                }
              }}
            >
              {client_staf_project.map((element, index) => (
                <MenuItem key={index} value={element.name}>
                  {element.name}
                </MenuItem>
              ))}
            </Select>
            {staffError && <FormHelperText>{staffError}</FormHelperText>}
          </FormControl>
        </div>

        <div className='flex gap-2 justify-end mt-5'>
          <Button variant='contained' onClick={submitHandler}>
            Ajouter
          </Button>
          <Button variant='outlined' onClick={() => router.back()}>
            Annuler
          </Button>
        </div>
      </div>
    </Dialog>
  )
}

export default TeamDialogue
