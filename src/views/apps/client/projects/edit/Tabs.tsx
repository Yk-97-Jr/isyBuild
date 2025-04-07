import React from 'react'

import type { ReactElement } from 'react'

import MainEdit2 from './MainEdit2'


import Tabilation from './Tabilation'
import AppeleOffre from "@views/apps/client/projects/edit/AppeleOffre/AppeleOffreList/AppeleOffre";
import GestionAdministrativeList
  from "@views/apps/client/projects/edit/GestionAdministartive/GestionAdministrativeList/GestionAdministrativeList";



const tabContentList: { [key: string]: ReactElement } = {
  'Informations Generales': <MainEdit2 />,
  'Appelle Offre': <AppeleOffre />,
  'Gestion Administartive': <GestionAdministrativeList />
}


function Tabs() {

  return (
    <div>
      <Tabilation tabContentList={tabContentList} />
    </div>
  )
}

export default Tabs
