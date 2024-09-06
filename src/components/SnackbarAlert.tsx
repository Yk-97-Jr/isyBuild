'use client'

import {useContext} from 'react';

import {Alert, Snackbar} from '@mui/material';

import {SnackBarContext} from "@/contexts/SnackBarContextProvider";



export default function SnackbarAlert() {
  const {openSnackBar, infoAlert, handleCloseSnackBar} = useContext(SnackBarContext)


  return (
    <Snackbar
      key="Snackbar"
      open={openSnackBar}
      autoHideDuration={4000}
      onClose={handleCloseSnackBar}
      anchorOrigin={{vertical: 'top', horizontal: 'center'}}
    >
      <Alert
        key="SnackbarAlert"
        onClose={handleCloseSnackBar}
        severity={infoAlert.severity}
        sx={{width: '100%'}}
        variant="filled"
      >
        {typeof infoAlert.message === 'object' && infoAlert.message ? (
          Object.values(infoAlert.message).map((error, index) => (
            <div key={index}>{error}</div>
          ))
        ) : (
          <div>{infoAlert.message}</div>
        )}
      </Alert>
    </Snackbar>
  );
}
