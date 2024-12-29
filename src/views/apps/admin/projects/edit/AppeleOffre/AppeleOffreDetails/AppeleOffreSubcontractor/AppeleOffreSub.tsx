'use client';


import React from "react";

import type {ProjectLotRead} from "@/services/IsyBuildApi";
import LotsSubList
  from "@views/apps/client/projects/edit/AppeleOffre/AppeleOffreDetails/AppeleOffreSubcontractor/list/LotsSubList";


type Props = {
  projectLotData?: ProjectLotRead | undefined; // Adjust the type as necessary
};

const AppeleOffreSub: React.FC<Props> = ({ projectLotData }) => {
  return (

    <LotsSubList projectLotData={projectLotData}/>

  );
};

export default AppeleOffreSub;
