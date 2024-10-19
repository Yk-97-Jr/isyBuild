'use client'

import type {ReactNode, SyntheticEvent} from 'react';
import React, {createContext, useState} from 'react';

import type {AlertColor} from "@mui/material";

import type {SnackbarCloseReason} from "@mui/base";

import SnackbarAlert from "@components/SnackbarAlert";

import type {SnackBarContextType} from "@/types/apps/snackbarType";


export const SnackBarContext = createContext<SnackBarContextType | null>(null);

interface InfoAlertType {
  severity: AlertColor;
  message: string | object;
}

type SnackBarContextProviderProps = {
  children: ReactNode;
};

const SnackBarContextProvider = (props: SnackBarContextProviderProps) => {
  const [openSnackBar, setOpenSnackBar] = useState(false)
  const [infoAlert, setInfoAlert] = useState<InfoAlertType>({severity: "error", message: "il y a un erreur"}); // Initialize with null

  const handleCloseSnackBar = (event: Event | SyntheticEvent<any, Event>, reason: SnackbarCloseReason) => {

    setOpenSnackBar(false);

    if (reason === 'clickaway') {
      return;
    }

  };


  return (
    <SnackBarContext.Provider value={{openSnackBar, setOpenSnackBar, infoAlert, setInfoAlert, handleCloseSnackBar}}>
      {props.children}
      <SnackbarAlert/>
    </SnackBarContext.Provider>
  )
}

export default SnackBarContextProvider
