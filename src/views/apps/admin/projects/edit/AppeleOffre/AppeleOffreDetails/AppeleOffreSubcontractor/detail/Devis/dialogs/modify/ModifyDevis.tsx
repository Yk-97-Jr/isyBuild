import React, {useContext, useEffect, useState} from 'react';


import {Button, DialogActions, CircularProgress, DialogTitle, Dialog, Grid} from '@mui/material';
import type {SubmitHandler} from "react-hook-form";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";


import {SnackBarContext} from '@/contexts/SnackBarContextProvider';
import type {SnackBarContextType} from '@/types/apps/snackbarType';

import type {
  ProjectLotSubcontractorRead
} from '@/services/IsyBuildApi';
import {
  useProjectLotsSubcontractorsDocumentsUploadDevisCreateMutation,
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
  id: number;
  data: ProjectLotSubcontractorRead | undefined
}

const ModifyDevis = ({open, setOpen, refetch, id, data}: AddProps) => {
    const {register, handleSubmit, setValue, formState: {errors}} = useForm<FormValidateFileUploadType>({
      resolver: yupResolver(schemaFileUpload),
    });

    const {setOpenSnackBar, setInfoAlert} = useContext(SnackBarContext) as SnackBarContextType;
    const [updateDocument, {isLoading}] = useProjectLotsSubcontractorsDocumentsUploadDevisCreateMutation();
    const [files, setFiles] = useState<File[]>([])

    useEffect(() => {
      if (data && data.devis_document) {
        setValue('name', data.devis_document.name ?? '');
        setValue('tags', data.devis_document.tags ?? '');
        setValue('notes', data.devis_document.latest_version.notes ?? '');
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


        // Now send the FormData ( need to disable eslint here cause we have a picutre to pass ( surpass the eslint error )


        await updateDocument(
          {
            projectLotSubcontractorId: +id,

            // @ts-expect-error
            documentUploadRequest: formDataToSend
          }).unwrap();

        handleClose();
        setOpenSnackBar(true);
        setInfoAlert({severity: 'success', message: 'Fichier ajouté avec succès'});
      } catch (error) {
        const message = error && typeof error === 'object' && 'data' in error
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
            <Grid container spacing={12}>
              <Grid item xs={12} md={6}>
                <Grid container spacing={6}>
                  <Grid item xs={12}>
                    <CustomTextField
                      fullWidth
                      label="Nom du fichier"
                      placeholder="Nom"
                      {...register('name')}
                      error={!!errors.name}
                      helperText={errors.name?.message}
                    />
                  </Grid>
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

          </DialogActions>
        </Dialog>
      </form>

    )
      ;
  }
;

export default ModifyDevis;
