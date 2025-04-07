import React from 'react';



import type { ClientRead } from "@/services/IsyBuildApi";
import CreatedByCard from '@/components/CreatedByCard';

type ClientEditProps = {
  clientData?: ClientRead ; // Adjust the type as necessary
  created_at?: string; 
  updated_at?: string;
};




const ClientCreatedBy: React.FC<ClientEditProps> = ({ clientData, }) => {
  return (
    <CreatedByCard createdBy={clientData?.created_by} created_at={clientData?.created_at} updated_at={clientData?.updated_at}/>
  );
};

export default ClientCreatedBy;
