'use client'; // Keep this label at the top

import React, {useState} from 'react';

import {useParams} from 'next/navigation';

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import {CircularProgress} from "@mui/material";


import Typography from "@mui/material/Typography";

import {useProjectLotsSubcontractorsRetrieveQuery} from "@/services/IsyBuildApi";
import DevisAppeleOffre
  from "@views/apps/admin/projects/edit/AppeleOffre/AppeleOffreDetails/AppeleOffreSubcontractor/detail/Devis/DevisAppeleOffre";
import CreatedBy
  from "@views/apps/admin/projects/edit/AppeleOffre/AppeleOffreDetails/AppeleOffreSubcontractor/detail/CreatedBy";
import Responsable
  from "@views/apps/admin/projects/edit/AppeleOffre/AppeleOffreDetails/AppeleOffreSubcontractor/detail/Responsable";
import AddDevisSub
  from "@views/apps/admin/projects/edit/AppeleOffre/AppeleOffreDetails/AppeleOffreSubcontractor/detail/Devis/dialogs/add/AddDevisSub";
import DeleteDevis
  from "@views/apps/admin/projects/edit/AppeleOffre/AppeleOffreDetails/AppeleOffreSubcontractor/detail/Devis/dialogs/delete/DeleteDevis";
import ModifyDevis
  from "@views/apps/admin/projects/edit/AppeleOffre/AppeleOffreDetails/AppeleOffreSubcontractor/detail/Devis/dialogs/modify/ModifyDevis";
import HistoryDevis
  from "@views/apps/admin/projects/edit/AppeleOffre/AppeleOffreDetails/AppeleOffreSubcontractor/detail/Devis/dialogs/history/HistoryDevis";
import AproposEntreprise
  from "@views/apps/admin/projects/edit/AppeleOffre/AppeleOffreDetails/AppeleOffreSubcontractor/detail/AproposEntreprise";
import AproposStatus
  from "@views/apps/admin/projects/edit/AppeleOffre/AppeleOffreDetails/AppeleOffreSubcontractor/detail/AproposStatus";

const AppeleOffreSubDetail = () => {

  const {idSub} = useParams(); // Get clientId from route parameters
  const [openAdd, setOpenAdd] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [openModify, setOpenModify] = useState(false)
  const [openHistory, setOpenHistory] = useState(false)
  const [id, setId] = useState<number>();


  const {
    data: projectLotSubcontractorData,
    isLoading: isLoadingQuery,
    refetch
  } = useProjectLotsSubcontractorsRetrieveQuery({
    projectLotSubcontractorId: +idSub,
  });


  if (isLoadingQuery) return (
    <Box display="flex" justifyContent="center" alignItems="flex-start" height="100vh">
      <CircularProgress/>
    </Box>
  )


  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <div>
          <Typography variant='h4' className='mbe-1'>
            Informations Génerales
          </Typography>
        </div>
      </Grid>
      <Grid item xs={12} md={8}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <DevisAppeleOffre projectLotSubcontractorData={projectLotSubcontractorData} setOpenAdd={setOpenAdd}
                              setId={setId} setOpenDelete={setOpenDelete} setOpenModify={setOpenModify}
                              setOpenHistory={setOpenHistory}/>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={4}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Responsable projectLotSubcontractorData={projectLotSubcontractorData}/>
          </Grid>
          <Grid item xs={12}>
            <AproposStatus projectLotSubcontractorData={projectLotSubcontractorData}/>
          </Grid>
          <Grid item xs={12}>
            <AproposEntreprise projectLotSubcontractorData={projectLotSubcontractorData}/>
          </Grid>
          <Grid item xs={12}>
            <CreatedBy projectLotSubcontractorData={projectLotSubcontractorData}/>
          </Grid>
          <Grid item xs={12}>
            {/*<ClientCreatedBy projectLotSubcontractorData={projectLotSubcontractorData}/>*/}
          </Grid>
        </Grid>
      </Grid>
      <AddDevisSub
        open={openAdd}
        setOpen={setOpenAdd}
        refetch={refetch}
      />
      <DeleteDevis
        open={openDelete}
        setOpen={setOpenDelete}
        refetch={refetch}
        id={id}
      />
      <ModifyDevis
        open={openModify}
        setOpen={setOpenModify}
        refetch={refetch}
        id={id}
        data={projectLotSubcontractorData}
      />
      <HistoryDevis
        open={openHistory}
        setOpen={setOpenHistory}
        id={id}
      />
    </Grid>
  );
};

export default AppeleOffreSubDetail;
