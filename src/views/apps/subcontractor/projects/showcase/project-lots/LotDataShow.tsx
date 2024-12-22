'use client' // Keep this label at the top

import React, { useState }  from 'react'

import { useParams } from "next/navigation";



import Grid from '@mui/material/Grid'


import Box from '@mui/material/Box'

import { CardHeader, CircularProgress } from '@mui/material'



import { useProjectLotsRetrieveQuery, useProjectLotsSubcontractorDevisRetrieveQuery } from '@/services/IsyBuildApi' // Query to fetch Subcontractor data

import LotsList from './table/LotsList';
import AboutLot from './side-card/AboutLot';
import InvoiceLot from './side-card/InvoiceLot';
import AddDevisSub from './side-card/dialogs/add/AddDevisSub';
import DeleteDevis from './side-card/dialogs/delete/DeleteDevis';
import HistoryDevis from './side-card/dialogs/history/HistoryDevis';
import ModifyDevis from './side-card/dialogs/modify/ModifyDevis';

/* import ClinetShowcase from './side-card/ClinetShowcase';
import ShowcaseAbout from './side-card/ShowcaseAbout'; */

const LotDataShow = () => {
  

  const { docId } = useParams() // Get subcontractorId from route parameters
  
  const [openAdd, setOpenAdd] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [openModify, setOpenModify] = useState(false)
  const [openHistory, setOpenHistory] = useState(false)
  const [id, setId] = useState<number>();


  const {data, isLoading, } = useProjectLotsRetrieveQuery({
    projectLotId:+docId,
  })

  const {data: projectLotDevisData, refetch} = useProjectLotsSubcontractorDevisRetrieveQuery({projectLotId:+docId})

  if (isLoading)
    return (
      <Box display='flex' justifyContent='center' alignItems='flex-start' height='100vh'>
        <CircularProgress />
      </Box>
    )

  return (
   
    <Grid container spacing={6}>
        <Grid item xs={12}>
          <CardHeader title="Informations sur le  Lot"/>
          </Grid>  
          <Grid item xs={12} md={8}>
          <Grid container spacing={6}>
          <Grid item xs={12}>
            <LotsList/>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
            <AboutLot LotData={data}  />   
            </Grid>
            <Grid item xs={12}>
            <InvoiceLot  projectLotDevisData={projectLotDevisData} setOpenAdd={setOpenAdd}
                              setId={setId} setOpenDelete={setOpenDelete} setOpenModify={setOpenModify}
                              setOpenHistory={setOpenHistory} refetch={refetch}/>
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
        data={projectLotDevisData}
      />
      <HistoryDevis
        open={openHistory}
        setOpen={setOpenHistory}
        id={id}
      />
      </Grid>
   
  )
}

export default LotDataShow
