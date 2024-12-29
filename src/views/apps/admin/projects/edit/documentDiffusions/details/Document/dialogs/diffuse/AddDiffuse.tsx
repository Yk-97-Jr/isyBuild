import React, {useContext, } from 'react';

import {useParams} from "next/navigation";

import {Button, DialogActions, CircularProgress, DialogTitle, Dialog, Grid} from '@mui/material';
import type {SubmitHandler} from "react-hook-form";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

import {SnackBarContext} from '@/contexts/SnackBarContextProvider';
import type {SnackBarContextType} from '@/types/apps/snackbarType';
import {
  useDocumentDiffusionDiffuseMutation,
} from '@/services/IsyBuildApi';
import DialogCloseButton from "@components/dialogs/DialogCloseButton";


import CustomTextField from "@core/components/mui/TextField";

import type {
  FormValidateDocumentUploadType} from "./schema";
import {schema} from "./schema"

interface AddProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  refetch?: () => void;
}

const AddDiffuse = ({open, setOpen, refetch}: AddProps) => {
    const {register, handleSubmit, formState: {errors}} = useForm<FormValidateDocumentUploadType>({
      resolver: yupResolver(schema),
    });

    const {setOpenSnackBar, setInfoAlert} = useContext(SnackBarContext) as SnackBarContextType;
    const [createuseDocumentDiffusion, {isLoading}] = useDocumentDiffusionDiffuseMutation();
    const {docDiffId} = useParams();
  


    const handleClose = () => {
      
      setOpen(false);

      if (refetch) {
        console.log("refetchhhhhhhhhhhhhh")
        refetch()
      }

      ;
    };

    const handleCloseWithoutRefresh = () => {
      setOpen(false);
    };

    const onSubmit: SubmitHandler<FormValidateDocumentUploadType> = async (data) => {

      try {
   

       


        await createuseDocumentDiffusion(
          {
            documentDiffusionId: +docDiffId,

            // @ts-expect-error
            documentUploadRequest: data
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
        <Dialog open={open} onClose={handleCloseWithoutRefresh}
                maxWidth='md'
                scroll='body'
                sx={{'& .MuiDialog-paper': {overflow: 'visible'}}}>
          <DialogCloseButton onClick={handleCloseWithoutRefresh} disableRipple>
            <i className='tabler-x'/>
          </DialogCloseButton>
          <DialogTitle variant='h4' className='flex flex-col gap-2 text-center sm:pbs-16 sm:pbe-6 sm:pli-16'>
            Ajouter un Document
          </DialogTitle>
          <DialogActions className="flex flex-col justify-end pbs-0 sm:pbe-16 sm:pli-16 max-sm:gap-2" sx={{gap: 2}}>
            <Grid container spacing={12}>
              <Grid item xs={12} >
                <Grid container spacing={6}>

                  <Grid item xs={12} >
                    <CustomTextField
                      fullWidth
                      label='indice'
                      placeholder='indice'
                      {...register('indice')}
                      error={!!errors.indice}
                      helperText={errors.indice?.message}
                  
                    />
                  </Grid>
                </Grid>
              </Grid>
            
              <Grid item xs={12} md={12}>
                <div className="flex justify-end ">
                  <Button onClick={handleCloseWithoutRefresh} variant="tonal" color="secondary" className="max-sm:mis-0">
                    Annuler
                  </Button>
                  <Button variant="contained" onClick={handleSubmit(onSubmit)} disabled={isLoading}>
                    {isLoading ? <CircularProgress sx={{color: 'white'}} size={24}/> : "Ajouter"}
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

export default AddDiffuse;
