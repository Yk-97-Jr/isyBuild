import React from 'react'

import type {ReactElement} from 'react'

import CommentsSection
  from "@views/apps/client/projects/edit/GestionAdministartive/GestionAdministrativeSteps/GestionAdministrativeStepsDetails/CommentsSection/CommentsSection";
import Tabilation
  from "@views/apps/client/projects/edit/GestionAdministartive/GestionAdministrativeSteps/GestionAdministrativeStepsDetails/Tabilation";
import DetailsSection
  from "@views/apps/client/projects/edit/GestionAdministartive/GestionAdministrativeSteps/GestionAdministrativeStepsDetails/DetailsSection/DetailsSection";
import type {SuiviAdministrativeStepRead} from "@/services/IsyBuildApi";


const tabContentList: {
  [key: string]: (step: SuiviAdministrativeStepRead | undefined) => ReactElement;
} = {
  'Details': (step) => <DetailsSection step={step} />,
  'Section des commentaires': (step) => <CommentsSection step={step} />,
};


function Tabs({step}: { step: SuiviAdministrativeStepRead | undefined }) {

  return (
    <div>
      <Tabilation tabContentList={tabContentList} step={step}/>
    </div>
  )
}

export default Tabs
