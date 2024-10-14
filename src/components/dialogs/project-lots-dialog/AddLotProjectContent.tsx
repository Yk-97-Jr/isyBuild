import React, {useContext, useState} from 'react';

import {useParams} from "next/navigation"; // Import the hook for the API query

import {Button, DialogActions, CircularProgress} from '@mui/material';

import {SnackBarContext} from '@/contexts/SnackBarContextProvider';
import type {SnackBarContextType} from '@/types/apps/snackbarType';
import LotSelect from '@components/dialogs/project-lots-dialog/LotProjectSelector';
import {
  useProjectLotsCreateCreateMutation
} from '@/services/IsyBuildApi';

interface AddProps {
  handleClose: () => void;
  handleCloseWithoutRefresh: () => void;
}

const AddLotProjectContent = ({handleClose, handleCloseWithoutRefresh}: AddProps) => {
  const {setOpenSnackBar, setInfoAlert} = useContext(SnackBarContext) as SnackBarContextType;
  const [selectedLot, setSelectedLot] = useState<number | undefined>(undefined);
  const [createLotProject, {isLoading}] = useProjectLotsCreateCreateMutation();
  const {edit: projectId} = useParams(); // Get clientId from route parameters


  // Handle deleting the user (you can customize this part)
  const handleAdd = async () => {
    if (selectedLot === undefined || selectedLot === null) {
      setOpenSnackBar(true);
      setInfoAlert({severity: 'error', message: 'Veuillez sélectionner un lot'});

      return; // Exit the function early if selectedLot is not defined
    }

    try {
      await createLotProject(
        {
          projectLotCreateRequest: {
            lot_id: selectedLot,
            project_id: +projectId,
          },
        }
      ).unwrap();

      handleClose();
      setOpenSnackBar(true);
      setInfoAlert({severity: 'success', message: 'Lot ajouté avec succès'});
    } catch (error) {
      setOpenSnackBar(true);
      setInfoAlert({severity: 'error', message: 'Échec de l\'ajout d\'un Lot'});
    }
  };


  return (
    <DialogActions className="flex flex-col justify-end pbs-0 sm:pbe-16 sm:pli-16 max-sm:gap-2" sx={{gap: 2}}>
      {/* Container for LotSelect and buttons */}
      <div className="flex flex-col w-full">
        {/* LotSelect component with lazy loading (fetches on open) */}
        <LotSelect selectedLot={selectedLot} setSelectedLot={setSelectedLot}/>

        {/* Buttons Container */}
        <div className="flex justify-end gap-2 mt-10 max-sm:flex-col max-sm:gap-2">
          <Button onClick={handleCloseWithoutRefresh} variant="tonal" color="secondary" className="max-sm:mis-0">
            Annuler
          </Button>
          <Button variant="contained" onClick={handleAdd} disabled={isLoading || !selectedLot}>
            {isLoading ? <CircularProgress sx={{color: 'white'}} size={24}/> : "Assinger"}
          </Button>
        </div>
      </div>
    </DialogActions>
  );
};

export default AddLotProjectContent;
