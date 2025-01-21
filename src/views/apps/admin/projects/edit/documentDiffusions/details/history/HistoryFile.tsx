'use client'

// MUI Imports
import React from "react";

import { useParams } from "next/navigation";

import Grid from '@mui/material/Grid';
import Box from "@mui/material/Box";
import { CircularProgress, Dialog, DialogActions, DialogTitle } from "@mui/material";

import { useDiffusionHistoryListQuery } from "@/services/IsyBuildApi"; // Assuming you have this hook
import DialogCloseButton from "@components/dialogs/DialogCloseButton";
import FolderInnerListTable from "./FolderInnerListTable";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: number | undefined;
}


const HistoryFile = ({ open, setOpen,  }: Props) => {

  const {docDiffId} = useParams()

  const { data, error, isLoading } = useDiffusionHistoryListQuery(
    { documentDiffusionId: +docDiffId, pageSize:100 }, 
  );

  const handleCloseWithoutRefresh = () => {
    setOpen(false);
  };

  if (error)
    return (
      <div>
        Erreur lors de la récupération des données: {error && 'data' in error ? JSON.stringify(error.data) : 'Une erreur inattendue  produite.'}
      </div>
    );

  const documents = data?.results || []

  return (
    <Dialog
      open={open}
      onClose={handleCloseWithoutRefresh}
      maxWidth="md"
      fullWidth
      scroll="body"
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DialogCloseButton onClick={handleCloseWithoutRefresh} disableRipple>
        <i className="tabler-x" />
      </DialogCloseButton>

      <DialogTitle variant="h4" className="flex flex-col gap-2 text-center sm:pbs-16 sm:pbe-6 sm:pli-16">
        Historique
      </DialogTitle>

      <DialogActions className="flex flex-col justify-end">
        {isLoading ? (
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12} sx={{ mt: 6 }}>
              <div>
                <Box display='flex' justifyContent='center' alignItems='center'>
                  <CircularProgress />
                </Box>
              </div>
            </Grid>
          </Grid>
        ) : (
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12} sx={{ mt: 6 }}>
              <div>
                <FolderInnerListTable tableData={documents} />
              </div>
            </Grid>
          </Grid>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default HistoryFile;