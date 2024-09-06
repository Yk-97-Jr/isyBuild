'use client'

import React, {createContext, useState} from 'react';

import SnackbarAlert from "@components/SnackbarAlert";


export const SnackBarContext = createContext();

const SnackBarContextProvider = (props) => {
  const [openSnackBar, setOpenSnackBar] = useState(false)
  const [infoAlert, setInfoAlert] = useState({})

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackBar(false);
  };


  return (
    <SnackBarContext.Provider value={{openSnackBar, setOpenSnackBar, infoAlert, setInfoAlert, handleCloseSnackBar}}>
      {props.children}
      <SnackbarAlert/>
    </SnackBarContext.Provider>
  )
}

export default SnackBarContextProvider
