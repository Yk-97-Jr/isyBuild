'use client'; // Keep this label at the top


import {useParams} from 'next/navigation';

import {Grid, Box, CircularProgress} from '@mui/material';

import {
  useDocumentDiffusionDetailQuery,
} from '@/services/IsyBuildApi';

import DocDiffModifyHeader from './DocDiffModifyHeader'; // Header Component
import DocDiffTypeAndLot from './DocDiffTypeAndLot'; // Display Component for Type and Lot
import CommentsSection from './CommentsSection/CommentsSection'


const DocDiffEdit = () => {


  const {docDiffId} = useParams(); // Get document diffusion ID from route parameters

  const {data: docDiffData, isLoading: isLoadingQuery} = useDocumentDiffusionDetailQuery({
    documentDiffusionId: +docDiffId,
  });

  console.log(docDiffData);

  // const [openAdd, setOpenAdd] = useState(false)


  if (isLoadingQuery) {
    return (
      <Box display="flex" justifyContent="center" alignItems="flex-start" height="100vh">
        <CircularProgress/>
      </Box>
    );
  }

  return (
    <>
      <Grid container spacing={6}>
        {/* Header */}
        <Grid item xs={12}>
          <DocDiffModifyHeader/>
        </Grid>

        {/* Main Form */}
        <Grid item xs={12} md={8.5}>
          <Grid container spacing={6}>
            <Grid item xs={12}>

              <CommentsSection docDiffData={docDiffData}/>

            </Grid>
          </Grid>
        </Grid>


        {/* Sidebar */}
        <Grid item xs={12} md={3.5}>
          <Grid container spacing={6}>

            <Grid item xs={12}>
              <DocDiffTypeAndLot
                title={docDiffData?.title}
                phase={docDiffData?.phase}
                type={docDiffData?.type}
                lot={docDiffData?.project_lot?.lot.name}
                date={docDiffData?.diffusion_date}
                status={docDiffData!.diffusion_list[0].status}
                indice={docDiffData?.indice}
                DocumentDocDiffData={docDiffData?.document}
                localisation={docDiffData?.localisation?.name}
              />
            </Grid>
          </Grid>
        </Grid>

      </Grid>


    </>
  );
};

export default DocDiffEdit;
