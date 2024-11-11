'use client';


import React from "react";

import LotsSubList
  from "@views/apps/admin/projects/edit/AppeleOffre/AppeleOffreDetails/AppeleOffreSubcontractor/list/LotsSubList";
import type {ProjectLotRead} from "@/services/IsyBuildApi";


type Props = {
  projectLotData?: ProjectLotRead | undefined; // Adjust the type as necessary
};

const AppeleOffreSub: React.FC<Props> = ({ projectLotData }) => {
  return (

    <LotsSubList projectLotData={projectLotData}/>

  );
};

export default AppeleOffreSub;
