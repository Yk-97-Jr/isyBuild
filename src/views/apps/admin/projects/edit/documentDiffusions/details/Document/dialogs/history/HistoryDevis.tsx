'use client'

// MUI Imports
import React from "react";


import Grid from '@mui/material/Grid'


import Box from "@mui/material/Box";

import {CircularProgress, Dialog, DialogActions, DialogTitle} from "@mui/material";


import {useGetDocumentHistoryQuery} from "@/services/IsyBuildApi";
import DialogCloseButton from "@components/dialogs/DialogCloseButton";
import FolderInnerListTable
  from "@views/apps/admin/projects/edit/AppeleOffre/AppeleOffreDetails/AppeleOffreSubcontractor/detail/Devis/dialogs/history/FolderInnerListTable";


interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: number | undefined;
}


const HistoryDevis = ({open, setOpen, id}: Props) => {


  const {data, error, isLoading} = useGetDocumentHistoryQuery(
    {documentId: id ? +id : 0}, // Ensure documentId is always a valid number (it's going to be always skipped)
    {skip: id === undefined || !open,}
  );


  const handleCloseWithoutRefresh = () => {
    setOpen(false);

  };

  if (error)
    return (
      <div>
        Error fetching data:{' '}
        {error && 'data' in error ? JSON.stringify(error.data) : 'An unexpected error occurred.'}
      </div>
    )
  const documents = data || []

  return <Dialog
    open={open}
    onClose={handleCloseWithoutRefresh}
    maxWidth="md"
    fullWidth
    scroll="body"
    sx={{'& .MuiDialog-paper': {overflow: 'visible'}}}
  >
    <DialogCloseButton onClick={handleCloseWithoutRefresh} disableRipple>
      <i className="tabler-x"/>
    </DialogCloseButton>

    <DialogTitle variant="h4" className="flex flex-col gap-2 text-center sm:pbs-16 sm:pbe-6 sm:pli-16">
      Historique
    </DialogTitle>

    <DialogActions className="flex flex-col justify-end">
      {isLoading ? (
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12} sx={{mt: 6}}>
            <div>
              <Box display='flex' justifyContent='center' alignItems='center'>
                <CircularProgress/>
              </Box>
            </div>
          </Grid>
        </Grid>
      ) : (
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12} sx={{mt: 6}}>
            <div>
              <FolderInnerListTable tableData={documents}/>
            </div>
          </Grid>
        </Grid>

      )}
    </DialogActions>
  </Dialog>

}

export default HistoryDevis
