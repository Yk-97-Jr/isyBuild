'use client';

import React, { useContext } from 'react';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Button, CircularProgress, DialogActions, Grid } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from 'yup';

import { useUpdateTravailSupplementaireMutation } from '@/services/IsyBuildApi';
import { SnackBarContext } from '@/contexts/SnackBarContextProvider';
import type { SnackBarContextType } from '@/types/apps/snackbarType';
import CustomTextField from '@core/components/mui/TextField';
import DialogCloseButton from '@/components/dialogs/DialogCloseButton';
import { useRefetch } from '@/contexts/RefetchContextProvider';

type AddFinanceSituationContentProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  refetch: () => void;
  id: number;
  initialData?: { amount: string } ; // Pass the existing data here
};

export const schemaTSAdd = yup.object({
  amount: yup
    .string()
    .matches(/^\d+(\.\d{1,2})?$/, "Le montant doit être un nombre valide avec jusqu'à deux décimales.")
    .required("Le montant est requis."),
}).required();

const EditTsContent = ({ open, setOpen, refetch, id, initialData }: AddFinanceSituationContentProps) => {
  const { register, handleSubmit,  formState: { errors } } = useForm({
    resolver: yupResolver(schemaTSAdd),
  });

  const refetchCard = useRefetch()

  const handleClose = () => {
    setOpen(false);

    if (refetch) {

      refetch(); // Call refetch when the dialog is closed
      refetchCard()
    }
  };

 

  const [UpdateTravailSupplementaire, { isLoading: isSubmitting }] = useUpdateTravailSupplementaireMutation();
  const { setOpenSnackBar, setInfoAlert } = useContext(SnackBarContext) as SnackBarContextType;

  const onSubmit = async (data: { amount: string }) => {
    try {
      await UpdateTravailSupplementaire({
        tsId: +id,
        patchedTravailSupplementaireUpdateRequest: {
          amount: data.amount,
        },
      }).unwrap();

      setOpenSnackBar(true);
      setInfoAlert({ severity: 'success', message: 'Travail supplémentaire mis à jour avec succès.' });
      handleClose();
    } catch (error: any) {
      console.error("Échec de la mise à jour du travail supplémentaire:", error);
      setOpenSnackBar(true);
      setInfoAlert({
        severity: 'error',
        message: error.response || "Échec de la mise à jour du travail supplémentaire.",
      });
    }
  };

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      scroll="body"
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DialogCloseButton onClick={handleClose} disableRipple>
        <i className="tabler-x" />
      </DialogCloseButton>
      <DialogTitle variant="h4" className="flex gap-2 flex-col text-center sm:pbs-16 sm:pbe-6 sm:pli-16">
        Mise à jour d&apos;un Travail Supplémentaire
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className="overflow-visible pbs-0 sm:pli-16">
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                label="Montant"
                placeholder="Ex. 1000.00"
                defaultValue={initialData}
                {...register('amount')}
                error={!!errors.amount}
                helperText={errors.amount?.message}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className="justify-center pbs-0 sm:pbe-16 sm:pli-16">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? <CircularProgress sx={{ color: 'white' }} size={24} /> : 'Mettre à jour'}
          </Button>
          <Button
            onClick={handleClose}
            variant="tonal"
            color="secondary"
          >
            Annuler
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditTsContent;
