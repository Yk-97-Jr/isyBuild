"use client";

import React, { useContext } from "react";

import {
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";

import { useBulkDiffuseDocumentsMutation } from "@/services/IsyBuildApi";
import { SnackBarContext } from "@/contexts/SnackBarContextProvider";
import type { SnackBarContextType } from "@/types/apps/snackbarType";

// Define props
type AddRolesConfigProps = {
  open: boolean;
  setOpen: (open: boolean) => void;

  selectedIds: number[];
};

const DiffuseAddDialog = ({
  open,
  setOpen,

  selectedIds,
}: AddRolesConfigProps) => {
  const { setOpenSnackBar, setInfoAlert } = useContext(
    SnackBarContext,
  ) as SnackBarContextType;

  // API mutation
  const [bulkDiffuseDocuments, { isLoading }] =
    useBulkDiffuseDocumentsMutation();


  // Close dialog
  const handleClose = () => {
    setOpen(false);

  };

  // Handle the bulk diffusion of documents
  const handleBulkDiffuse = async () => {
    try {
      const body = selectedIds.map((id) => ({
        id,
      }));

      await bulkDiffuseDocuments({ body }).unwrap();

      setOpenSnackBar(true);
      setInfoAlert({
        severity: "success",
        message: "Documents diffusés avec succès",
      });
      handleClose();
    } catch (error) {
      console.error("Failed to diffuse documents:", error);
      setOpenSnackBar(true);
      setInfoAlert({
        severity: "error",
        message: "Échec de la diffusion des documents",
      });
    }
  };

  return (
    <Dialog fullWidth open={open} onClose={handleClose} maxWidth="sm">
      <DialogTitle>Diffusion des documents</DialogTitle>
      <DialogContent>
        <Typography variant="h5" color="textSecondary" align="center">
          Voulez-vous diffuser les documents sélectionnés ?
        </Typography>
        
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Annuler
        </Button>
        <Button
          onClick={handleBulkDiffuse}
          variant="contained"
          color="primary"
          disabled={isLoading || selectedIds.length === 0}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Diffuser"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DiffuseAddDialog;
