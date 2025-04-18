import React, {useContext, useEffect, useState} from 'react';


import {Button, DialogActions, CircularProgress, DialogTitle, Dialog, Grid} from '@mui/material';
import type {SubmitHandler} from "react-hook-form";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

import Box from "@mui/material/Box";

import {SnackBarContext} from '@/contexts/SnackBarContextProvider';
import type {SnackBarContextType} from '@/types/apps/snackbarType';

import {
  useGetDocumentDetailQuery, useProjectLotsDocumentsUpdateCreateMutation,
} from '@/services/IsyBuildApi';
import DialogCloseButton from "@components/dialogs/DialogCloseButton";
import {
  schemaFileUpload
} from "@views/apps/admin/projects/edit/AppeleOffre/AppeleOffreDetails/AppeleOffreFolder/dialogs/add/AddFileSchema";
import type {
  FormValidateFileUploadType
} from "@views/apps/admin/projects/edit/AppeleOffre/AppeleOffreDetails/AppeleOffreFolder/dialogs/add/AddFileSchema";
import CustomTextField from "@core/components/mui/TextField";
import AddFileUpload
  from "@views/apps/admin/projects/edit/AppeleOffre/AppeleOffreDetails/AppeleOffreFolder/dialogs/add/AddFileUpload";

interface AddProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  refetch?: () => void;
  id: number | undefined;
}

const ModifyFile = ({open, setOpen, refetch, id}: AddProps) => {


    const {register, handleSubmit, setValue, formState: {errors}} = useForm<FormValidateFileUploadType>({
      resolver: yupResolver(schemaFileUpload),
    });

    const {setOpenSnackBar, setInfoAlert} = useContext(SnackBarContext) as SnackBarContextType;

    const {data, isLoading: isLoadingFirst} = useGetDocumentDetailQuery(
      {documentId: id ? +id : 0},
      {skip: id === undefined || !open,});

    const [updateDocument, {isLoading}] = useProjectLotsDocumentsUpdateCreateMutation();
    const [files, setFiles] = useState<File[]>([])

    useEffect(() => {
      if (data) {
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

    const onSubmit: SubmitHandler<FormValidateFileUploadType> = async (data) => {
      try {
        if (id !== undefined) {
          // Create a FormData object to hold the avatar file
          const formDataToSend = new FormData();

          formDataToSend.append('file', files[0]); // Append the file directly

          // Only append if `data.name` is not undefined or null
          if (data.name) {
            formDataToSend.append('name', data.name);
          }

          if (data.tags) {
            formDataToSend.append('tags', data.tags);
          }

          if (data.notes) {
            formDataToSend.append('notes', data.notes);
          }

          // Send the FormData
          await updateDocument({
            documentId: +id,

            // @ts-expect-error
            documentUploadRequest: formDataToSend,
          }).unwrap();

          handleClose();
          setOpenSnackBar(true);
          setInfoAlert({severity: 'success', message: 'Fichier ajouté avec succès'});
        } else {
          // Handle the case where id is undefined
          setOpenSnackBar(true);
          setInfoAlert({severity: 'error', message: 'L\'identifiant du document est manquant.'});
        }
      } catch (error) {
        const message =
          error && typeof error === 'object' && 'data' in error
            ? JSON.stringify((error as { data?: unknown }).data)
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
            {isLoadingFirst ? (
              <Box display="flex" justifyContent="center" alignItems="center" width="100%" height="100%">
                <CircularProgress/>
              </Box>
            ) : (
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
                      <AddFileUpload files={files} setFiles={setFiles}/>
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
            )}
          </DialogActions>
        </Dialog>
      </form>

    )
      ;
  }
;

export default ModifyFile;
