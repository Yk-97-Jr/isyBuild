import React from 'react';

import { Card, CardHeader, CardContent, Typography, Chip, Box } from '@mui/material';

type DocDiffTypeAndLotProps = {
  type?: string; // Document type
  lot?: string;  // Project lot
};

const DocDiffTypeAndLotInfo: React.FC<DocDiffTypeAndLotProps> = ({ type, lot }) => {
  return (
    <Card>
      <CardHeader title="Informations du Document" />
      <CardContent>
        {/* Display Project Lot */}
        {lot && (
         <div>
         <Box display="flex" alignItems="center"className="mb-1">
           <Typography variant="body1" >
             Lot de Projet:
           </Typography>
           <Typography variant="subtitle1" ml={2} >
             {lot}
           </Typography>
         </Box>
       </div>
        )}
        {/* Display Document Type as a Chip */}
        {type && (
          <div className="mb-4">
            <Box display="flex" alignItems="center"className="mb-1">

            <Typography variant="body1" mr={2}>
              Type de Document: 
            </Typography>
              <Chip label={type} color="primary" variant='tonal' />
            </Box>
            
          </div>
        )}


        {/* Handle case where no data is available */}
        {!type && !lot && (
          <Typography variant="body1" color="textSecondary">
            Aucune information disponible
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default DocDiffTypeAndLotInfo;
