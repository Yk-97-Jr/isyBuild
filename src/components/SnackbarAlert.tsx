'use client'

import {useContext} from 'react';

import {Alert, Snackbar} from '@mui/material';


import {SnackBarContext} from "@/contexts/SnackBarContextProvider";
import type {SnackBarContextType} from "@/types/apps/snackbarType";


export default function SnackbarAlert() {
  const { openSnackBar, infoAlert, handleCloseSnackBar } = useContext(SnackBarContext) as SnackBarContextType;

  // Wrapper function for Alert's onClose
  const handleAlertClose = (event: React.SyntheticEvent<Element, Event>) => {
    // Call Snackbar close handler with a default reason
    console.log("closeeeeeeee")
    handleCloseSnackBar(event, 'clickaway');
  };

  // Render message as ReactNode
  const renderMessage = () => {
    if (typeof infoAlert?.message === 'string') {
      return infoAlert.message;
    }

    if (typeof infoAlert?.message === 'object' && infoAlert?.message !== null) {
      // Convert object to readable format
      return Object.values(infoAlert.message).map((value, index) => (
        <div key={index}>{String(value)}</div>
      ));
    }

    return null;
  };

  return (
    <Snackbar
      key="Snackbar"
      open={openSnackBar}
      autoHideDuration={4000}
      onClose={handleCloseSnackBar} // Use the wrapper function here
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        key="SnackbarAlert"
        onClose={handleAlertClose} // Use the wrapper function here
        severity={infoAlert?.severity ?? 'info'}
        sx={{ width: '100%' }}
        variant="filled"
      >
        {renderMessage()}
      </Alert>
    </Snackbar>
  );


}
