import React from 'react';

import {DialogActions, DialogTitle, Dialog} from '@mui/material';

import type {SuiviAdministrativeStepRead} from '@/services/IsyBuildApi';
import DialogCloseButton from "@components/dialogs/DialogCloseButton";

import Tabs
  from "@views/apps/client/projects/edit/GestionAdministartive/GestionAdministrativeSteps/GestionAdministrativeStepsDetails/Tabs";

interface AddProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  step: SuiviAdministrativeStepRead | undefined,

}

const StepDetails = ({open, setOpen, step}: AddProps) => {

    const handleCloseWithoutRefresh = () => {
      setOpen(false);
    };


    return (
      <Dialog open={open} onClose={handleCloseWithoutRefresh}
              maxWidth='md'
              scroll='body'
              sx={{'& .MuiDialog-paper': {overflow: 'visible'}}}>
        <DialogCloseButton onClick={handleCloseWithoutRefresh} disableRipple>
          <i className='tabler-x'/>
        </DialogCloseButton>
        <DialogTitle variant='h3' className='flex flex-col gap-2 text-center '>
          Details de étape
        </DialogTitle>
        <DialogActions className="flex flex-col justify-end pbs-0 sm:pbe-16 sm:pli-16 max-sm:gap-2" sx={{gap: 2}}>
          <Tabs step={step}/>
        </DialogActions>
      </Dialog>
    )
      ;
  }
;

export default StepDetails;
