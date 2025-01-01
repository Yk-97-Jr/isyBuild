import React, {useContext, useEffect, useState} from 'react';


import { useParams } from 'next/navigation';

import {Button, DialogActions, CircularProgress, DialogTitle, Dialog, Grid} from '@mui/material';
import type {SubmitHandler} from "react-hook-form";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";


import {SnackBarContext} from '@/contexts/SnackBarContextProvider';
import type {SnackBarContextType} from '@/types/apps/snackbarType';

import type {
  DocumentRead
} from '@/services/IsyBuildApi';
import {
  useDocumentDiffusionUploadMutation,
} from '@/services/IsyBuildApi';
import DialogCloseButton from "@components/dialogs/DialogCloseButton";

import {schemaDocumentUpload} from "@/views/apps/admin/projects/edit/documentDiffusions/details/Document/dialogs/add/AddDocumentSchema"


import type {
  FormValidateDocumentUploadType} from "@/views/apps/admin/projects/edit/documentDiffusions/details/Document/dialogs/add/AddDocumentSchema";
import CustomTextField from "@core/components/mui/TextField";
import AddDocumentUpload from "../add/AddDocumentUpload";


interface AddProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  refetch?: () => void;
  id: number | undefined;
  data: DocumentRead | undefined
}

const ModifyDocumentDocDiff = ({open, setOpen, refetch, id, data}: AddProps) => {
    const {register, handleSubmit, setValue, formState: {errors}} = useForm<FormValidateDocumentUploadType>({
      resolver: yupResolver(schemaDocumentUpload),
    });

    const {setOpenSnackBar, setInfoAlert} = useContext(SnackBarContext) as SnackBarContextType;
    const [updateDocument, {isLoading}] = useDocumentDiffusionUploadMutation();
    const {docDiffId} = useParams();
    const [files, setFiles] = useState<File[]>([])

    useEffect(() => {
      if (data && data.id) {
        setValue('name', data.name ?? '');
        setValue('tags', data.tags ?? '');
        setValue('notes', data.latest_version.notes ?? '');
      }

    }, [data, setValue]);

    const handleClose = () => {
      setFiles([])
      setOpen(false);

      if (refetch) {
        refetch()
      }

      ;
    };

    const handleCloseWithoutRefresh = () => {
      setOpen(false);
    };

  
    

    const onSubmit: SubmitHandler<FormValidateDocumentUploadType> = async (data) => {
      try {
        // Ensure the `id` is defined before proceeding with the document upload
        if (typeof id === 'undefined' || id === null) {
          throw new Error("L'identifiant du projet est manquant.");
        }

        // Create a FormData object to hold the avatar file
        const formDataToSend = new FormData();

        // Append the file directly (ensure that files[0] exists)
        if (files && files.length > 0) {
          formDataToSend.append('file', files[0]);
        } else {
          throw new Error("Aucun fichier sélectionné.");
        }

        // Conditionally append other form fields if they are provided
        if (data.name) {
          formDataToSend.append('name', data.name);
        }

        if (data.tags) {
          formDataToSend.append('tags', data.tags);
        }

        if (data.notes) {
          formDataToSend.append('notes', data.notes);
        }

        // Send the FormData with a valid projectLotSubcontractorId
        await updateDocument({
          documentDiffusionId: +docDiffId,


          // @ts-expect-error
          documentUploadRequest: formDataToSend
        }).unwrap();

        // Handle successful submission
        handleClose();
        setOpenSnackBar(true);
        setInfoAlert({severity: 'success', message: 'Fichier ajouté avec succès'});
      } catch (error) {
        // Handle errors, e.g., missing ID or file
        const message = error && typeof error === 'object' && 'data' in error
          ? JSON.stringify((error as { data?: unknown }).data)
          : error instanceof Error
            ? error.message
            : 'Une erreur inattendue est survenue.';

        setOpenSnackBar(true);
        setInfoAlert({severity: 'error', message});
      }
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Dialog
          open={open}
          onClose={handleCloseWithoutRefresh}
          maxWidth="md"
          scroll="body"
          sx={{'& .MuiDialog-paper': {overflow: 'visible'}}}
        >
          <DialogCloseButton onClick={handleCloseWithoutRefresh} disableRipple>
            <i className="tabler-x"/>
          </DialogCloseButton>

          <DialogTitle variant="h4" className="flex flex-col gap-2 text-center sm:pbs-16 sm:pbe-6 sm:pli-16">
            Modifier un fichier
          </DialogTitle>

          <DialogActions className="flex flex-col justify-end pbs-0 sm:pbe-16 sm:pli-16 max-sm:gap-2" sx={{gap: 2}}>
            <Grid container spacing={12}>
              <Grid item xs={12} md={6}>
                <Grid container spacing={6}>
                  <Grid item xs={12}>
                    <CustomTextField
                      fullWidth
                      label="Notes"
                      placeholder="Notes"
                      {...register('notes')}
                      error={!!errors.notes}
                      helperText={errors.notes?.message}
                      multiline
                      rows={4}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid container spacing={6}>
                  <Grid item xs={12}>
                    <AddDocumentUpload files={files} setFiles={setFiles}/>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={12}>
                <div className="flex justify-end">
                  <Button onClick={handleCloseWithoutRefresh} variant="tonal" color="secondary"
                          className="max-sm:mis-0">
                    Annuler
                  </Button>
                  <Button variant="contained" onClick={handleSubmit(onSubmit)} disabled={isLoading}>
                    {isLoading ? <CircularProgress sx={{color: 'white'}} size={24}/> : 'Ajouter'}
                  </Button>
                </div>
              </Grid>
            </Grid>

          </DialogActions>
        </Dialog>
      </form>

    )
      ;
  }
;

export default ModifyDocumentDocDiff;
