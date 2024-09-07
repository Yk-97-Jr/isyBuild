
import type {SyntheticEvent} from "react";

import type { AlertColor } from '@mui/material';
import type {SnackbarCloseReason} from "@mui/base";


export type InfoAlertType = {
  severity: AlertColor;
  message: string | object;
};

export type SnackBarContextType = {
  openSnackBar: boolean;
  setOpenSnackBar: React.Dispatch<React.SetStateAction<boolean>>;
  infoAlert: InfoAlertType | undefined;
  setInfoAlert: React.Dispatch<React.SetStateAction<InfoAlertType>>;
  handleCloseSnackBar: (event: Event | SyntheticEvent<any, Event>, reason: SnackbarCloseReason) => void
;
};
