

import { Card, CardHeader, CardContent, Typography } from '@mui/material';

import type { FinanceEnterpriseRead,  } from '@/services/IsyBuildApi';


type DocDiffTypeAndLotProps = {
 
  data?:FinanceEnterpriseRead 
 
};

const FEDataCard: React.FC<DocDiffTypeAndLotProps> = ({ data }) => {


  return (
    <Card>
      <CardHeader title="détails " />
      <CardContent className='flex flex-col gap-[1.638rem]'>
        {/* Display Project Lot */}
        {data?.subcontractor.name && (
         <div>
             <div className='flex items-center gap-4'>
            <div className='flex flex-wrap justify-between items-center gap-x-4 gap-y-1 is-full'>
              <div className='flex flex-col'>
           <Typography variant="body1" color='text.primary'>
             Enterprise 
           </Typography>
              </div>
           <Typography   >
             {data.subcontractor.name}
           </Typography>
      
         </div>
         </div>
       </div>

       
       
        )}
     


        {/* Handle case where no data is available */}
        {!data?.subcontractor.name 
 && (
          <Typography variant="body1" color="textSecondary">
            Aucune information disponible
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default FEDataCard;


