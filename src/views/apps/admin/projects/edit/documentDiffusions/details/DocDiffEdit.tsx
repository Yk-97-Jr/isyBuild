'use client'; // Keep this label at the top

import React, { useEffect, useContext, useState } from 'react';

import { useParams } from 'next/navigation';

import { Grid, Box, CircularProgress } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { SnackBarContext } from '@/contexts/SnackBarContextProvider';
import type { LocalisationRead} from '@/services/IsyBuildApi';
import { useDocumentDiffusionDetailQuery, useDocumentDiffusionUpdateMutation, useLocalisationsListQuery } from '@/services/IsyBuildApi';
import { schemaDocDiffUpdate } from './schemaDocDiffEdit';

import DocDiffModifyHeader from './DocDiffModifyHeader'; // Header Component
import DocDiffInformation from './DocDiffInformation'; // Main Form Component
import DocDiffTypeAndLot from './DocDiffTypeAndLot'; // Display Component for Type and Lot
import type { SnackBarContextType } from '@/types/apps/snackbarType';
import DocDiffCreatedBy from './DocDiffCreatedBy';
import DocumentDocDiff from './Document/DocumentDocDiff';
import AddDocumentDocDiff from './Document/dialogs/add/AddDocumentDocDiff';
import DeleteDocumentDocDiff from './Document/dialogs/delete/DeleteDocumentDocDiff';
import ModifyDocumentDocDiff from './Document/dialogs/modify/ModifyDocumentDocDiff';
import HistoryDevis from './Document/dialogs/history/HistoryDevis';

type FormValidateDocDiffUpdateType = {
  title: string;
  phase: "design" | "execution";
  localisation: number;
  project_lot?: number;
};

const DocDiffEdit: React.FC = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormValidateDocDiffUpdateType>({
    resolver: yupResolver(schemaDocDiffUpdate),
  });

  const { docDiffId } = useParams(); // Get document diffusion ID from route parameters

  const { data: docDiffData, isLoading: isLoadingQuery, refetch } = useDocumentDiffusionDetailQuery({
    documentDiffusionId: +docDiffId,
  });

  console.log(docDiffData);

  const [openAdd, setOpenAdd] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [openModify, setOpenModify] = useState(false)
  const [openHistory, setOpenHistory] = useState(false)
  const [id, setId] = useState<number>();

  
  const localisation = docDiffData?.localisation as LocalisationRead

  const DocumentDocDiffData = docDiffData?.document
  
  

  const [updateDocDiff, { isLoading: isUpdating },  ] = useDocumentDiffusionUpdateMutation();
  const { data  } = useLocalisationsListQuery({ page: 1, pageSize: 500 });

  const { setOpenSnackBar, setInfoAlert } = useContext(SnackBarContext) as SnackBarContextType
  
  // Populate form values when document diffusion data is fetched
  useEffect(() => {
    if (docDiffData) {
      setValue('title', docDiffData.title);
      setValue('phase', docDiffData.phase || '');
      setValue('localisation', docDiffData.localisation.id );
    }
  }, [docDiffData, setValue]);
  

  const onSubmit = async (data: FormValidateDocDiffUpdateType) => {
    try {
      await updateDocDiff({
        documentDiffusionId: +docDiffId,
        documentDiffusionUpdateRequest: {
          title: data.title,
          phase: data.phase,
          localisation: data.localisation,
        },
      }).unwrap();

      setOpenSnackBar(true);
      setInfoAlert({ severity: 'success', message: 'Document modifié avec succès' });
      refetch();
    } catch (err: any) {
      console.error('Failed to update document:', err);
      setOpenSnackBar(true);
      setInfoAlert({ severity: 'error', message: 'Échec de la modification du document' });
    }
  };

  if (isLoadingQuery) {
    return (
      <Box display="flex" justifyContent="center" alignItems="flex-start" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Grid container spacing={6}>
        {/* Header */}
        <Grid item xs={12}>
    <form onSubmit={handleSubmit(onSubmit)}>
          <DocDiffModifyHeader onSubmit={handleSubmit(onSubmit)} isLoading={isUpdating} />
    </form>
        </Grid>

        {/* Main Form */}
        <Grid item xs={12} md={8.5}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <DocDiffInformation register={register} errors={errors} localisations={localisation} localisation={data?.results} phaseValue={docDiffData?.phase}/>
            </Grid>
            <Grid item xs={12} >
        
            <DocumentDocDiff DocumentDocDiffData={DocumentDocDiffData} setOpenAdd={setOpenAdd}
                              setId={setId} setOpenDelete={setOpenDelete} setOpenModify={setOpenModify}
                              setOpenHistory={setOpenHistory}/>
          
      </Grid>
          </Grid>
        </Grid>

        

        {/* Sidebar */}
        <Grid item xs={12} md={3.5}>
          <Grid container spacing={6}>
          
            <Grid item xs={12}>
              <DocDiffTypeAndLot
                type={docDiffData?.type}
                lot={docDiffData?.project_lot?.lot.name}
              />
            </Grid>
            <Grid item xs={12}>
              <DocDiffCreatedBy docDiffData={docDiffData} />
            </Grid>
          </Grid>
        </Grid>
        
      </Grid>
      <AddDocumentDocDiff
        open={openAdd}
        setOpen={setOpenAdd}
        refetch={refetch}
        />
      <DeleteDocumentDocDiff
        open={openDelete}
        setOpen={setOpenDelete}
        refetch={refetch}
        id={id}
        />
      <ModifyDocumentDocDiff
        open={openModify}
        setOpen={setOpenModify}
        refetch={refetch}
        id={id}
        data={DocumentDocDiffData}
      />
      <HistoryDevis
        open={openHistory}
        setOpen={setOpenHistory}
        id={id}
      />
    </>
  );
};

export default DocDiffEdit;
