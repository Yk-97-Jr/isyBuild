import React, {useContext, useState} from 'react';

import {useParams} from "next/navigation"; // Import the hook for the API query

import {Button, DialogActions, CircularProgress} from '@mui/material';

import DialogTitle from "@mui/material/DialogTitle";


import Dialog from "@mui/material/Dialog";

import {SnackBarContext} from '@/contexts/SnackBarContextProvider';
import type {SnackBarContextType} from '@/types/apps/snackbarType';
import type {
  ProjectLotRead} from '@/services/IsyBuildApi';
import {
  useProjectLotsSubcontractorsAssignCreateMutation
} from '@/services/IsyBuildApi';

import DialogCloseButton from "@components/dialogs/DialogCloseButton";
import SubSelect
  from "@views/apps/admin/projects/edit/AppeleOffre/AppeleOffreDetails/AppeleOffreSubcontractor/dialogs/SubSelector";
import SubStaffSelect
  from "@views/apps/admin/projects/edit/AppeleOffre/AppeleOffreDetails/AppeleOffreSubcontractor/dialogs/SubStaffSelector";


interface AddProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  refetch?: () => void;
  projectLotData?: ProjectLotRead | undefined;
}

const AddLotSub = ({open, setOpen, refetch, projectLotData}: AddProps) => {
  const {setOpenSnackBar, setInfoAlert} = useContext(SnackBarContext) as SnackBarContextType;
  const [selectedSub, setSelectedSub] = useState<number | undefined>(undefined);
  const [selectedStaffSub, setSelectedStaffSub] = useState<number | undefined>(undefined);
  const [createSubLotProject, {isLoading}] = useProjectLotsSubcontractorsAssignCreateMutation();
  const {id: projectLotId} = useParams(); // Get clientId from route parameters

  const handleClose = () => {
    setOpen(false);
    setSelectedSub(undefined);
    setSelectedStaffSub(undefined)

    if (refetch) {
      refetch();
    }
  };

  const handleCloseWithoutRefresh = () => {
    setOpen(false);
    setSelectedSub(undefined);
    setSelectedStaffSub(undefined)
  };

  // Handle deleting the user (you can customize this part)
  const handleAdd = async () => {
    if (selectedSub === undefined || selectedSub === null || selectedStaffSub === undefined || selectedStaffSub === null) {
      setOpenSnackBar(true);
      setInfoAlert({severity: 'error', message: 'Veuillez sélectionner une entreprise'});

      return; // Exit the function early if selectedSub is not defined
    }

    try {
      await createSubLotProject(
        {
          projectLotId: +projectLotId,
          projectLotSubcontractorCreateRequest: {
            subcontractor_id: selectedSub,
            subcontractor_staff_id: selectedStaffSub,
            status: 'pending' // need to verify this
          },
        }
      ).unwrap();

      handleClose();
      setOpenSnackBar(true);
      setInfoAlert({severity: 'success', message: 'Entreprise assinger avec succès'});
    } catch (error) {

      const message = error && typeof error === 'object' && 'data' in error
        ? JSON.stringify((error as { data?: unknown }).data)
        : 'Une erreur inattendue est survenue.';

      setOpenSnackBar(true);
      setInfoAlert({severity: 'error', message: {message}});
    }
  };


  return (
    <Dialog open={open} onClose={handleCloseWithoutRefresh}
            sx={{
              '& .MuiDialog-paper': {
                overflow: 'visible',
                width: '35%', // Set the dialog width to 80% of the viewport
                maxWidth: '1200px', // Set a maximum width for larger screens
              }
            }}>
      <DialogCloseButton onClick={handleCloseWithoutRefresh} disableRipple>
        <i className='tabler-x'/>
      </DialogCloseButton>
      <DialogTitle variant='h4' className='flex flex-col gap-2 text-center sm:pbs-16 sm:pbe-6 sm:pli-16'>
        Assigner
      </DialogTitle>
      <DialogActions className="flex flex-col justify-end pbs-0 sm:pbe-16 sm:pli-16 max-sm:gap-2" sx={{gap: 2}}>
        {/* Container for LotSelect and buttons */}
        <div className="flex flex-col w-full">
          {/* LotSelect component with lazy loading (fetches on open) */}
          <div className="flex flex-col w-full gap-8 ">
            <SubSelect selectedSub={selectedSub} setSelectedSub={setSelectedSub} projectLotData={projectLotData}/>

            <SubStaffSelect selectedSub={selectedSub} selectedStaffSub={selectedStaffSub}
                            setSelectedStaffSub={setSelectedStaffSub}/>
          </div>
          {/* Buttons Container */}
          <div className="flex justify-end gap-2 mt-10 max-sm:flex-col max-sm:gap-2">
            <Button onClick={handleCloseWithoutRefresh} variant="tonal" color="secondary" className="max-sm:mis-0">
              Annuler
            </Button>
            <Button variant="contained" onClick={handleAdd} disabled={isLoading || !selectedSub || !selectedStaffSub}>
              {isLoading ? <CircularProgress sx={{color: 'white'}} size={24}/> : "Assinger"}
            </Button>
          </div>
        </div>
      </DialogActions>

    </Dialog>
  );
};

export default AddLotSub;
