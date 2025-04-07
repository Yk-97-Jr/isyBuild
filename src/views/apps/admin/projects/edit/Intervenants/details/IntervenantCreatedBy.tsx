import React from 'react';

import type {ProjectIntervenantRead} from "@/services/IsyBuildApi";
import CreatedByCard from '@/components/CreatedByCard';

type UserEditProps = {
  intervenantData: ProjectIntervenantRead | undefined; // Adjust the type as necessary
};

const IntervenantCreatedBy: React.FC<UserEditProps> = ({ intervenantData }) => {
  return (
    <CreatedByCard createdBy={intervenantData?.created_by} created_at={intervenantData?.created_at} updated_at={intervenantData?.updated_at}/>

  );
};

export default IntervenantCreatedBy;
