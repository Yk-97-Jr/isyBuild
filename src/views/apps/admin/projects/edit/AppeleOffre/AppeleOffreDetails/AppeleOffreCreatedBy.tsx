import React from 'react';


import  type {ProjectLotRead} from "@/services/IsyBuildApi";
import CreatedByCard from '@/components/CreatedByCard';

type Props = {
  projectLotData: ProjectLotRead | undefined; // Adjust the type as necessary
};



const AppeleOffreCreatedBy: React.FC<Props> = ({ projectLotData }) => {
  return (
    <CreatedByCard createdBy={projectLotData?.created_by} created_at={projectLotData?.created_at} updated_at={projectLotData?.updated_at}/>

  );
};

export default AppeleOffreCreatedBy;
